import networks from '../utils/networks'

const bitcoin = window.bitcoinjs.bitcoin;

export default class Bip39 {
  constructor() {
    this.mnemonic = new window.Mnemonic('english');
  }

  getNetworks() {
    return networks;
  }

  generate(numWords: 12) {
    var strength = numWords / 3 * 32;
    return this.mnemonic.generate(strength);
  }

  calcBip32Seed(words, passphrase, network) {
    var coin = network.value;

    var phrase = words;
    var derivationPath = "m/44'/" + coin + "'/0'/0";
    var path = derivationPath;
    console.log(path);

    var properSeed = this.makeProperPhrase(phrase);
    var seed = this.mnemonic.toSeed(properSeed, passphrase);
    var bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network.network);
    var bip32ExtendedKey = bip32RootKey;

    // Derive the key from the path
    var pathBits = path.split("/");
    for (var i = 0; i < pathBits.length; i++) {
      var bit = pathBits[i];
      var index = parseInt(bit, 10); // radix
      if (isNaN(index)) {
        continue;
      }
      var hardened = bit[bit.length-1] === "'";
      if (hardened) {
        bip32ExtendedKey = bip32ExtendedKey.deriveHardened(index);
      }
      else {
        bip32ExtendedKey = bip32ExtendedKey.derive(index);
      }
    }

    // var rootKey = bip32RootKey.toBase58();
    // console.log(rootKey);

    // var extendedPrivKey = bip32ExtendedKey.toBase58();
    // console.log(extendedPrivKey);

    // var extendedPubKey = bip32ExtendedKey.neutered().toBase58()
    // console.log(extendedPubKey)

    return bip32ExtendedKey;
  }

  getAddress(bip32ExtendedKey, index, network) {
    var key = bip32ExtendedKey.derive(index);
    var privKey, pubKey, address;

    if (!network.ethereum) {
      address = key.getAddress().toString();
    } else {
      var privKeyBuffer = key.keyPair.d.toBuffer();
      privKey = privKeyBuffer.toString('hex');
      var addressBuffer = window.ethUtil.privateToAddress(privKeyBuffer);
      var hexAddress = addressBuffer.toString('hex');
      var checksumAddress = window.ethUtil.toChecksumAddress(hexAddress);
      address = window.ethUtil.addHexPrefix(checksumAddress);
      privKey = window.ethUtil.addHexPrefix(privKey);
      pubKey = window.ethUtil.addHexPrefix(pubKey);
    }

    pubKey = key.getAddress().toString();
    privKey = key.keyPair.toWIF(network.network);
    if (network.ethereum) {
      privKey = "0x" + key.keyPair.d.toString(16);
      pubKey = "0x" + pubKey;
    }

    var result = this.blankKey();

    if (network.name === 'Bitcoin') {
      var pubBuffer = key.getPublicKeyBuffer();
      var witnessScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubBuffer));
      var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(witnessScript));
      var segwitAddress = bitcoin.address.fromOutputScript(scriptPubKey);
      result.segwit = segwitAddress;
    }

    result.address = address;
    result.pubKey = pubKey;
    result.privKey = privKey;

    // console.log(result);

    return result;
  }

  blankKey() {
    return {
      address: '',
      pubKey: '',
      privKey: '',
      segwit: '',
    }
  }

  hasSecureRandom() {
    return 'crypto' in window && window['crypto'] !== null;
  }

  makeProperPhrase(phrase) {
    // TODO make this right
    // Preprocess the words
    phrase = this.mnemonic.normalizeString(phrase);
    var parts = phrase.split(" ");
    var proper = [];
    for (var i=0; i<parts.length; i++) {
      var part = parts[i];
      if (part.length > 0) {
        // TODO check that lowercasing is always valid to do
        proper.push(part.toLowerCase());
      }
    }
    // TODO some levenstein on the words
    return proper.join(' ');
  }
}
