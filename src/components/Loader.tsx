import { ActivityIndicator, View } from "react-native";
export default function Loader() {
  return (
    <View
      style={{ padding: 24, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator />
    </View>
  );
}
