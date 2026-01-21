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
    <View>
      <Text style={{ marginBottom: 10 }}>
        {" "}
        Total completed: {todos.filter((todo) => todo.done).length}
      </Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onRemove={onRemove} onToggle={onToggle} />
        )}
      />
    </View>
  );
}
