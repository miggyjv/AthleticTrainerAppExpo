import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Text, Card, useTheme, Icon, Button, ButtonGroup } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RecentNotesScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

// Mock data for recent notes
const mockRecentNotes = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "1",
    date: "2024-03-20",
    type: "Follow-up",
    summary:
      "Patient showing improvement in knee mobility. Exercises adjusted.",
    sport: "Basketball",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "2",
    date: "2024-03-19",
    type: "Initial Assessment",
    summary: "New ankle sprain assessment. Grade 2 lateral sprain.",
    sport: "Soccer",
  },
  {
    id: "3",
    patientName: "Mike Johnson",
    patientId: "3",
    date: "2024-03-19",
    type: "Treatment",
    summary: "Shoulder rehabilitation exercises progressing well.",
    sport: "Football",
  },
];

const RecentNotesScreen = ({ navigation }: RecentNotesScreenProps) => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedSort, setSelectedSort] = useState(0);

  const filterOptions = ["All Notes", "This Week", "This Month"];
  const sortOptions = ["Latest", "Oldest"];

  const renderNoteCard = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PatientDetails", {
          patient: { id: item.patientId, name: item.patientName },
          highlightNoteId: item.id,
        })
      }
    >
      <Card
        containerStyle={{
          borderRadius: 16,
          marginHorizontal: 0,
          marginBottom: 16,
          padding: 16,
          borderWidth: 0,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.black,
                marginBottom: 4,
              }}
            >
              {item.patientName}
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
              {item.sport} • {item.type}
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
            {item.date}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 14,
            color: theme.colors.grey2,
            lineHeight: 20,
          }}
          numberOfLines={2}
        >
          {item.summary}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 12,
          }}
        >
          <Button
            type="clear"
            icon={{
              name: "chevron-forward",
              type: "ionicon",
              size: 20,
              color: theme.colors.primary,
            }}
            titleStyle={{ color: theme.colors.primary }}
            buttonStyle={{ padding: 0 }}
            title="View Details"
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.grey0 }}>
      <View style={{ padding: 16 }}>
        <Text h4 style={{ marginBottom: 8 }}>
          Recent Notes
        </Text>
        <Text style={{ color: theme.colors.grey3, marginBottom: 16 }}>
          View and manage all patient session notes
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <ButtonGroup
              buttons={filterOptions}
              selectedIndex={selectedFilter}
              onPress={setSelectedFilter}
              containerStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                borderWidth: 0,
                backgroundColor: theme.colors.grey1,
              }}
              selectedButtonStyle={{
                backgroundColor: theme.colors.primary,
              }}
              textStyle={{
                fontSize: 12,
              }}
            />
          </View>
          <View style={{ width: 120 }}>
            <ButtonGroup
              buttons={sortOptions}
              selectedIndex={selectedSort}
              onPress={setSelectedSort}
              containerStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                borderWidth: 0,
                backgroundColor: theme.colors.grey1,
              }}
              selectedButtonStyle={{
                backgroundColor: theme.colors.primary,
              }}
              textStyle={{
                fontSize: 12,
              }}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={mockRecentNotes}
        renderItem={renderNoteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
      />
    </View>
  );
};

export default RecentNotesScreen;
