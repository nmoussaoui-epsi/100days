import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarHeader = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={[styles.dayItem, selectedDay === index && styles.selectedDayItem]} onPress={() => setSelectedDay(index)}>
            <Text style={[styles.dayText, selectedDay === index && styles.selectedDayText]}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dayItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  selectedDayItem: {
    backgroundColor: "#007bff",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarHeader;
