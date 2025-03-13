import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, useTheme, Input, Button } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NewPatientScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const NewPatientScreen = ({ navigation }: NewPatientScreenProps) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    team: "",
    age: "",
    gender: "",
    contactNumber: "",
    emergencyContact: "",
  });

  const handleSave = () => {
    // In a real app, this would save the patient data
    console.log("Saving patient:", formData);
    navigation.goBack();
  };

  const InputField = ({ label, value, field, placeholder }) => (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: theme.colors.grey3,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <Input
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [field]: text })}
        placeholder={placeholder}
        containerStyle={{ paddingHorizontal: 0 }}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: theme.colors.grey1,
          borderRadius: 12,
          paddingHorizontal: 12,
          height: 48,
        }}
        inputStyle={{
          fontSize: 16,
        }}
      />
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.grey0 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text h4 style={{ marginBottom: 24 }}>
        Add New Patient
      </Text>

      <Card
        containerStyle={{
          borderRadius: 16,
          marginHorizontal: 0,
          padding: 20,
          borderWidth: 0,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <InputField
          label="Full Name"
          value={formData.name}
          field="name"
          placeholder="Enter patient's full name"
        />

        <InputField
          label="Sport"
          value={formData.sport}
          field="sport"
          placeholder="Enter patient's sport"
        />

        <InputField
          label="Team"
          value={formData.team}
          field="team"
          placeholder="Enter patient's team"
        />

        <InputField
          label="Age"
          value={formData.age}
          field="age"
          placeholder="Enter patient's age"
        />

        <InputField
          label="Gender"
          value={formData.gender}
          field="gender"
          placeholder="Enter patient's gender"
        />

        <InputField
          label="Contact Number"
          value={formData.contactNumber}
          field="contactNumber"
          placeholder="Enter patient's contact number"
        />

        <InputField
          label="Emergency Contact"
          value={formData.emergencyContact}
          field="emergencyContact"
          placeholder="Enter emergency contact number"
        />

        <Button
          title="Save Patient"
          icon={{
            name: "save-outline",
            type: "ionicon",
            color: theme.colors.white,
            size: 20,
          }}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            paddingVertical: 12,
          }}
          onPress={handleSave}
        />
      </Card>
    </ScrollView>
  );
};

export default NewPatientScreen;
