import {TextStyle} from 'react-native';

type TypographyScale = {
  heading: TextStyle;
  subheading: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  button: TextStyle;
};

export const typography: TypographyScale = {
  heading: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  button: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
};

