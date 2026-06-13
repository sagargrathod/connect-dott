import { COLORS } from '../constants/colors';

export const getStyles = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark';
  const c = isDark ? COLORS.dark : COLORS.light;

  return {
    header: {
      borderColor: c.border,
    },
    logoText: {
      color: c.textHeader,
    },
    logoSpan: {
      color: c.accentPrimary,
    },
    themeToggleBtn: {
      borderColor: c.border,
      color: c.textHeader,
    },
    footer: {
      borderColor: c.border,
      color: c.text,
    },
  };
};
