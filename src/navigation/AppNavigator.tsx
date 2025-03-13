import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "@rneui/themed";
import { Platform } from "react-native";

// We'll create these screens next
import HomeScreen from "../screens/HomeScreen";
import NewSOAPNoteScreen from "../screens/NewSOAPNoteScreen";
import PatientsScreen from "../screens/PatientsScreen";
import PatientDetailsScreen from "../screens/PatientDetailsScreen";
import SOAPNoteDetailsScreen from "../screens/SOAPNoteDetailsScreen";
import RecentNotesScreen from "../screens/RecentNotesScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import NewPatientScreen from "../screens/NewPatientScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Patients") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Recent") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }
          return (
            <Icon
              name={iconName || "help-outline"}
              type="ionicon"
              size={24}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.grey3,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme.colors.white,
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
          paddingTop: 12,
          elevation: 0,
          shadowColor: theme.colors.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          paddingBottom: Platform.OS === "ios" ? 0 : 4,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
        options={{
          title: "Patients",
        }}
      />
      <Tab.Screen
        name="Recent"
        component={RecentNotesScreen}
        options={{
          title: "Recent Notes",
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: "Analytics",
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: theme.colors.grey0,
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewSOAPNote"
          component={NewSOAPNoteScreen}
          options={{
            title: "New SOAP Note",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="PatientDetails"
          component={PatientDetailsScreen}
          options={{
            title: "Patient Details",
            headerBackTitle: "Patients",
          }}
        />
        <Stack.Screen
          name="SOAPNoteDetails"
          component={SOAPNoteDetailsScreen}
          options={{
            title: "SOAP Note Details",
            headerBackTitle: "Patient",
          }}
        />
        <Stack.Screen
          name="NewPatient"
          component={NewPatientScreen}
          options={{
            title: "Add New Patient",
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
