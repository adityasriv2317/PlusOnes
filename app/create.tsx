import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddScreen() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      {/* <StatusBar barStyle={"dark-content"} /> */}
      <SafeAreaView style={style.container}>
        <Text style={{ fontSize: 24, color: "white" }}>Add new guests</Text>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1 },
});
