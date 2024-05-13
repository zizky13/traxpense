import {Text, View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { BarChart, LineChart } from "react-native-chart-kit";

export default ReportScreen = () => {
    const screenWidth = Dimensions.get("window").width;
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
        },
      ],
    };

    return (
      <SafeAreaView>
        <BarChart
          style={styles.graphStyle}
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel="Rp. "
          showValuesOnTopOfBars={true}
          withHorizontalLabels={false}
          withInnerLines={false}
          chartConfig={{
            backgroundColor: "#000000",
            backgroundGradientFrom: "#000000",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  graphStyle: {
    margin: 8,
    borderRadius: 16,
  },
});