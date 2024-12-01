import { useState } from "react";
import LogInContainer from "./containers/LogInContainer";
import MainContainer from "./containers/MainContainer";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="app">
      {!loggedIn ? (
        <LogInContainer
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setLoggedIn={setLoggedIn}
        />
      ) : (
        <MainContainer username={username} />
      )}
    </div>
  );
}

export default App;
