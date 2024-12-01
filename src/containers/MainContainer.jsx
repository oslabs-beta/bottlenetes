import PropTypes from "prop-types";
import { useState } from "react";
import MenuContainer from "./MenuContainer";

const MainContainer = ({ username }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <button onClick={() => setMenu(true)}>Menu</button>
      {!menu && <MenuContainer />}
      <h1>{`Welcome, ${username}`}</h1>
    </div>
  );
};

MainContainer.propTypes = {
  username: PropTypes.string,
};

export default MainContainer;
