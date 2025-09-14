import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useFrameCallback,
  SharedValue,
} from "react-native-reanimated";
import { Heart } from "lucide-react-native";

const HEART_SIZE = 36;
const NUM_HEARTS = 25;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const colors = [
  "#FF69B4",
  "#FF6B6B",
  "#FFB6C1",
  "#FFD700",
  "#FF8C00",
  "#DA70D6",
  "#87CEFA",
  "#90EE90",
];

type HeartType = {
  x: SharedValue<number>;
  y: SharedValue<number>;
  vx: SharedValue<number>;
  vy: SharedValue<number>;
  alpha: SharedValue<number>;
  color: string;
  filled: boolean;
};

const HeartsBackground: React.FC = () => {
  const hearts = React.useRef<HeartType[]>(
    Array.from({ length: NUM_HEARTS }).map(() => ({
      x: useSharedValue(Math.random() * (SCREEN_WIDTH - HEART_SIZE)),
      y: useSharedValue(Math.random() * (SCREEN_HEIGHT - HEART_SIZE)),
      vx: useSharedValue((Math.random() - 0.5) * 1.2),
      vy: useSharedValue((Math.random() - 0.5) * 1.2),
      alpha: useSharedValue(Math.random() * 0.4 + 0.6),
      color: colors[Math.floor(Math.random() * colors.length)],
      filled: Math.random() < 0.5,
    }))
  ).current;

  // Update positions every frame
  useFrameCallback(() => {
    "worklet";
    hearts.forEach((heart) => {
      heart.x.value += heart.vx.value;
      heart.y.value += heart.vy.value;

      // Bounce off edges
      if (heart.x.value < 0 || heart.x.value > SCREEN_WIDTH - HEART_SIZE) {
        heart.vx.value *= -1;
      }
      if (heart.y.value < 0 || heart.y.value > SCREEN_HEIGHT - HEART_SIZE) {
        heart.vy.value *= -1;
      }
    });
  });

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#FFF0F5", "#FFE4E1", "#FFF5F5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Animated Hearts */}
      {hearts.map((heart, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: heart.x.value },
            { translateY: heart.y.value },
            { scale: 0.95 + 0.05 * Math.sin(heart.y.value / 20) },
          ],
          opacity: heart.alpha.value,
        }));

        return (
          <Animated.View key={index} style={[styles.heart, animatedStyle]}>
            <Heart
              size={HEART_SIZE}
              color={heart.color}
              fill={heart.filled ? heart.color : "none"}
              strokeWidth={2}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heart: {
    position: "absolute",
  },
});

export default HeartsBackground;
