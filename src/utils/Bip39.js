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

  calcBip32Seed(words, networkIndex) {
    var coin = networks[networkIndex].value;

    // console.log(networks[networkIndex].name);

    var phrase = words;
    var passphrase = '';
    var derivationPath = "m/44'/" + coin + "'/0'/0";
    var path = derivationPath;
    var network = networks[networkIndex].network;

    var properSeed = this.makeProperPhrase(phrase);
    var seed = this.mnemonic.toSeed(properSeed, passphrase);
    var bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network);
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

    // var extendedPubKey = bip32ExtendedKey.toBase58(false);
    // console.log(extendedPubKey)

    return bip32ExtendedKey;
  }

  getAddress(bip32ExtendedKey, index, networkIndex) {
    var network = networks[networkIndex].network;
    var key = bip32ExtendedKey.derive(index);
    var i;

    var address;
    if (!network.ethereum) {
      address = key.getAddress().toString();
    } else {
      var pubData = new bitcoin.ECKey(key.privKey.d, false).pub.toHex();
      var buffer = new ArrayBuffer(64);
      var view = new Uint8Array(buffer);
      var offset = 0;
      for (i = 2; i < pubData.length; i += 2) {
        view[offset++] = parseInt(pubData.substr(i, 2), 16);
      }
      var addressHex = window.keccak_256(buffer).substr(24).toLowerCase();
      var checksum = window.keccak_256(addressHex)
      address = "0x";
      for (i = 0; i < addressHex.length; i++) {
        if (parseInt(checksum[i], 16) >= 8) {
          address += addressHex[i].toUpperCase()
        } else {
          address += addressHex[i]
        }
      }
    }
    var privKey, pubKey;

    pubKey = key.getAddress().toString();
    privKey = key.keyPair.toWIF(network);
    // if (!network.ethereum) {
    // } else {
      // privkey = "0x" + key.privKey.d.toString(16);
      // pubkey = "0x" + pubkey;
    // }

    return {
      address: address,
      pubKey: pubKey,
      privKey: privKey,
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
