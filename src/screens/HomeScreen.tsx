import React from "react";
import { View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Button, Text, Card, useTheme, Icon } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 48 = padding (16) * 2 + gap between cards (16)

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { theme } = useTheme();

  const QuickActionCard = ({
    title,
    icon,
    onPress,
    description,
  }: {
    title: string;
    icon: string;
    onPress: () => void;
    description: string;
  }) => (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={{
          borderRadius: 16,
          marginHorizontal: 0,
          marginBottom: 16,
          padding: 20,
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
              backgroundColor: `${theme.colors.primary}10`,
              borderRadius: 12,
              padding: 12,
              marginRight: 16,
            }}
          >
            <Icon
              name={icon}
              type="ionicon"
              color={theme.colors.primary}
              size={24}
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
              {title}
            </Text>
            <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
              {description}
            </Text>
          </View>
          <Icon
            name="chevron-forward"
            type="ionicon"
            color={theme.colors.grey3}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.grey0 }}>
      <View style={{ padding: 16 }}>
        {/* Header Section */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 60,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Icon
              name="medical"
              type="ionicon"
              color={theme.colors.white}
              size={48}
            />
          </View>
          <Text h1 style={{ marginBottom: 8, textAlign: "center" }}>
            DocNote
          </Text>
          <Text
            style={{
              color: theme.colors.grey3,
              fontSize: 16,
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            Your Professional Athletic Training Assistant
          </Text>
        </View>

        {/* Stats Card */}
        <Card
          containerStyle={{
            borderRadius: 16,
            marginBottom: 24,
            padding: 20,
            backgroundColor: theme.colors.info,
            borderWidth: 0,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 24,
                  fontWeight: "700",
                }}
              >
                12
              </Text>
              <Text style={{ color: theme.colors.white, opacity: 0.9 }}>
                Active Patients
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 24,
                  fontWeight: "700",
                }}
              >
                28
              </Text>
              <Text style={{ color: theme.colors.white, opacity: 0.9 }}>
                SOAP Notes
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 24,
                  fontWeight: "700",
                }}
              >
                5
              </Text>
              <Text style={{ color: theme.colors.white, opacity: 0.9 }}>
                Today's Tasks
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: theme.colors.black,
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <QuickActionCard
            title="New SOAP Note"
            description="Create a new session note for a patient"
            icon="document-text"
            onPress={() => navigation.navigate("NewSOAPNote")}
          />

          <QuickActionCard
            title="Patient List"
            description="View and manage your patients"
            icon="people"
            onPress={() => navigation.navigate("Patients")}
          />

          <QuickActionCard
            title="Recent Notes"
            description="View and manage recent session notes"
            icon="time"
            onPress={() => navigation.navigate("Recent")}
          />

          <QuickActionCard
            title="Analytics"
            description="View patient treatment insights"
            icon="bar-chart"
            onPress={() => navigation.navigate("Analytics")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
