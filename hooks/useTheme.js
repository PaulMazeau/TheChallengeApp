import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constant/colors';

export const useTheme = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return theme;
};
