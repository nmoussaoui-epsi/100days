import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const tasks = [
  {
    id: "1",
    name: "Fitness",
    status: "Ongoing",
    emoji: "💪",
    description: "Cardio, Pull Ups, Leg",
  },
  {
    id: "2",
    name: "Meditation",
    status: "Completed",
    emoji: "🧘",
    description: "Morning Meditation",
  },
  {
    id: "3",
    name: "Productivity",
    status: "Ongoing",
    emoji: "💼",
    description: "Work on project",
  },
];

interface SessionListProps {
  session: string;
}

const SessionList: React.FC<SessionListProps> = ({ session }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sessionTitle}>
        {session} Session ({tasks.length})
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.taskDetails}>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#007bff",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 24,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default SessionList;
