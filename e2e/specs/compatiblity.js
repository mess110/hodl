import { Builder, until, By } from 'selenium-webdriver';
import { driver, load } from '../helpers';
import { title, sleep, click, attr, setAttr, innerHTML } from '../helpers';

describe('sanity', () => {
  it('should show the right title', async () => {
    await load();

    await driver.get('https://iancoleman.github.io/bip39/');
    expect(await title()).toBe('BIP39 - Mnemonic Code');

    var phrase = 'exit clown train';

    await setAttr('#phrase', phrase);
    await sleep(500);
    expect(await attr('#phrase', 'value')).toBe(phrase);

    var firstPubAddress = '1LKr6sHAJ3qHDA7PLBE5LW6aWjmHiq9qdZ';
    await sleep(500);
    expect(await innerHTML('.address span', 0)).toBe(firstPubAddress);
  });
});
