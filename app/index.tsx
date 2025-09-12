import { useApp } from "@/contexts/AppContexts";
import { router } from "expo-router";
import { Funnel, Plus } from "lucide-react-native";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { persons, setPerson } = useApp();

  const nullView = (
    <View style={style.nullView}>
      <Text style={{ fontSize: 24 }}>No Guests Yet!</Text>
      <TouchableOpacity
        style={style.nullButton}
        onPress={() => {
          router.push("/create");
        }}
      >
        <Plus color={"white"} />
        <Text style={style.nullNew}>Add New</Text>
      </TouchableOpacity>
    </View>
  );

  const guestList = (
    <View style={style.listView}>
      {/* searchbar */}
      <View style={style.searchBar}>
        <TextInput placeholder="Search guests..." style={style.searchInput} />
        <TouchableOpacity style={style.filterButton}>
          <Funnel color={"#fb8c00"} size={24} />
        </TouchableOpacity>
      </View>

      {/* content */}
      <FlatList
        data={persons}
        renderItem={({ item }) => (
          <View style={style.guests}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      {Object.keys(persons).map((key) => (
        <View key={key} style={style.guests}>
          <Text key={key}>{persons[key].name}</Text>
        </View>
      ))}
    </View>
  );

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
        <Text style={style.header}>Plus One's List</Text>
        {Object.keys(persons).length == 0 ? nullView : guestList}
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
  },
  header: {
    position: "fixed",
    top: 16,
    left: 16,
    fontSize: 34,
    color: "#fb8c00",
    fontWeight: "bold",
    fontFamily: "System",
    marginBottom: 16,
  },
  nullView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  nullButton: {
    backgroundColor: "#fb8c00",
    padding: 12,
    borderRadius: 999,
    display: "flex",
    flexDirection: "row",
    gap: "6",
    alignItems: "center",
    justifyContent: "center",
  },
  nullNew: { fontSize: 18, color: "white" },
  listView: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
    width: "100%",
    paddingVertical: 4,
  },
  searchInput: {
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "#fff3e0",
    borderRadius: 25,
    width: "100%",
    textAlign: "center",
    borderColor: "#ffa726",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButton: {
    borderRadius: 999,
    padding: 8,
    backgroundColor: "#fff3e0",
    borderWidth: 1,
    borderColor: "#fb8c00",
  },
  guests: {},
});
