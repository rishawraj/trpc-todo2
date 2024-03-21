import { trpc } from "./trpc";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const getMessage = async () => {
    try {
      const m = await trpc.sayHi.query();
      setMessage(m);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);
  return (
    <>
      <h1>tRPC Todo</h1>
      <p>{message}</p>
    </>
  );
}

export default App;
