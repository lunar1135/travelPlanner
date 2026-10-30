import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G, Path } from "react-native-svg";

const colors = {
  bg: "#0F1410",
  surface: "#171D17",
  surfaceAccent: "#1B2A1F",
  border: "#2A352B",
  primary: "#2F4A2E",
  accent: "#D5E6BC",
  text: "#F3F1E8",
  textMuted: "#A8B1A3",
  textFaint: "#7E8A7A",
};

const font = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
};

const TRIP_DAYS = [18, 19, 20, 21, 22, 23, 24];

const STOPS = [
  {
    title: "Arrival & check-in",
    category: "Travel",
    duration: "2 hr",
    time: "10:00",
    next: true,
  },
  {
    title: "Shinjuku stroll",
    category: "Explore",
    duration: "3 hr",
    time: "14:00",
    next: false,
  },
  {
    title: "Dinner in Shibuya",
    category: "Food",
    duration: "2 hr",
    time: "19:00",
    next: false,
  },
];

/* ---------- Icons (exported from the Figma file) ---------- */

function PlusIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M3.7494 8.99999H14.2506M9 3.74939V14.2506"
        stroke={colors.text}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function HouseIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M11.875 16.6244V10.291C11.875 10.0811 11.7916 9.87971 11.6431 9.73124C11.4947 9.58278 11.2933 9.49937 11.0833 9.49937H7.91667C7.7067 9.49937 7.50534 9.58278 7.35687 9.73124C7.20841 9.87971 7.125 10.0811 7.125 10.291V16.6244M2.375 7.91642C2.37494 7.68609 2.42514 7.45853 2.52208 7.24961C2.61902 7.04068 2.76038 6.85542 2.93629 6.70675L8.47796 1.95675C8.76374 1.71522 9.12582 1.5827 9.5 1.5827C9.87418 1.5827 10.2363 1.71522 10.522 1.95675L16.0637 6.70675C16.2396 6.85542 16.381 7.04068 16.4779 7.24961C16.5749 7.45853 16.6251 7.68609 16.625 7.91642V15.0414C16.625 15.4613 16.4582 15.8641 16.1613 16.161C15.8643 16.4579 15.4616 16.6247 15.0417 16.6247H3.95833C3.53841 16.6247 3.13568 16.4579 2.83875 16.161C2.54181 15.8641 2.375 15.4613 2.375 15.0414V7.91642Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M6.33333 1.5827V4.74962M12.6667 1.5827V4.74962M2.375 7.91654H16.625M6.33333 11.0835H6.34125M9.5 11.0835H9.50792M12.6667 11.0835H12.6746M6.33333 14.2504H6.34125M9.5 14.2504H9.50792M12.6667 14.2504H12.6746M3.95833 3.16616H15.0417C15.9161 3.16616 16.625 3.8751 16.625 4.74962V15.8338C16.625 16.7084 15.9161 17.4173 15.0417 17.4173H3.95833C3.08388 17.4173 2.375 16.7084 2.375 15.8338V4.74962C2.375 3.8751 3.08388 3.16616 3.95833 3.16616Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ChartIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M3.9577 16.625V11.875M9.5 16.625V7.125M15.0423 16.625V2.375"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function UserIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M9.5 10.2917C11.6859 10.2917 13.4579 8.51946 13.4579 6.33333C13.4579 4.14721 11.6859 2.375 9.5 2.375C7.31409 2.375 5.54206 4.14721 5.54206 6.33333C5.54206 8.51946 7.31409 10.2917 9.5 10.2917ZM9.5 10.2917C11.1795 10.2917 12.7903 10.9589 13.9779 12.1467C15.1655 13.3344 15.8327 14.9453 15.8327 16.625M9.5 10.2917C7.82046 10.2917 6.20971 10.9589 5.0221 12.1467C3.83449 13.3344 3.1673 14.9453 3.1673 16.625"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function StopCircle() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Circle
        cx={10.5}
        cy={10.5}
        r={9.8}
        stroke={colors.accent}
        strokeWidth={1.4}
      />
    </Svg>
  );
}

