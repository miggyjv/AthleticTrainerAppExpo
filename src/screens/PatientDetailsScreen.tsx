import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, useTheme, Icon, Button } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PatientDetailsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: {
    params: {
      patient: {
        id: string;
        name: string;
        sport: string;
        team: string;
        age: number;
        status: string;
      };
    };
  };
};

// Mock SOAP notes data
const mockSoapNotes = [
  {
    id: "1",
    date: "2024-02-20",
    type: "Initial Evaluation",
    summary: "Right ankle sprain during basketball practice",
    soap: {
      subjective: "Patient reports rolling ankle during practice",
      objective: "Swelling observed, limited ROM",
      assessment: "Grade 2 lateral ankle sprain",
      plan: "RICE protocol, ankle exercises",
    },
  },
  {
    id: "2",
    date: "2024-02-22",
    type: "Follow-up",
    summary: "Ankle rehabilitation progress",
    soap: {
      subjective: "Decreased pain, feeling more stable",
      objective: "Reduced swelling, improved ROM",
      assessment: "Improving as expected",
      plan: "Continue rehab exercises",
    },
  },
];

const PatientDetailsScreen = ({
  navigation,
  route,
}: PatientDetailsScreenProps) => {
  const { theme } = useTheme();
  const { patient } = route.params;

  const PatientInfoCard = () => (
    <Card
      containerStyle={{
        borderRadius: 24,
        marginBottom: 24,
        padding: 20,
        borderWidth: 0,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: theme.colors.white,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {/* Avatar Section */}
        <View
          style={{
            backgroundColor: `${theme.colors.primary}10`,
            borderRadius: 50,
            padding: 20,
            marginRight: 16,
          }}
        >
          <Icon
            name="person-circle-outline"
            type="ionicon"
            color={theme.colors.primary}
            size={48}
          />
        </View>

        {/* Info Section */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "600",
              color: theme.colors.black,
              marginBottom: 8,
            }}
          >
            {patient.name}
          </Text>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.grey3,
              }}
            >
              <Icon
                name="basketball-outline"
                type="ionicon"
                size={16}
                color={theme.colors.grey3}
              />{" "}
              {patient.sport} • {patient.team}
            </Text>
            <Text style={{ fontSize: 16, color: theme.colors.grey3 }}>
              <Icon
                name="person-outline"
                type="ionicon"
                size={16}
                color={theme.colors.grey3}
              />{" "}
              {patient.age} years
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const SOAPNoteCard = ({ note }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("SOAPNoteDetails", { note })}
      style={{
        marginBottom: 12,
      }}
    >
      <Card
        containerStyle={{
          borderRadius: 16,
          padding: 16,
          borderWidth: 0,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
          margin: 0,
          backgroundColor: theme.colors.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              backgroundColor: `${theme.colors.primary}10`,
              borderRadius: 20,
              padding: 8,
              marginRight: 12,
            }}
          >
            <Icon
              name="document-text-outline"
              type="ionicon"
              color={theme.colors.primary}
              size={20}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.black,
                marginBottom: 2,
              }}
            >
              {note.type}
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
              {note.date}
            </Text>
          </View>
          <Icon
            name="chevron-forward-outline"
            type="ionicon"
            color={theme.colors.grey3}
            size={24}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
            color: theme.colors.grey3,
            marginLeft: 40,
          }}
        >
          {note.summary}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.grey0 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <PatientInfoCard />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: theme.colors.black,
            }}
          >
            SOAP Notes History
          </Text>
          <Button
            title="+ New Note"
            buttonStyle={{
              backgroundColor: theme.colors.primary,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            titleStyle={{
              fontSize: 16,
              fontWeight: "600",
            }}
            containerStyle={{
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate("NewSOAPNote")}
          />
        </View>

        {mockSoapNotes.map((note) => (
          <SOAPNoteCard key={note.id} note={note} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PatientDetailsScreen;
