const defaultThemes = {
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  colors: {
    body: '#ffe2e2',
    text: '#262517',
    altTextColor: '#767477',
    toggleBorder: '#FFF',
    cardBackgroundColor: '#d3e4ff77',
    cardHoverColor: '#bfd8ff',
    gradient: 'linear-gradient(#dd4366, lightcoral)',
    toggleGradient: 'linear-gradient(#6c4399, #99C7FD)',
    accentColor: '#6c4399',
    secondaryColor: '#99C7FD',
  },
};

export const lightTheme = {
  ...defaultThemes,
  colors: {
    body: '#ffe2e2',
    text: '#262517',
    altTextColor: '#767477',
    toggleBorder: '#FFF',
    cardBackgroundColor: '#d3e4ff77',
    cardHoverColor: '#bfd8ff',
    gradient: 'linear-gradient(#dd4366, lightcoral)',
    toggleGradient: 'linear-gradient(#6c4399, #99C7FD)',
    accentColor: '#6c4399',
    secondaryColor: '#99C7FD',
  },
};

export const darkTheme = {
  ...defaultThemes,
  colors: {
    body: '#363537',
    text: '#FAFAFA',
    altTextColor: '#A4B3B4',
    toggleBorder: '#6B8096',
    cardBackgroundColor: '#1E215D77',
    cardHoverColor: '#5f6189',
    gradient: 'linear-gradient(#7f2d3f, #6c4399)',
    toggleGradient: 'linear-gradient(#091236, #1E215D)',
    accentColor: '#fbc6f4',
    secondaryColor: '#fbf6c4',
  },
};
