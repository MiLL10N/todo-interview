import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function AddTodo({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");

  const submit = () => {
    // Prevent adding empty todos
    if (!text.trim()) return;
    onAdd(text.trim());
    // Clear the input field after adding
    setText("");
  };

  return (
    <View style={styles.row}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Add todo"
        style={styles.input}
      />
      <Button title="Add" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
});
