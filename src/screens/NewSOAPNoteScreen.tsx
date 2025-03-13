import React, { useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Button, Text, Card, useTheme, Icon, Input } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NewSOAPNoteScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

// Mock patients data (in a real app, this would come from your data store)
const mockPatients = [
  {
    id: "1",
    name: "John Doe",
    sport: "Basketball",
    team: "Varsity",
  },
  {
    id: "2",
    name: "Jane Smith",
    sport: "Soccer",
    team: "Women's",
  },
  {
    id: "3",
    name: "Mike Johnson",
    sport: "Football",
    team: "Varsity",
  },
];

const { width } = Dimensions.get("window");

const NewSOAPNoteScreen = ({ navigation }: NewSOAPNoteScreenProps) => {
  const { theme } = useTheme();
  const [isDictating, setIsDictating] = useState(false);
  const [sessionDictation, setSessionDictation] = useState("");
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [soapNote, setSOAPNote] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  // Animation for the recording indicator
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isDictating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isDictating]);

  const handleDictationToggle = () => {
    setIsDictating(!isDictating);
    // In a real app, this would start/stop the voice recording
    if (!isDictating) {
      // Starting new recording
      setSessionDictation("");
    } else {
      // Stopping recording - in a real app, this would trigger the AI processing
      // For demo purposes, we'll simulate the AI organizing the text
      simulateSOAPProcessing();
    }
  };

  const simulateSOAPProcessing = () => {
    // This is where the AI would process the dictation and organize it
    // For now, we'll just show the raw dictation in the preview
    setSOAPNote({
      subjective: "AI would extract subjective information here",
      objective: "AI would extract objective information here",
      assessment: "AI would extract assessment information here",
      plan: "AI would extract plan information here",
    });
  };

  const handleSelectPatient = (patient) => {
    // In a real app, you would save the SOAP note to the backend here
    // For now, we'll just simulate saving and navigate back
    setShowPatientModal(false);

    // Navigate to the patient's details screen with the new note
    navigation.navigate("PatientDetails", {
      patient,
      newNote: {
        id: Date.now().toString(), // Generate a temporary ID
        date: new Date().toISOString().split("T")[0],
        type: "New Note",
        summary: sessionDictation.substring(0, 100) + "...",
        soap: soapNote,
      },
    });
  };

  const PatientSelectionModal = () => (
    <Modal
      visible={showPatientModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPatientModal(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            maxHeight: "80%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: theme.colors.black,
              }}
            >
              Select Patient
            </Text>
            <TouchableOpacity onPress={() => setShowPatientModal(false)}>
              <Icon
                name="close-circle"
                type="ionicon"
                color={theme.colors.grey3}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={mockPatients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectPatient(item)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: theme.colors.white,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: theme.colors.grey1,
                }}
              >
                <View
                  style={{
                    backgroundColor: `${theme.colors.primary}10`,
                    borderRadius: 30,
                    padding: 10,
                    marginRight: 12,
                  }}
                >
                  <Icon
                    name="person-circle-outline"
                    type="ionicon"
                    color={theme.colors.primary}
                    size={24}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: theme.colors.black,
                      marginBottom: 4,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
                    {item.sport} • {item.team}
                  </Text>
                </View>
                <Icon
                  name="chevron-forward"
                  type="ionicon"
                  color={theme.colors.grey3}
                  size={20}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const DictationCard = ({
    isDictating,
    onPress,
    sessionDictation,
    setSessionDictation,
    pulseAnim,
    theme,
  }) => (
    <Card
      containerStyle={{
        borderRadius: 16,
        marginBottom: 16,
        padding: 20,
        borderWidth: 0,
        backgroundColor: isDictating
          ? `${theme.colors.primary}08`
          : theme.colors.white,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
              backgroundColor: isDictating
                ? theme.colors.primary
                : theme.colors.grey1,
              borderRadius: 40,
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Icon
              name={isDictating ? "mic" : "mic-outline"}
              type="ionicon"
              color={theme.colors.white}
              size={40}
            />
          </Animated.View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: theme.colors.black,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {isDictating
              ? "Recording Session Notes"
              : "Start Session Recording"}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.grey3,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {isDictating
              ? "Speak clearly - the AI will organize your notes into SOAP format"
              : "Tap the microphone to start recording your session notes"}
          </Text>
        </TouchableOpacity>
        {isDictating && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FF4444",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
            }}
          >
            <Icon
              name="radio"
              type="ionicon"
              color={theme.colors.white}
              size={16}
            />
            <Text
              style={{
                color: theme.colors.white,
                marginLeft: 6,
                fontWeight: "600",
              }}
            >
              RECORDING
            </Text>
          </View>
        )}
      </View>

      <Input
        multiline
        placeholder="Your session notes will appear here as you speak..."
        value={sessionDictation}
        onChangeText={setSessionDictation}
        disabled={isDictating}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: theme.colors.grey1,
          borderRadius: 12,
          paddingHorizontal: 12,
          minHeight: 120,
          backgroundColor: isDictating
            ? theme.colors.white
            : theme.colors.grey0,
        }}
        inputStyle={{
          fontSize: 14,
          color: theme.colors.black,
          textAlignVertical: "top",
          paddingTop: 12,
        }}
      />
    </Card>
  );

  const PreviewSection = () => (
    <Card
      containerStyle={{
        borderRadius: 16,
        marginBottom: 16,
        padding: 20,
        borderWidth: 0,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.black,
          marginBottom: 16,
        }}
      >
        SOAP Note Preview
      </Text>
      {Object.entries(soapNote).map(([key, value]) => (
        <View key={key} style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: theme.colors.primary,
              marginBottom: 4,
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.grey3,
              backgroundColor: theme.colors.grey0,
              padding: 12,
              borderRadius: 8,
            }}
          >
            {value || "AI will extract this section from your dictation"}
          </Text>
        </View>
      ))}
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.grey0 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text h4 style={{ marginBottom: 8 }}>
            New Session Note
          </Text>
          <Text style={{ color: theme.colors.grey3 }}>
            Record your session notes and let AI organize them into SOAP format
          </Text>
        </View>

        {/* Main Dictation Area */}
        <DictationCard
          isDictating={isDictating}
          onPress={handleDictationToggle}
          sessionDictation={sessionDictation}
          setSessionDictation={setSessionDictation}
          pulseAnim={pulseAnim}
          theme={theme}
        />

        {/* SOAP Preview */}
        <PreviewSection />

        {/* Save Button */}
        <Button
          title="Save SOAP Note"
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
            marginBottom: 20,
          }}
          onPress={() => setShowPatientModal(true)}
        />
      </ScrollView>

      <PatientSelectionModal />
    </View>
  );
};

export default NewSOAPNoteScreen;
