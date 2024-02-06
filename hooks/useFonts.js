import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    'BricolageGrotesque': require('../assets/fonts/BricolageGrotesque.ttf'),
    'Raisonne': require('../assets/fonts/Raisonne.ttf'),
  });
};

export default useFonts;
