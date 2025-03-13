import React, { useState } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Text, Card, useTheme, Icon, ButtonGroup } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AnalyticsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const { width } = Dimensions.get("window");

// Mock data for analytics
const mockAnalytics = {
  totalPatients: 45,
  activePatients: 32,
  notesThisWeek: 28,
  notesThisMonth: 112,
  treatmentTypes: [
    { type: "Rehabilitation", count: 25 },
    { type: "Assessment", count: 15 },
    { type: "Follow-up", count: 20 },
    { type: "Emergency", count: 5 },
  ],
  sportDistribution: [
    { sport: "Basketball", count: 12 },
    { sport: "Football", count: 15 },
    { sport: "Soccer", count: 10 },
    { sport: "Other", count: 8 },
  ],
};

const AnalyticsScreen = ({ navigation }: AnalyticsScreenProps) => {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState(0);
  const timeRangeOptions = ["Week", "Month", "Year"];

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      containerStyle={{
        borderRadius: 16,
        margin: 0,
        padding: 16,
        borderWidth: 0,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
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
            backgroundColor: `${color}15`,
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
          }}
        >
          <Icon name={icon} type="ionicon" color={color} size={20} />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.grey3,
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: theme.colors.black,
        }}
      >
        {value}
      </Text>
    </Card>
  );

  const DistributionCard = ({ title, data }) => (
    <Card
      containerStyle={{
        borderRadius: 16,
        margin: 0,
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
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: theme.colors.black,
          marginBottom: 16,
        }}
      >
        {title}
      </Text>
      {data.map((item, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
              {item.type || item.sport}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: theme.colors.black,
              }}
            >
              {item.count}
            </Text>
          </View>
          <View
            style={{
              height: 6,
              backgroundColor: theme.colors.grey1,
              borderRadius: 3,
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${
                  (item.count / Math.max(...data.map((d) => d.count))) * 100
                }%`,
                backgroundColor: theme.colors.primary,
                borderRadius: 3,
              }}
            />
          </View>
        </View>
      ))}
    </Card>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.grey0 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text h4 style={{ marginBottom: 8 }}>
        Analytics
      </Text>
      <Text style={{ color: theme.colors.grey3, marginBottom: 16 }}>
        Track patient treatment progress and insights
      </Text>

      <ButtonGroup
        buttons={timeRangeOptions}
        selectedIndex={timeRange}
        onPress={setTimeRange}
        containerStyle={{
          marginHorizontal: 0,
          marginBottom: 16,
          borderRadius: 8,
          borderWidth: 0,
          backgroundColor: theme.colors.grey1,
        }}
        selectedButtonStyle={{
          backgroundColor: theme.colors.primary,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <StatCard
          title="Total Patients"
          value={mockAnalytics.totalPatients}
          icon="people"
          color={theme.colors.primary}
        />
        <StatCard
          title="Active Cases"
          value={mockAnalytics.activePatients}
          icon="fitness"
          color="#4CAF50"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <StatCard
          title="Notes This Week"
          value={mockAnalytics.notesThisWeek}
          icon="document-text"
          color="#FF9800"
        />
        <StatCard
          title="Monthly Notes"
          value={mockAnalytics.notesThisMonth}
          icon="calendar"
          color="#2196F3"
        />
      </View>

      <DistributionCard
        title="Treatment Distribution"
        data={mockAnalytics.treatmentTypes}
      />

      <DistributionCard
        title="Sport Distribution"
        data={mockAnalytics.sportDistribution}
      />
    </ScrollView>
  );
};

export default AnalyticsScreen;
