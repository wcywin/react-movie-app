import getSlugFromTitle from './getSlugFromTitle'

test('slug does not contain special characters in the url', () => {
  expect(getSlugFromTitle('100% love')).toBe('100-love');
  expect(getSlugFromTitle('Rapid 3. Go')).toBe('rapid-3-go');
  expect(getSlugFromTitle('Dr. Strangelove or: How I learned')).toBe('dr-strangelove-or-how-i-learned');
})