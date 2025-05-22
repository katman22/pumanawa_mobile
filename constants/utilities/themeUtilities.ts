import { Theme } from '@react-navigation/native';

export const createTheme = (
    base: Theme,
    overrides: Partial<Theme['colors']>
): Theme => ({
  ...base,
  colors: {
    ...base.colors,
    ...overrides,
  },
});
