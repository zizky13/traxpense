import { View, Text, FlatList } from 'react-native';
import { useContext } from 'react';
import { ExpenseContext } from '../store/expense-context';
import Cards from '../components/Cards';

export default DetailScreen = ({ route }) => {
    const { category } = route.params;
    const expenseCtx = useContext(ExpenseContext);
    const renderedData = expenseCtx.expenses.filter(
      (item, index) => index > 2 && item.category === category
    );

    return (
      <View>
        <Text>{category} Screen</Text>
        <FlatList
          data={renderedData}
          renderItem={({ item }) => (
            <Cards>
              <Text>{item.time.getDate()}</Text>
              <Text>{item.amount}</Text>
              <Text>{item.description}</Text>
            </Cards>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
}