// Static ring from the design (43 %); swap for a dynamic arc when you wire up data.
function ProgressRing() {
  return (
    <Svg
      width={88}
      height={88}
      viewBox="0 0 88 88"
      fill="none"
      style={StyleSheet.absoluteFill}
    >
      <Path
        d="M88 44C88 68.3005 68.3005 88 44 88C19.6995 88 0 68.3005 0 44C0 19.6995 19.6995 0 44 0C68.3005 0 88 19.6995 88 44ZM4.4 44C4.4 65.8705 22.1295 83.6 44 83.6C65.8705 83.6 83.6 65.8705 83.6 44C83.6 22.1295 65.8705 4.4 44 4.4C22.1295 4.4 4.4 22.1295 4.4 44Z"
        fill={colors.border}
      />
      <G transform="translate(44 0)">
        <Path
          d="M0 0C9.29189 0 18.3453 2.94162 25.8625 8.40325C33.3798 13.8649 38.9751 21.5661 41.8465 30.4033C44.7178 39.2404 44.7178 48.7596 41.8465 57.5967C38.9751 66.4339 33.3798 74.1351 25.8625 79.5967L23.2763 76.0371C30.0419 71.1216 35.0776 64.1905 37.6618 56.2371C40.2461 48.2837 40.2461 39.7163 37.6618 31.7629C35.0776 23.8095 30.0419 16.8784 23.2763 11.9629C16.5107 7.04746 8.3627 4.4 0 4.4L0 0Z"
          fill={colors.accent}
        />
      </G>
    </Svg>
  );
}

/* ---------- Components ---------- */

function TripDay({
  day,
  selected,
  onPress,
}: {
  day: number;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.day, selected ? styles.daySelected : styles.dayIdle]}
    >
      <Text
        style={[
          styles.dayLabel,
          { color: selected ? colors.accent : colors.textFaint },
        ]}
      >
        Day
      </Text>
      <Text
        style={[styles.dayNumber, selected && { fontFamily: font.semibold }]}
      >
        {day}
      </Text>
      <View
        style={[
          styles.dayDot,
          { backgroundColor: selected ? colors.accent : colors.text },
        ]}
      />
    </Pressable>
  );
}

function StopCard({ stop }: { stop: (typeof STOPS)[number] }) {
  return (
    <Pressable style={[styles.stop, stop.next && styles.stopNext]}>
      <StopCircle />
      <View style={styles.stopDetails}>
        <Text style={styles.stopTitle}>{stop.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{stop.category}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.meta}>{stop.duration}</Text>
        </View>
      </View>
      <View style={styles.schedule}>
        <Text style={[styles.time, stop.next && { color: colors.accent }]}>
          {stop.time}
        </Text>
        {stop.next && <Text style={styles.nextLabel}>NEXT</Text>}
      </View>
    </Pressable>
  );
}

const TABS = [
  { label: "Trips", Icon: HouseIcon },
  { label: "Plan", Icon: CalendarIcon },
  { label: "Budget", Icon: ChartIcon },
  { label: "You", Icon: UserIcon },
];

