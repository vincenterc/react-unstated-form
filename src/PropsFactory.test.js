import PropsFactory, * as Misc from './PropsFactory'

test('check default validator for input update', () => {
  let validationErr = Misc.defaultValidator('key', 'value');
  expect(validationErr).toBe(null);
});

test('check default validator for entire form submission', () => {
  let enableSubmit = Misc.defaultValidator(undefined, undefined, {});
  expect(enableSubmit).toBe(true);
});

