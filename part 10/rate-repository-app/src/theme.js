import { Platform } from "react-native"; 

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6', //blue 
      white: '#FFFFFF',
      mainBackground: '#e1e4e8',
      blueBackground: '#89CFF0',
      topBackground: '#24292e',
      error: '#d73a4a', 
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 24, 
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      })
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
export default theme;