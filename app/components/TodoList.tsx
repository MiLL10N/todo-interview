import { FlatList, Text, View } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onRemove,
  onToggle,
}: {
  todos: any[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  if (todos.length === 0) {
    return (
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text>No todos yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem todo={item} onRemove={onRemove} onToggle={onToggle} />
      )}
    />
  );
}
