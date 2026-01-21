import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load todos from AsyncStorage on component mount
  useEffect(() => {
    (async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos && storedTodos !== "[]") {
          setTodos(JSON.parse(storedTodos));
        } else {
          const now = new Date().toISOString();
          const defaultTodos = [
            { id: "1", text: "Sample Todo", done: false, createdDate: now },
            { id: "2", text: "Another Todo", done: false, createdDate: now },
            { id: "3", text: "Third Todo", done: false, createdDate: now },
          ];
          setTodos(defaultTodos);
        }
      } catch (error) {
        console.error("Failed to load todos from storage:", error);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, isLoaded]);

  // Handlers for removing
  const remove = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Handlers for toggling
  const toggle = (id: string) =>
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  // Handlers for adding
  const add = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      done: false,
      createdDate: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={[styles.title]}>To-Do List</Text>
      </View>
      <AddTodo onAdd={add}></AddTodo>
      {todos.length > 0 && (
        <Text style={{ color: "gray" }}>
          {todos.filter((t) => !t.done).length} tasks remaining
        </Text>
      )}
      <TodoList todos={todos} onRemove={remove} onToggle={toggle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 32, fontWeight: "700" },
});
