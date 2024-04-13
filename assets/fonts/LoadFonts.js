import * as Font from 'expo-font';

export const LoadFonts = () => {
  return Font.loadAsync({
    'Inter-Regular': require('./Inter-Regular.ttf'),
    'Inter-Bold': require('./Inter-Bold.ttf'),
    'Inter-Thin': require('./Inter-Thin.ttf'),
  });
};