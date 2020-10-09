import getCurrentDate from './getCurrentDate';

describe('getCurrentDate', () => {
  it('run', () => {
    expect(getCurrentDate('111')).toBe('1.1.1970');
  });
});
