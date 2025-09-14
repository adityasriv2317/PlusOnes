import { useApp } from "@/contexts/AppContexts";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Funnel, Plus, Trash, Trash2 } from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import filter from "lodash.filter";

interface RenderBackdropProps extends BottomSheetBackdropProps {}

const renderBackdrop = (props: RenderBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    opacity={0.1}
    pressBehavior="close"
  />
);

export default function HomeScreen() {
  const { persons, clearStorage, updateList } = useApp();
  const sheetRef = useRef<BottomSheet>(null);
  const [filtered, setFiltered] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPersons = useMemo(() => {
    let res = persons;

    if (currentFilter) {
      res = res.filter(
        (person: { name: string; coming: string }) =>
          person.coming === currentFilter
      );
    }

    if (searchQuery) {
      res = filter(res, (person: { name: string; coming: string }) => {
        return person.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return res;
  }, [persons, currentFilter, searchQuery]);

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
        <TextInput
          onChangeText={setSearchQuery}
          placeholder="Search guests..."
          style={style.searchInput}
        />
        <TouchableOpacity
          onPress={() => {
            sheetRef.current?.expand();
          }}
          style={style.filterButton}
        >
          <Funnel color={"#fb8c00"} size={24} />
        </TouchableOpacity>
      </View>

      {/* content */}
      <FlatList
        data={filteredPersons}
        scrollEnabled={true}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={style.guests}>
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 18 }}>
                Coming:{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    color:
                      item.coming === "No"
                        ? "black"
                        : item.coming === "Yes"
                        ? "green"
                        : "orange",
                  }}
                >
                  {item.coming}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => {
                updateList(
                  persons.filter(
                    (p: { name: string; coming: string }) => p !== item
                  )
                );
              }}
            >
              <Trash2 color={"red"} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          bottom: 12,
          right: 8,
          width: "auto",
          backgroundColor: "#ffe2c0ff",
          marginHorizontal: 8,
          borderColor: "#fb8c00ff",
          borderWidth: 1,
          borderRadius: 16,
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: "#52c620",
          }}
        />
        <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold" }}>
          {
            filteredPersons.filter(
              (p: { name: string; coming: string }) => p.coming === "Yes"
            ).length
          }{" "}
          / {filteredPersons.length}
        </Text>
      </View>

      <BottomSheet
        enablePanDownToClose
        ref={sheetRef}
        index={-1}
        enableBlurKeyboardOnGesture
        backdropComponent={renderBackdrop}
        snapPoints={["60%"]}
        handleIndicatorStyle={{ backgroundColor: "#fb8c00" }}
        backgroundStyle={{ backgroundColor: "#fbe0bf" }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Filters</Text>
          <View
            style={{
              flex: 1,
              width: "100%",
              padding: 16,
              gap: 16,
              height: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18 }}>Coming:</Text>
              {filtered ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    borderRadius: 22,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                  onPress={() => {
                    setFiltered(false);
                    // setFilteredPersons(persons);
                    setCurrentFilter(null);
                    sheetRef.current?.close();
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Clear</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {Object.values(["Yes", "No", "Maybe"]).map((status, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  borderWidth: 2,
                  borderColor: "#fb8c00",
                  padding: 12,
                  backgroundColor:
                    currentFilter === status
                      ? // filteredPersons[0].coming === status
                        "#fb8c00"
                      : "transparent",
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setFiltered(true);
                  // setFilteredPersons(
                  //   persons.filter(
                  //     (person: { coming: string; name: string }) =>
                  //       person.coming === status
                  //   )
                  // );
                  setCurrentFilter(status);
                  sheetRef.current?.close();
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: currentFilter === status ? "white" : "#fb7d00ff",
                    fontWeight: "bold",
                  }}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
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
      {/* <HeartsReanimatedBackground /> */}

      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView style={style.container} edges={["top", "left", "right"]}>
        <View style={style.headerContainer}>
          <Text style={style.header}>Plus One's</Text>
          {persons.length > 0 && (
            <TouchableOpacity
              style={style.filterButton}
              onPress={() => {
                Alert.alert("Clear Data", "Your list will be cleared.", [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setFiltered(false);
                      clearStorage();
                    },
                  },
                ]);
              }}
            >
              <Trash color={"red"} />
            </TouchableOpacity>
          )}
        </View>
        {persons.length == 0 && !filtered ? nullView : guestList}
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f0",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "fixed",
    justifyContent: "space-between",
    top: 16,
    left: 16,
    paddingBottom: 22,
    width: "90%",
  },
  header: {
    fontSize: 34,
    color: "#fb8c00",
    fontWeight: "bold",
    fontFamily: "Lobster",
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
    fontFamily: "System",
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  nullNew: { fontSize: 18, color: "white" },
  listView: {
    flex: 1,
    paddingHorizontal: 16,
    //  backgroundColor: "blue",
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
    fontSize: 18,
    color: "#e65100",
  },
  filterButton: {
    borderRadius: 999,
    padding: 8,
    backgroundColor: "#fff3e0",
    borderWidth: 1,
    borderColor: "#fb8c00",
  },
  guests: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fee6bfff",
    padding: 16,
    borderRadius: 22,
    marginBottom: 12,
  },
});
