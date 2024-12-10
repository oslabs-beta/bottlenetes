import { useState } from "react";
// import LogInContainer from "./containers/LogInContainer";
import MainContainer from "./containers/MainContainer";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");

  return (
    <div id="app">
      <MainContainer />
    </div>
  );
}

export default App;

// {/* {!loggedIn ? (
//         <LogInContainer
//           username={username}
//           setUsername={setUsername}
//           setLoggedIn={setLoggedIn}
//         />
//       ) : ( */}
//         <MainContainer username={username} />
//       {/* )} */}
