import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useApp } from "@/contexts/AppContexts";

export default function AddScreen() {
  const { setPerson } = useApp();
  const [guest, setData] = useState({
    name: "",
    coming: "Yes",
  });

  return (
    <SafeAreaView style={style.container}>
      <View style={style.card}>
        <Text style={style.label}>Name:</Text>
        <TextInput
          style={style.input}
          placeholder="Enter guest's name"
          placeholderTextColor="#ffcc99"
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
          >
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="NO" />
            <Picker.Item label="Maybe" value="Maybe" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={style.button}
        onPress={() => {
          if (guest.name.trim()) {
            setPerson((prev: { name: string; coming: string }[]) => [
              ...prev,
              guest,
            ]);
            Alert.alert("Success", "Guest added successfully!");
          } else {
            Alert.alert("Error", "Please fill the name");
          }
        }}
      >
        <Text style={style.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
    paddingHorizontal: 12,
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
  button: {
    backgroundColor: "#fb8c00",
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
