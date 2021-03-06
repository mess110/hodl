const defaultNetworks = window.bitcoinjs.bitcoin.networks;

const coinNetworks = {
  bitcoin: defaultNetworks.bitcoin,
  litecoin: defaultNetworks.litecoin,
  dogecoin: defaultNetworks.dogecoin,
  dash: defaultNetworks.dash,
  bitcoinCash: {
    bip32: {
      private: 76066276,
      public: 76067358
    },
    messagePrefix: "Bitcoin Signed Message:↵",
    pubKeyHash: 28,
    scriptHash: 40,
    wif: 128
  },
  eth: {
    bip32: {
        public: 0xffffffff,
        private: 0xffffffff
      },
    pubKeyHash: 0xff,
    wif: 0xff,
    ethereum : true
  },
  etc: {
    bip32: {
        public: 0xffffffff,
        private: 0xffffffff
      },
    pubKeyHash: 0xff,
    wif: 0xff,
    ethereum : true
  },
}

const networks = [
  // {
    // name: 'Auroracoin',
    // identifier: 'auroracoin',
    // value: 85,
    // network: window.bitcoin.networks.auroracoin,
  // },
  // {
    // name: 'Bata',
    // identifier: 'bata',
    // value: 89,
    // network: window.bitcoin.networks.batacoin,
  // },
  {
    name: 'Bitcoin',
    identifier: 'bitcoin',
    value: 0,
    network: coinNetworks.bitcoin,
    feeEstimation: true,
  },
  {
    name: 'Dash',
    identifier: 'dash',
    value: 5,
    network: coinNetworks.dash,
    feeEstimation: false,
  },
  {
    name: 'Dogecoin',
    identifier: 'dogecoin',
    value: 3,
    network: coinNetworks.dogecoin,
    feeEstimation: false,
  },
  {
    name: 'Ethereum',
    identifier: 'ethereum',
    value: 60,
    network: coinNetworks.bitcoin,
    ethereum: true,
    feeEstimation: false,
  },
  {
    name: 'Ethereum Classic',
    identifier: 'ethereum-classic',
    value: 61,
    network: coinNetworks.bitcoin,
    ethereum: true,
    feeEstimation: false,
  },
  {
    name: 'Litecoin',
    identifier: 'litecoin',
    value: 2,
    network: coinNetworks.litecoin,
    feeEstimation: false,
  },
  {
    name: 'Bitcoin Cash',
    identifier: 'bitcoin-cash',
    value: 145,
    network: coinNetworks.bitcoin,
    feeEstimation: false,
  },
  // {
    // name: 'Blackcoin',
    // identifier: 'blackcoin',
    // value: 10,
    // network: window.bitcoin.networks.blackcoin,
  // },
  // {
    // name: 'Bitcoin Testnet',
    // identifier: 'Bitcoin testnet',
    // value: 1,
    // network: window.bitcoin.networks.testnet,
  // },
  // {
    // name: 'Clams',
    // identifier: 'clams',
    // value: 23,
    // network: window.bitcoin.networks.clam,
  // },
  // {
    // name: 'Dogecoin',
    // identifier: 'dogecoin',
    // value: 3,
    // network: window.bitcoin.networks.dogecoin,
  // },
  // {
    // name: 'NuBits',
    // identifier: 'nubits',
    // value: 12,
    // network: window.bitcoin.networks.nubits,
  // },
  // {
    // name: 'NuShares',
    // identifier: 'nushares',
    // value: 11,
    // network: window.bitcoin.networks.nushares,
  // },
  // {
    // name: 'Potcoin',
    // identifier: 'potcoin',
    // value: 81,
    // network: window.bitcoin.networks.potcoin,
  // },
  // {
    // name: 'Feathercoin',
    // identifier: 'feathercoin',
    // value: 8,
    // network: window.bitcoin.networks.feathercoin,
  // },
  // {
    // name: 'Gridcoin',
    // identifier: 'gridcoin',
    // value: 84,
    // network: window.bitcoin.networks.gridcoin,
  // },
  // {
    // name: 'Novacoin',
    // identifier: 'novacoin',
    // value: 50,
    // network: window.bitcoin.networks.novacoin,
  // },
  // {
    // name: 'Cannacoin',
    // identifier: 'cannacoin',
    // value: 19,
    // network: window.bitcoin.networks.cannacoin,
  // },
  // {
    // name: 'Clubcoin',
    // identifier: 'clubcoin',
    // value: 79,
    // network: window.bitcoin.networks.clubcoin,
  // },
  // {
    // name: 'Digibyte',
    // identifier: 'digibyte',
    // value: 20,
    // network: window.bitcoin.networks.digibyte,
  // },
  // {
    // name: 'Digitalcoin',
    // identifier: 'digitalcoin',
    // value: 18,
    // network: window.bitcoin.networks.digitalcoin,
  // },
  // {
    // name: 'EDRCoin',
    // identifier: 'edrcoin',
    // value: 56,
    // network: window.bitcoin.networks.edrcoin,
  // },
  // {
    // name: 'e-Gulden',
    // identifier: 'e-gulden',
    // value: 2,
    // network: window.bitcoin.networks.egulden,
  // },
  // {
    // name: 'Gulden',
    // identifier: 'gulden',
    // value: 87,
    // network: window.bitcoin.networks.gulden,
  // },
  // {
    // name: 'GCRCoin',
    // identifier: 'global-currency-reserve',
    // value: 49,
    // network: window.bitcoin.networks.gcrcoin,
  // },
  // {
    // name: 'Jumbucks',
    // identifier: 'jumbucks',
    // value: 26,
    // network: window.bitcoin.networks.jumbucks,
  // },
  // {
    // name: 'Monacoin',
    // identifier: 'monacoin',
    // value: 22,
    // network: window.bitcoin.networks.monacoin,
  // },
  // {
    // name: 'Myriadcoin',
    // identifier: 'myriad',
    // value: 90,
    // network: window.bitcoin.networks.myriadcoin,
  // },
  // {
    // name: 'Neoscoin',
    // identifier: 'neoscoin',
    // value: 25,
    // network: window.bitcoin.networks.neoscoin,
  // },
  // {
    // name: 'ParkByte',
    // identifier: 'parkbyte',
    // value: 36,
    // network: window.bitcoin.networks.parkbyte,
  // },
  // {
    // name: 'Peercoin',
    // identifier: 'peercoin',
    // value: 6,
    // network: window.bitcoin.networks.peercoin,
  // },
  // {
    // name: 'Pesobit',
    // identifier: 'pesobit',
    // value: 62,
    // network: window.bitcoin.networks.pesobit,
  // },
  // {
    // name: 'Primecoin',
    // identifier: 'primecoin',
    // value: 24,
    // network: window.bitcoin.networks.primecoin,
  // },
  // {
    // name: 'Reddcoin',
    // identifier: 'reddcoin',
    // value: 4,
    // network: window.bitcoin.networks.reddcoin,
  // },
  // {
    // name: 'Rubycoin',
    // identifier: 'rubycoin',
    // value: 16,
    // network: window.bitcoin.networks.rubycoin,
  // },
  // {
    // name: 'ShadowCash',
    // identifier: 'shadowcash',
    // value: 35,
    // network: window.bitcoin.networks.shadow,
  // },
  // {
    // name: 'ShadowCash Testnet',
    // identifier: 'ShadowCash testnet',
    // value: 1,
    // network: window.bitcoin.networks.shadowtn,
  // },
  // {
    // name: 'Smileycoin',
    // identifier: 'smileycoin',
    // value: 59,
    // network: window.bitcoin.networks.smileycoin,
  // },
  // {
    // name: 'Solarcoin',
    // identifier: 'solarcoin',
    // value: 58,
    // network: window.bitcoin.networks.solarcoin,
  // },
  // {
    // name: 'Syscoin',
    // identifier: 'syscoin',
    // value: 57,
    // network: window.bitcoin.networks.syscoin,
  // },
  // {
    // name: 'Unobtanium',
    // identifier: 'unobtanium',
    // value: 92,
    // network: window.bitcoin.networks.unobtanium,
  // },
  // {
    // name: 'Vergecoin',
    // identifier: 'verge',
    // value: 77,
    // network: window.bitcoin.networks.vergecoin,
  // },
  // {
    // name: 'Vertcoin',
    // identifier: 'vertcoin',
    // value: 28,
    // network: window.bitcoin.networks.vertcoin,
  // },
  // {
    // name: 'Viacoin',
    // identifier: 'viacoin',
    // value: 14,
    // network: window.bitcoin.networks.viacoin,
  // },
  // {
    // name: 'Viacoin Testnet',
    // identifier: 'Viacoin testnet',
    // value: 1,
    // network: window.bitcoin.networks.viacointestnet,
  // },
  // {
    // name: 'Vpncoin',
    // identifier: 'vpncoin',
    // value: 33,
    // network: window.bitcoin.networks.vpncoin,
  // },
  // {
    // name: 'Richcoin',
    // identifier: 'richcoin',
    // value: 80,
    // network: window.bitcoin.networks.richcoin,
  // },
  // {
    // name: 'PIVX',
    // identifier: 'pivx',
    // value: 119,
    // network: window.bitcoin.networks.pivx,
  // },
  // {
    // name: 'Abncoin',
    // identifier: 'abncoin',
    // value: 141,
    // network: window.bitcoin.networks.abncoin,
  // },
  // {
    // name: 'Asiancoin',
    // identifier: 'asiacoin',
    // value: 51,
    // network: window.bitcoin.networks.asiacoin,
  // },
  // {
    // name: 'BitcoinPlus',
    // identifier: 'bitcoin-plus',
    // value: 65,
    // network: window.bitcoin.networks.bitcoinplus,
  // },
  // {
    // name: 'Canada eCoin',
    // identifier: 'canada-ecoin',
    // value: 34,
    // network: window.bitcoin.networks.canadaecoin,
  // },
  // {
    // name: 'Einsteinium',
    // identifier: 'einsteinium',
    // value: 41,
    // network: window.bitcoin.networks.einsteinium,
  // },
  // {
    // name: 'Expanse',
    // identifier: 'expanse',
    // value: 40,
    // network: window.bitcoin.networks.expanse,
  // },
  // {
    // name: 'Gamecredits',
    // identifier: 'gamecredits',
    // value: 101,
    // network: window.bitcoin.networks.gamecredits,
  // },
  // {
    // name: 'Internet of People',
    // identifier: 'internet-of-people',
    // value: 66,
    // network: window.bitcoin.networks.iop,
  // },
  // {
    // name: 'IXCoin',
    // identifier: 'ixcoin',
    // value: 86,
    // network: window.bitcoin.networks.ixcoin,
  // },
  // {
    // name: 'Landcoin',
    // identifier: 'landcoin',
    // value: 63,
    // network: window.bitcoin.networks.landcoin,
  // },
  // {
    // name: 'Namecoin',
    // identifier: 'namecoin',
    // value: 7,
    // network: window.bitcoin.networks.namecoin,
  // },
  // {
    // name: 'Navcoin',
    // identifier: 'nav-coin',
    // value: 130,
    // network: window.bitcoin.networks.navcoin,
  // },
  // {
    // name: 'OKCash',
    // identifier: 'okcash',
    // value: 69,
    // network: window.bitcoin.networks.okcash,
  // },
  // {
    // name: 'POSWcoin',
    // identifier: 'posw-coin',
    // value: 47,
    // network: window.bitcoin.networks.posw,
  // },
  // {
    // name: 'Stratis',
    // identifier: 'stratis',
    // value: 105,
    // network: window.bitcoin.networks.stratis,
  // },
  // {
    // name: 'ZCash',
    // identifier: 'zcash',
    // value: 133,
    // network: window.bitcoin.networks.zcash,
  // },
  // {
    // name: 'Bela',
    // identifier: 'belacoin',
    // value: 73,
    // network: window.bitcoin.networks.bela,
  // },
  // {
    // name: 'Britcoin',
    // identifier: 'britcoin',
    // value: 70,
    // network: window.bitcoin.networks.britcoin,
  // },
  // {
    // name: 'Compcoin',
    // identifier: 'compcoin',
    // value: 74,
    // network: window.bitcoin.networks.compcoin,
  // },
  // {
    // name: 'LBRY',
    // identifier: 'lBRY',
    // value: 140,
    // network: window.bitcoin.networks.lbry,
  // },
  // {
    // name: 'ZCoin',
    // identifier: 'zcoin',
    // value: 136,
    // network: window.bitcoin.networks.zcoin,
  // },
  // {
    // name: 'Insane',
    // identifier: 'insanecoin-insn',
    // value: 68,
    // network: window.bitcoin.networks.insane,
  // },
  // {
    // name: 'Ultimatesecurecash',
    // identifier: 'ultimate-secure-cash',
    // value: 112,
    // network: window.bitcoin.networks.ultimatesecurecash,
  // },
  // {
    // name: 'Neurocoin',
    // identifier: 'neuro',
    // value: 110,
    // network: window.bitcoin.networks.neurocoin,
  // },
  // {
    // name: 'Hempcoin',
    // identifier: 'hempcoin',
    // value: 113,
    // network: window.bitcoin.networks.hempcoin,
  // },
  // {
    // name: 'Linxcoin',
    // identifier: 'linx',
    // value: 114,
    // network: window.bitcoin.networks.linxcoin,
  // },
  // {
    // name: 'Ecoin',
    // identifier: 'ecoin',
    // value: 115,
    // network: window.bitcoin.networks.ecoin,
  // },
  // {
    // name: 'Denarius',
    // identifier: 'denarius-dnr',
    // value: 116,
    // network: window.bitcoin.networks.denarius,
  // },
  // {
    // name: 'Pinkcoin',
    // identifier: 'pinkcoin',
    // value: 117,
    // network: window.bitcoin.networks.pinkcoin,
  // },
  // {
    // name: 'Flashcoin',
    // identifier: 'flash',
    // value: 120,
    // network: window.bitcoin.networks.flashcoin,
  // },
  // {
    // name: 'Defcoin',
    // identifier: 'defcoin',
    // value: 1337,
    // network: window.bitcoin.networks.defcoin,
  // },
  // {
    // name: 'Zencash',
    // identifier: 'zencash',
    // value: 121,
    // network: window.bitcoin.networks.zencash,
  // },
  // {
    // name: 'Putincoin',
    // identifier: 'putincoin',
    // value: 122,
    // network: window.bitcoin.networks.putincoin,
  // },
  // {
    // name: 'Smartcash',
    // identifier: 'smartcash',
    // value: 125,
    // network: window.bitcoin.networks.smartcash,
  // },
  // {
    // name: 'Fujicoin',
    // identifier: 'fujicoin',
    // value: 75,
    // network: window.bitcoin.networks.fujicoin,
  // },
  // {
    // name: 'Link',
    // identifier: 'link',
    // value: 76,
    // network: window.bitcoin.networks.link,
  // },
  // {
    // name: 'Voxels',
    // identifier: 'voxels',
    // value: 126,
    // network: window.bitcoin.networks.voxels,
  // },
  // {
    // name: 'Crown',
    // identifier: 'crown',
    // value: 72,
    // network: window.bitcoin.networks.crown,
  // },
  // {
    // name: 'Vcash',
    // identifier: 'vcash',
    // value: 127,
    // network: window.bitcoin.networks.vcash,
  // },
  // {
    // name: 'Bridgecoin',
    // identifier: 'bridgecoin',
    // value: 148,
    // network: window.bitcoin.networks.bridgecoin,
  // },
].sort(function(a, b){
  var nameA = a.name.toLowerCase();
  var nameB = b.name.toLowerCase();
  if (nameA < nameB) //sort string ascending
   return -1;
  if (nameA > nameB)
   return 1;
  return 0;
});

export default networks;
