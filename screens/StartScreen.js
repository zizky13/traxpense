import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import MyButton from '../components/MyButton';
import { GlobalStyles } from '../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

export default StartScreen = () => {
    const navigation = useNavigation();
    
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Traxpense</Text>
            <Text style={styles.subtitleText}>Manage your expense wisely</Text>
            <MyButton style={styles.button} title="Get Started!" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.neutral100,
   },
   
    button: {
        minWidth: 100,
        margin: 10,
        marginTop: 20,
   },
   
   titleText: {
        fontFamily: 'Inter-Bold',
        fontSize: 48,
   },

    subtitleText: {
          fontFamily: 'Inter-Regular',
          fontSize: 18,
    },
});