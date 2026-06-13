import { COLORS } from '../../constants/colors';

export const getStyles = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark';
  const c = isDark ? COLORS.dark : COLORS.light;

  return {
    heroTitle: {
      textShadow: `0 0 40px ${isDark ? 'rgba(0, 229, 255, 0.25)' : 'rgba(66, 133, 244, 0.25)'}`,
      color: c.textHeader,
    },
    heroTagline: {
      color: c.accentSecondary,
    },
    showcaseTitle: {
      color: c.textHeader,
    },
    showcaseSubtitle: {
      color: c.text,
    },
    ctaButtons: {
      marginBottom: 0,
    },
  };
};

