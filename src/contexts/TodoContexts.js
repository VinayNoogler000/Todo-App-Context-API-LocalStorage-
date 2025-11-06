import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Eat Sleep Code",
            isCompleted: false,
        }
    ],
    addTodo: (todo) => {},
    toggleTodo: (id) => {},
    editTodo: (id, todo) => {},
    deleteTodo: (id) => {}
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodoContext = () => useContext(TodoContext);