import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import {
  ListItem,
  Text,
  Button,
  SearchBar,
  useTheme,
  Icon,
  Card,
} from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PatientsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

// Temporary mock data
const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    sport: "Basketball",
    lastVisit: "2024-02-20",
    status: "Active",
    age: 22,
    team: "Varsity",
  },
  {
    id: "2",
    name: "Jane Smith",
    sport: "Soccer",
    lastVisit: "2024-02-19",
    status: "Active",
    age: 20,
    team: "Women's",
  },
  {
    id: "3",
    name: "Mike Johnson",
    sport: "Football",
    lastVisit: "2024-02-18",
    status: "Inactive",
    age: 21,
    team: "Varsity",
  },
  {
    id: "4",
    name: "Sarah Williams",
    sport: "Volleyball",
    lastVisit: "2024-02-17",
    status: "Active",
    age: 19,
    team: "Women's",
  },
  {
    id: "5",
    name: "Tom Brown",
    sport: "Baseball",
    lastVisit: "2024-02-16",
    status: "Active",
    age: 20,
    team: "JV",
  },
];

const { width } = Dimensions.get("window");

const PatientsScreen = ({ navigation }: PatientsScreenProps) => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = mockPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(text.toLowerCase()) ||
        patient.sport.toLowerCase().includes(text.toLowerCase()) ||
        patient.team.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const renderPatientCard = ({ item }: { item: (typeof mockPatients)[0] }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 16, marginVertical: 8 }}
      onPress={() => navigation.navigate("PatientDetails", { patient: item })}
    >
      <Card
        containerStyle={{
          margin: 0,
          borderRadius: 16,
          padding: 16,
          borderWidth: 0,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: `${theme.colors.primary}15`,
              borderRadius: 40,
              padding: 12,
              marginRight: 16,
            }}
          >
            <Icon
              name="person-circle-outline"
              type="ionicon"
              color={theme.colors.primary}
              size={32}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.black,
                marginBottom: 4,
              }}
            >
              {item.name}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 4 }}>
              <Text
                style={{
                  color: theme.colors.secondary,
                  marginRight: 16,
                  fontSize: 13,
                }}
              >
                <Icon
                  name="basketball-outline"
                  type="ionicon"
                  size={13}
                  color={theme.colors.secondary}
                />{" "}
                {item.sport} • {item.team}
              </Text>
              <Text style={{ color: theme.colors.secondary, fontSize: 13 }}>
                <Icon
                  name="person-outline"
                  type="ionicon"
                  size={13}
                  color={theme.colors.secondary}
                />{" "}
                {item.age} years
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: theme.colors.grey1,
              }}
            >
              <Text style={{ color: theme.colors.secondary, fontSize: 13 }}>
                <Icon
                  name="calendar-outline"
                  type="ionicon"
                  size={13}
                  color={theme.colors.secondary}
                />{" "}
                Last visit: {item.lastVisit}
              </Text>
              <Button
                title="View Details"
                type="clear"
                icon={{
                  name: "chevron-forward-outline",
                  type: "ionicon",
                  size: 16,
                  color: theme.colors.primary,
                }}
                iconRight
                titleStyle={{
                  color: theme.colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
                onPress={() =>
                  navigation.navigate("PatientDetails", { patient: item })
                }
              />
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.grey0 }}>
      <View style={{ padding: 16, backgroundColor: theme.colors.white }}>
        <SearchBar
          placeholder="Search by name, sport, or team..."
          onChangeText={handleSearch}
          value={search}
          containerStyle={{
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            padding: 0,
            marginBottom: 12,
          }}
          inputContainerStyle={{
            backgroundColor: theme.colors.grey0,
            borderRadius: 12,
          }}
          lightTheme
        />

        <Button
          title="Add New Patient"
          icon={{
            name: "add",
            type: "ionicon",
            color: theme.colors.white,
            size: 20,
          }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            paddingVertical: 12,
          }}
          containerStyle={{
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("NewPatient")}
        />
      </View>

      <FlatList
        data={filteredPatients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};

export default PatientsScreen;
