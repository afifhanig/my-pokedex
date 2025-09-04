import { Button, Text, View } from "react-native";
export default function ErrorView({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={{ padding: 24, gap: 12, alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>
        {message ?? "Something went wrong."}
      </Text>
      {onRetry ? <Button title="Retry" onPress={onRetry} /> : null}
    </View>
  );
}
