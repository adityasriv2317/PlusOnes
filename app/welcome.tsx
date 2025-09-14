import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import HeartsBackground from "@/assets/HeartBG";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

const features = [
  {
    title: "Manage Guests",
    icon: <Ionicons name="people" size={60} color="#ff69b4" />,
    description: [
      "Add guest with Name + RSVP",
      "Show all guests in a list",
      "Delete a guest",
      "View total and confirmed guests",
    ],
  },
  {
    title: "Add Random Entry",
    icon: <MaterialIcons name="person-add-alt-1" size={60} color="#87CEFA" />,
    description: [
      "Add guest using data from API",
      "RSVP status defaults to 'Maybe'",
      "Data saved to list",
    ],
  },
  {
    title: "Other Features",
    icon: <Entypo name="light-bulb" size={60} color="#FF8C00" />,
    description: ["Search through guest list", "Filter by RSVP status"],
  },
];

export default function WelcomeScreen() {
  const [step, setStep] = useState(0);
  const isLast = step === features.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setStep((prev) => prev + 1);
    } else {
      AsyncStorage.setItem("isWelcome", "true");
      router.replace("/");
    }
  };

  const { title, icon, description } = features[step];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HeartsBackground />

      <View
        style={{
          padding: 12,
          position: "absolute",
          top: 96,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 64, fontFamily: "Lobster", color: "#fb5c00ff" }}
        >
          Plus One's
        </Text>
      </View>

      <Animated.View
        entering={SlideInRight.duration(400)}
        exiting={SlideOutLeft.duration(400)}
        key={step}
        style={styles.cardWrapper}
      >
        <BlurView intensity={30} tint="light" style={styles.blurCard}>
          <Text style={styles.header}>{title}</Text>
          <View style={styles.iconContainer}>{icon}</View>

          {description.map((line, idx) => (
            <Animated.Text
              key={idx}
              entering={FadeIn.delay(100 * idx)}
              exiting={FadeOut}
              style={styles.description}
            >
              • {line}
            </Animated.Text>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{isLast ? "Start" : "Next"}</Text>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: height * 0.45,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  blurCard: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Lobster",
  },
  iconContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#FF8C00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 100,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
