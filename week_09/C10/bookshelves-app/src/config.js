const PORT = 3000;

export const BS = {
  'quito': 'Quito',
  'cartagena': 'Cartagena',
  'medellin': 'Medellín',
  'digital': 'Digital',
  'personal-loans': 'Personal Loans',
};

export const theme = {
  colors:{
    primary: '#6EC1E4',
    darkLight: '#D8D8D8',
    dark: '#9E9E9E',
    darken: '#231F20',
    light1: '#FCF8F3',
    light2: '#F5F6F8',
    errorPrimary: '#FF0000',
    errorBg: '#FFEEEE'
  },
};

const config = {
  homepage: `http://127.0.0.1:${PORT}/home`,
  dbBaseUrl: 'http://127.0.0.1:5001',
  apiBaseUrl: 'http://127.0.0.1:5001/api',
};

export function applyEllipsis(text, maxLength) {
  return (text.length > maxLength)
    ? `${text.substr(0,maxLength)}...`
    : `${text}`;
}

export default config;