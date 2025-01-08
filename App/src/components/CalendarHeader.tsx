import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getDaysOfWeek } from "../utils/dateUtils";

const CalendarHeader = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const daysOfWeek = getDaysOfWeek();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayButton,
            selectedDay === index && styles.selectedDayButton,
          ]}
          onPress={() => setSelectedDay(index)}
        >
          <Text
            style={[
              styles.dayText,
              selectedDay === index && styles.selectedDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  dayButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  dayText: {
    color: "#000",
  },
  selectedDayText: {
    color: "#fff",
  },
});

export default CalendarHeader;
