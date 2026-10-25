import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            width: "342px",
            height: "56px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15%",
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Text style={{ color: "#a8b1a3" }}>Good morning user</Text>
            <Text style={styles.greeting}>Lets prepare your next trip</Text>
          </View>
          <View style={styles.profile}>
            <Text style={{ color: "#D5E6BC", padding: 10 }}>U</Text>
          </View>
        </View>

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              backgroundColor: "#171D17",
              borderRadius: 100,
              borderColor: "#2A352B",
              borderWidth: 1,
              width: 42,
              height: 62,
            }}
          >
            <Text style={{ color: "#7E8A7A", fontSize: 10 }}>Day</Text>
            <Text style={{ color: "#F3F1E8", fontSize: 16 }}>21</Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#F3F1E8",
              }}
            />
          </View>
        </View>

        <View></View>
      </View>

      <View>
        <View></View>
      </View>

      <View></View>

      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F1410",
    fontFamily: "Inter",
  },
  greeting: {
    marginBottom: 20,
    color: "#F3F1E8",
    fontSize: 24,
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B2A1F",
    borderColor: "#F3F1E8",
    borderWidth: 1,
    borderRadius: 100,
    width: 44,
    height: 44,
  },
});
