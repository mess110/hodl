import { driver, load } from '../helpers';

describe('sanity', () => {
  it('should show the right title', async () => {
    await load();
    expect(await driver.getTitle()).toBe('Hodl Wallet');
  });
});