function BottomNav({ active }: { active: string }) {
  return (
    <View style={styles.nav}>
      {TABS.map(({ label, Icon }) => {
        const isActive = label === active;
        return (
          <Pressable key={label} style={styles.navItem}>
            <View
              style={[
                styles.navIcon,
                { backgroundColor: isActive ? colors.primary : colors.surface },
              ]}
            >
              <Icon color={isActive ? colors.text : colors.textFaint} />
            </View>
            <Text
              style={[
                styles.navLabel,
                isActive
                  ? { color: colors.text, fontFamily: font.semibold }
                  : { color: colors.textFaint },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* ---------- Screen ---------- */

export default function TripsScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const [selectedDay, setSelectedDay] = useState(24);

  if (!fontsLoaded) return <View style={styles.root} />;

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcome}>
          <View style={styles.greeting}>
            <Text style={styles.greetingSmall}>Good morning, Maya</Text>
            <Text style={styles.greetingTitle}>Your trip is ready.</Text>
          </View>
          <Pressable style={styles.avatar}>
            <Text style={styles.avatarText}>MY</Text>
          </Pressable>
        </View>

        <View style={styles.timeline}>
          {TRIP_DAYS.map((d) => (
            <TripDay
              key={d}
              day={d}
              selected={d === selectedDay}
              onPress={() => setSelectedDay(d)}
            />
          ))}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressMessage}>
            <Text style={styles.progressEyebrow}>TOKYO, JAPAN · OCT 18–24</Text>
            <Text style={styles.progressTitle}>
              Your itinerary is{"\n"}ready to go.
            </Text>
            <Text style={styles.progressSub}>3 of 7 activities planned</Text>
          </View>
          <View style={styles.ring}>
            <ProgressRing />
            <Text style={styles.ringValue}>43%</Text>
            <Text style={styles.ringLabel}>planned</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Next stops</Text>
            <Text style={styles.sectionMeta}>4 remaining</Text>
          </View>
          <View style={styles.stopList}>
            {STOPS.map((s) => (
              <StopCard key={s.title} stop={s} />
            ))}
          </View>
        </View>

        <Pressable style={styles.planButton}>
          <PlusIcon />
          <Text style={styles.planButtonText}>Plan trip</Text>
        </Pressable>
      </ScrollView>

      <BottomNav active="Trips" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 20,
  },

  welcome: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: { gap: 5, flexShrink: 1 },
  greetingSmall: {
    fontFamily: font.regular,
    fontSize: 13,
    color: colors.textMuted,
  },
  greetingTitle: {
    fontFamily: font.semibold,
    fontSize: 28,
    color: colors.text,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.text,
    backgroundColor: colors.surfaceAccent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: font.semibold, fontSize: 13, color: colors.accent },

  timeline: { flexDirection: "row", gap: 8 },
  day: {
    flex: 1,
    height: 62,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  dayIdle: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  daySelected: { backgroundColor: colors.primary },
  dayLabel: { fontFamily: font.medium, fontSize: 10 },
  dayNumber: { fontFamily: font.medium, fontSize: 16, color: colors.text },
  dayDot: { width: 3, height: 3, borderRadius: 1.5 },

  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    minHeight: 148,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAccent,
  },
  progressMessage: { flex: 1, gap: 9 },
  progressEyebrow: {
    fontFamily: font.semibold,
    fontSize: 9,
    color: colors.accent,
  },
  progressTitle: {
    fontFamily: font.medium,
    fontSize: 21,
    lineHeight: 25,
    color: colors.text,
  },
  progressSub: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  ring: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  ringValue: { fontFamily: font.medium, fontSize: 24, color: colors.text },
  ringLabel: { fontFamily: font.regular, fontSize: 10, color: colors.accent },

  section: { gap: 12 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontFamily: font.semibold, fontSize: 19, color: colors.text },
  sectionMeta: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.textMuted,
  },
  stopList: { gap: 6 },
  stop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 74,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  stopNext: { backgroundColor: colors.surfaceAccent },
  stopDetails: { flex: 1, gap: 7 },
  stopTitle: { fontFamily: font.medium, fontSize: 14, color: colors.text },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  meta: { fontFamily: font.regular, fontSize: 11, color: colors.textMuted },
  metaDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.textMuted,
  },
  schedule: { alignItems: "flex-end", gap: 5, minWidth: 39 },
  time: { fontFamily: font.medium, fontSize: 12, color: colors.textMuted },
  nextLabel: { fontFamily: font.semibold, fontSize: 9, color: colors.accent },

  planButton: {
    height: 48,
    borderRadius: 100,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  planButtonText: {
    fontFamily: font.semibold,
    fontSize: 14,
    color: colors.text,
  },

  nav: {
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  navItem: { flex: 1, alignItems: "center", gap: 3 },
  navIcon: {
    width: 52,
    height: 28,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: { fontSize: 10, fontFamily: font.regular },
});
