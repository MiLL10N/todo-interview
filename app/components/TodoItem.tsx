import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function TodoList({
  todo,
  onRemove,
  onToggle,
}: {
  todo: any;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <View style={styles.item}>
      <BouncyCheckbox
        style={{ flex: 1 }}
        isChecked={todo.done}
        fillColor="green"
        text={todo.text}
        textStyle={[styles.text]}
        onPress={() => {
          onToggle(todo.id);
        }}
      />
      <TouchableOpacity onPress={() => onRemove(todo.id)}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.2,
    borderColor: "#4e4e4e41",
  },
  date: {
    position: "absolute",
    right: 30,
    bottom: 0,
    fontSize: 8,
    color: "#999",
  },
  text: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#999" },
  remove: { color: "#e53935", fontSize: 18, paddingHorizontal: 8 },
});
