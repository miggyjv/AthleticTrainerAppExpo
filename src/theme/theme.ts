import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    primary: "#8C1515", // Stanford Cardinal Red
    secondary: "#4D4F53", // Cool Grey
    background: "#FFFFFF",
    white: "#FFFFFF",
    black: "#000000",
    grey0: "#F7F7F7",
    grey1: "#E6E6E6",
    grey2: "#CCCCCC",
    grey3: "#B3B3B3",
    grey4: "#999999",
    grey5: "#4D4F53",
    success: "#2E8540",
    error: "#B1040E",
    warning: "#F7D663",
    info: "#0098DB", // Healing Blue
  },
  mode: "light",
  components: {
    Button: {
      raised: true,
      buttonStyle: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      titleStyle: {
        fontSize: 16,
        fontWeight: "600",
      },
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
      },
      inputStyle: {
        fontSize: 16,
      },
      errorStyle: {
        margin: 4,
      },
    },
    Text: {
      h1Style: {
        fontSize: 32,
        fontWeight: "700",
        color: "#8C1515",
      },
      h2Style: {
        fontSize: 28,
        fontWeight: "600",
        color: "#4D4F53",
      },
      h3Style: {
        fontSize: 24,
        fontWeight: "600",
        color: "#4D4F53",
      },
      h4Style: {
        fontSize: 20,
        fontWeight: "600",
        color: "#4D4F53",
      },
    },
    ListItem: {
      containerStyle: {
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      },
    },
  },
});
