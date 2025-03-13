import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Text, Card, useTheme, Icon, Button } from "@rneui/themed";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SOAPNoteDetailsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: any;
};

const exportFormats = [
  {
    id: "pdf",
    name: "PDF Document",
    icon: "document-text",
    description: "Export as a professional PDF document",
  },
  {
    id: "word",
    name: "Word Document",
    icon: "document",
    description: "Export as an editable Word document",
  },
  {
    id: "text",
    name: "Plain Text",
    icon: "text",
    description: "Export as a simple text file",
  },
  {
    id: "email",
    name: "Email",
    icon: "mail",
    description: "Send directly via email",
  },
];

const SOAPNoteDetailsScreen = ({ route }: SOAPNoteDetailsScreenProps) => {
  const { theme } = useTheme();
  const [showExportModal, setShowExportModal] = useState(false);
  const { note } = route.params;

  const handleExport = (format: string) => {
    // In a real app, this would handle the actual export
    console.log(`Exporting as ${format}`);
    setShowExportModal(false);
  };

  const ExportModal = () => (
    <Modal
      visible={showExportModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowExportModal(false)}
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
              Export Note
            </Text>
            <TouchableOpacity onPress={() => setShowExportModal(false)}>
              <Icon
                name="close-circle"
                type="ionicon"
                color={theme.colors.grey3}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 14,
              color: theme.colors.grey3,
              marginBottom: 16,
            }}
          >
            Choose your preferred export format
          </Text>

          {exportFormats.map((format) => (
            <TouchableOpacity
              key={format.id}
              onPress={() => handleExport(format.id)}
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
                  name={format.icon}
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
                  {format.name}
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.grey3 }}>
                  {format.description}
                </Text>
              </View>
              <Icon
                name="chevron-forward"
                type="ionicon"
                color={theme.colors.grey3}
                size={20}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.grey0,
      }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 0, // Remove bottom padding
      }}
    >
      {/* Note Metadata */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.grey3,
            marginBottom: 4,
          }}
        >
          {note.date}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            color: theme.colors.black,
            marginBottom: 8,
          }}
        >
          {note.type}
        </Text>
      </View>

      {/* SOAP Note Content */}
      {Object.entries(note.soap).map(([key, value]) => (
        <Card
          key={key}
          containerStyle={{
            borderRadius: 16,
            marginHorizontal: 0,
            marginBottom: 16,
            padding: 20,
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
              color: theme.colors.primary,
              marginBottom: 8,
              textTransform: "capitalize",
            }}
          >
            {key}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.black,
              lineHeight: 24,
            }}
          >
            {value}
          </Text>
        </Card>
      ))}

      {/* Export Button */}
      <Button
        title="Export Note"
        icon={{
          name: "share-outline",
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
          marginTop: 8,
          marginBottom: 16, // Reduced from 20
        }}
        onPress={() => setShowExportModal(true)}
      />

      <ExportModal />
    </ScrollView>
  );
};

export default SOAPNoteDetailsScreen;
