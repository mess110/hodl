# Hodl Wallet

*This is experimental software, use at your own risk*

Read the LICENSE.

If you loose coins using this wallet it is your fault. Be warned, it is easy
to loose coins.

## Philosophy

- Nothing is persisted
- All network connections are blocked
- Think of this as a multi-coin paper wallet generator
- You need another wallet to send transactions
- I recommend holding your seed in something like CryptoSteel

## Roadmap

- [x] generate keys for multiple cryptos
- [x] use crypto icons
- [x] stop all AJAX requests
- [x] show qr code
- [x] change seed
- [x] password protected seed
- [ ] fix offline use
- [ ] update addresses after seed change
- [ ] segwit addresses
- [ ] infinite scroll addresses

## Quickstart

```
yarn install
yarn start
yarn e2e-start
yarn e2e
```
