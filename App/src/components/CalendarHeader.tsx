import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { format, addDays, subDays, isToday, isYesterday } from "date-fns";
import { fr } from "date-fns/locale";

const ITEM_WIDTH = 50;

const CalendarHeader = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(generateInitialDates());
  const [showTodayButton, setShowTodayButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  function generateInitialDates() {
    const today = new Date();
    const start = subDays(today, 30);
    return Array.from({ length: 60 }, (_, i) => addDays(start, i));
  }

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
    setShowTodayButton(!isToday(date));
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / ITEM_WIDTH);

    if (index < 10) {
      prependDates();
    } else if (index > dates.length - 10) {
      appendDates();
    }
  };

  const prependDates = () => {
    const firstDate = dates[0];
    const newDates = Array.from({ length: 30 }, (_, i) => subDays(firstDate, i + 1)).reverse();
    setDates([...newDates, ...dates]);
  };

  const appendDates = () => {
    const lastDate = dates[dates.length - 1];
    const newDates = Array.from({ length: 30 }, (_, i) => addDays(lastDate, i + 1));
    setDates([...dates, ...newDates]);
  };

  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return "Aujourd'hui";
    } else if (isYesterday(date)) {
      return "Hier";
    } else {
      return format(date, "d MMM yyyy", { locale: fr });
    }
  };

  const formatDay = (date: Date) => {
    return format(date, "EEE", { locale: fr });
  };

  const formatDayNumber = (date: Date) => {
    return format(date, "d", { locale: fr });
  };

  const scrollToToday = () => {
    const todayIndex = dates.findIndex((date) => isToday(date));
    if (todayIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
      setSelectedDate(new Date());
      setShowTodayButton(false);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 30, animated: false });
    }
  }, [dates]);

  return (
    <View style={styles.container}>
      <Text style={styles.fullDateText}>{formatDate(selectedDate)}</Text>
      {showTodayButton && (
        <TouchableOpacity onPress={scrollToToday} style={styles.todayButton}>
          <Text style={styles.todayButtonText}>Revenir à aujourd'hui</Text>
        </TouchableOpacity>
      )}
      <FlatList
        ref={flatListRef}
        data={dates}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dayItem, selectedDate.toDateString() === item.toDateString() && styles.selectedDayItem]}
            onPress={() => handleDayPress(item)}
          >
            <Text style={[styles.dayText, selectedDate.toDateString() === item.toDateString() && styles.selectedDayText]}>
              {formatDay(item)}
            </Text>
            <Text style={[styles.dayText, selectedDate.toDateString() === item.toDateString() && styles.selectedDayText]}>
              {formatDayNumber(item)}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  fullDateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  todayButton: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 15,
  },
  todayButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  dayItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 2,
    alignItems: "center",
  },
  selectedDayItem: {
    backgroundColor: "#007bff",
  },
  dayText: {
    fontSize: 14,
    color: "#000",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarHeader;
