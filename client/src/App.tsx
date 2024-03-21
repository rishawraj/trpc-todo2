import { useEffect, useState } from "react";
import { trpc } from "./trpc";
import { Todo } from "../../server/src/db/schema";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>();
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (name: string) => {
    const todo = await trpc.todo.addTodo.mutate({
      name: name,
      isDone: false,
    });
    return todo;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo) return;
    await addTodo(newTodo);
    setNewTodo("");
    fetchTodos();
  };

  const fetchTodos = async () => {
    const newTodos = await trpc.todo.getTodos.query();
    setTodos(newTodos);
  };

  const handleDelete = async (id: number) => {
    const deletedTodo = await trpc.todo.deleteTodo.mutate({
      id: id,
    });

    fetchTodos();
    return deletedTodo;
  };

  const handleCheckBoxChange = async (id: number, isDone: boolean) => {
    const updatedTodo = await trpc.todo.updateTodo.mutate({
      id: id,
      isDone: !isDone,
    });

    fetchTodos();

    return updatedTodo;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h1>Learn tRPC</h1>
      <ul>
        {todos &&
          todos.map((todo) => {
            return (
              <div
                key={todo.id}
                style={{ margin: "5px", display: "flex", gap: "5px" }}
              >
                <input
                  type="checkbox"
                  name="todo"
                  id="todo"
                  checked={todo.isDone}
                  onChange={() => handleCheckBoxChange(todo.id, todo.isDone)}
                />
                <label htmlFor="todo">{todo.name}</label>
                <button onClick={() => handleDelete(todo.id)}>x</button>
              </div>
            );
          })}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </>
  );
}

export default App;
