import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useApp } from "@/contexts/AppContexts";
import axios from "axios";

export default function AddScreen() {
  const { addPerson } = useApp();
  const [loading, setLoading] = useState(false);
  const [guest, setData] = useState({
    name: "",
    coming: "Yes",
  });

  const addGuest = async () => {
    const api = "https://randomuser.me/api/?results=1&nat=us";
    try {
      setLoading(true);
      const res = await axios.get(api);
      setData({
        name:
          res.data.results[0].name.first + " " + res.data.results[0].name.last,
        coming: "Maybe",
      });
    } catch (error) {
      console.log("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch random guests");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.header}>Add New Guest</Text>
      <View style={style.card}>
        <Text style={style.label}>Name:</Text>
        <TextInput
          style={style.input}
          placeholder="Enter guest's name"
          placeholderTextColor="#ff9122ff"
          value={guest.name}
          onChangeText={(text) => setData((prev) => ({ ...prev, name: text }))}
        />

        <Text style={style.label}>Coming:</Text>
        <View style={style.pickerContainer}>
          <Picker
            selectedValue={guest.coming}
            onValueChange={(value) =>
              setData((prev) => ({ ...prev, coming: value }))
            }
            style={{ color: "#e65100" }}
            dropdownIconColor="#e65100"
            mode="dropdown"
            dropdownIconRippleColor={"#e2ad5c66"}
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
            <Picker.Item label="Maybe" value="Maybe" />
          </Picker>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#8145efff", height: 54, ...style.button }}
          onPress={() => {
            addGuest();
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={style.buttonText}>Random</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#fb8c00", ...style.button }}
          onPress={() => {
            if (guest.name.trim()) {
              addPerson(guest);
              Alert.alert("Success", "Guest added successfully!");
            } else {
              Alert.alert("Error", "Please fill the name");
            }
          }}
        >
          <Text style={style.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
    paddingHorizontal: 12,
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
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    marginBottom: 8,
    color: "#e65100",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffa726",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff3e0",
    color: "#e65100",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ffa726",
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#fff3e0",
  },
  rButton: {},
  button: {
    paddingVertical: 14,
    marginHorizontal: 72,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
