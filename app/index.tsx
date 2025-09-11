import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
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
            <Text style={{ fontSize: 24 }}>No Guests Yet!</Text>
            <TouchableOpacity
              style={style.nullButton}
              onPress={() => {
                router.push("/create");
              }}
            >
              <Plus color={"white"} />
              <Text style={style.nullNew}>Add new</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
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
    display: "flex",
    flexDirection: "row",
    gap: "6",
    alignItems: "center",
    justifyContent: "center",
  },
  nullNew: { fontSize: 18, color: "white" },
});
