import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { format, addDays, subDays, isToday, isYesterday, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

const ITEM_WIDTH = 50;

const CalendarHeader = forwardRef(({ onDateChange }: { onDateChange: (date: string) => void }, ref) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(generateWeekDates(new Date()));
  const flatListRef = useRef<FlatList>(null);

  function generateWeekDates(date: Date) {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Start week on Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }

  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
    onDateChange(formatDate(date));
  };

  const handlePrevWeek = () => {
    const newStartDate = subDays(dates[0], 7);
    setDates(generateWeekDates(newStartDate));
  };

  const handleNextWeek = () => {
    const newStartDate = addDays(dates[0], 7);
    setDates(generateWeekDates(newStartDate));
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
    return format(date, "EE", { locale: fr }).toUpperCase();
  };

  const formatDayNumber = (date: Date) => {
    return format(date, "d", { locale: fr });
  };

  useImperativeHandle(ref, () => ({
    scrollToToday: () => {
      const today = new Date();
      const todayStartOfWeek = startOfWeek(today, { weekStartsOn: 1 });
      const currentStartOfWeek = startOfWeek(dates[0], { weekStartsOn: 1 });

      if (todayStartOfWeek.getTime() !== currentStartOfWeek.getTime()) {
        const newDates = generateWeekDates(today);
        setDates(newDates);
        setTimeout(() => {
          const todayIndex = newDates.findIndex((date) => isToday(date));
          if (todayIndex !== -1 && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
            setSelectedDate(today);
            onDateChange(formatDate(today));
          }
        }, 0);
      } else {
        const todayIndex = dates.findIndex((date) => isToday(date));
        if (todayIndex !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
          setSelectedDate(today);
          onDateChange(formatDate(today));
        }
      }
    },
  }));

  useEffect(() => {
    onDateChange(formatDate(new Date()));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevWeek}>
        <Image source={require("../../assets/icons/arrow-left.png")} style={styles.navIcon} />
      </TouchableOpacity>
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
        getItemLayout={(data, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
      <TouchableOpacity onPress={handleNextWeek}>
        <Image source={require("../../assets/icons/arrow-right.png")} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#007bff",
  },
  dayItem: {
    width: ITEM_WIDTH,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    marginHorizontal: 2,
    alignItems: "center",
  },
  selectedDayItem: {
    backgroundColor: "#f3f2f1",
    borderColor: "#f3f2f1",
  },
  dayText: {
    fontSize: 10,
    color: "#333",
    paddingVertical: 8,
  },
  selectedDayText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default CalendarHeader;
