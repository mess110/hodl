import { driver, load } from '../helpers';
import { title, sleep, click, attr } from '../helpers';

describe('sanity', () => {
  it('should show the right title', async () => {
    await load();
    expect(await title()).toBe('Hodl Wallet');
  });
});
