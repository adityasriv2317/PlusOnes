import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "lucide-react-native";
import { useApp } from "@/contexts/AppContexts";

export default function HomeScreen() {
  const { persons } = useApp();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={style.container}>
        {Array.isArray(persons) && persons.length == 0 ? (
          <View style={style.nullView}>
            <Text style={{ fontSize: 24 }}>No Guests Yet</Text>
            <Link style={style.nullButton} href={"/create"}>
              <Text style={{ fontSize: 24, color: "white" }}>
                Add new guests
              </Text>
            </Link>
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  nullView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  nullButton: {
    backgroundColor: "#e44805ff",
    padding: 12,
    borderRadius: 999,
  },
});
