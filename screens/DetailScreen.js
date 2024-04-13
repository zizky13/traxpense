import { View, Text } from 'react-native';

export default DetailScreen = ({ route }) => {
    const { category } = route.params;
    return (
        <View>
            <Text>{ category } Screen</Text>
        </View>
    );
}