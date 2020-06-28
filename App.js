import React, { useState, createRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Icon, ListItem } from "react-native-elements";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Todos</Text>
    </View>
  );
};

const AddTodo = ({ onAddTodoClick }) => {
  const [todo, setTodo] = useState({ text: "", done: false, key: Date.now() });
  const inputRef = createRef();

  return (
    <View style={styles.input}>
      <Input
        multiline
        ref={inputRef}
        placeholder=" Add Todo"
        onChangeText={(text) => setTodo({ text, done: false, key: Date.now() })}
        value={todo.text}
        rightIcon={
          <Icon
            name="plus"
            type="material-community"
            size={30}
            color={colors.secondary}
            onPress={() => onAddTodoClick(todo, inputRef)}
          />
        }
      />
    </View>
  );
};

const Todo = ({ data: todo, onCheckboxClick, onDeleteClick }) => {
  return (
    <ListItem
      leftIcon={
        <Icon
          name={
            todo.done ? "checkbox-marked-outline" : "checkbox-blank-outline"
          }
          type="material-community"
          size={25}
          onPress={() => onCheckboxClick(todo.key)}
        />
      }
      rightIcon={
        <Icon
          name="trash-can-outline"
          type="material-community"
          size={25}
          color={colors.red}
          onPress={() => onDeleteClick(todo.key)}
        />
      }
      key={todo.key}
      title={todo.text}
      containerStyle={styles.todo}
      titleStyle={todo.done ? { textDecorationLine: "line-through" } : {}}
    />
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo, inputRef) => {
    if (todo.text.length > 0) {
      setTodos([...todos, todo]);
      inputRef.current.clear();
    }
  };

  const onDeleteClick = (key) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.key !== key) return true;
      })
    );
  };

  const onCheckboxClick = (key) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === key) todo.done = !todo.done;
        return todo;
      })
    );
  };

  return (
    <>
      <Header />
      <AddTodo onAddTodoClick={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.key}
          data={todo}
          onCheckboxClick={onCheckboxClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </>
  );
};

const colors = {
  primary: "#3d36eb",
  secondary: "#4ca6ff",
  light: "#ffff99",
  white: "#fff",
  red: "red",
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: colors.primary,
    color: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 22,
  },
  input: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  todo: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: colors.light,
    borderRadius: 25,
  },
});

export default App;
