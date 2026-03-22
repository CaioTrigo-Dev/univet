export const colors = {
  primary: {
    main: '#2D5A27', // Forest Green
    light: '#E8F5E9',
    dark: '#1B3F18',
  },
  secondary: {
    main: '#FF7043', // Coral
    light: '#FBE9E7',
    dark: '#D84315',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#121212',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
  },
  border: {
    main: '#E0E0E0',
    light: '#F0F0F0',
  },
};

export const darkColors = {
  ...colors,
  background: {
    default: '#121212',
    paper: '#1E1E1E',
    dark: '#000000',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#AAAAAA',
    disabled: '#666666',
    inverse: '#212121',
  },
  border: {
    main: '#333333',
    light: '#444444',
  },
};
