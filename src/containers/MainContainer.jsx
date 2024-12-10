import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import MenuContainer from "./MenuContainer";
import Overview from "../components/Overview";
import ErrorRate from "../components/ErrorRate";
import Metrics from "../components/Metrics";
import PodGrid from "../components/PodGrid";
import TestGrid from "../test-components/TestGrid";
import TestRequestLimit from "../test-components/TestRequestLimit";
import RequestLimit from "../components/RequestLimit";

// Pod level data to be displayed, updates when user clicks into pod
// const [podData, setPodData] = useState({});

const MainContainer = ({ username }) => {
  const url = "http:/localhost:3000/";

  // State for when the menu button is clicked
  const [menu, setMenu] = useState(false);

  // Default metric set to latency
  const [metric, setMetric] = useState("latency");

  // Determines if the graphs display node data or pod specific data
  const [defaultView, setDefaultView] = useState(true);

  // Overview data to be displayed at the very top
  const [overviewData, setOverviewData] = useState({});

  // Which pod has been clicked
  const [clickedPod, setClickedPod] = useState("");

  // Data of selected pod
  const [podData, setPodData] = useState([]);

  //helper function
  const fetchData = async (method, endpoint, body) => {
    try {
      const response = await fetch(url + endpoint, {
        method: method,
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setOverviewData(data);
      } else {
        const data = await response.json();
        console.error(data);
        // alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
      // alert("😿 Could not fetch data from the server. TryingToFetch default data");
    }
  };
  //Used to populate overview component
  useEffect(() => {
    const body = {
      type: "cpu",
      time: "1d",
      aggregation: "avg",
      level: "node",
    };
    fetchData("POST", "query", body);
    const intervalID = setInterval(fetchData, 30000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div
      id="main-container"
      className="text-sinc-100 flex min-h-screen flex-col gap-4 bg-zinc-900 p-4"
    >
      <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenu(true)}
            className="rounded bg-zinc-800 px-4 py-2 text-zinc-100 hover:bg-zinc-700"
          >
            Menu
          </button>
          {!menu && <MenuContainer />}
        </div>
        <h1 className="text-zinc-200 text-2xl font-semibold">{`Welcome, ${username}`}</h1>
      </header>
      <div className="rounded bg-zinc-800 p-4">
        <Overview overviewData={overviewData} />
      </div>
      {/*Arrange components in columns for a larger screen, and stack vertically if the screen is smaller*/}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="relative flex-auto rounded bg-zinc-800 p-4 xl:col-span-2">
          <TestRequestLimit defaultView={defaultView} clickedPod={clickedPod} />
        </div>
        <div className="rounded bg-zinc-800 p-4 xl:col-span-2">
          <ErrorRate defaultView={defaultView} clickedPod={clickedPod} />
        </div>
        <div className="rounded bg-zinc-800 p-4 xl:col-span-2">
          <Metrics defaultView={defaultView} clickedPod={clickedPod} />
        </div>
        <div className="flex flex-col rounded bg-zinc-800 p-4 xl:col-span-2">
          <TestGrid
            defaultView={defaultView}
            setDefaultView={setDefaultView}
            setClickedPod={setClickedPod}
            metric={metric}
            setMetric={setMetric}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={() => setDefaultView(true)}>Reset to default</button>
          <button>Ask AI</button>
        </div>
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  username: PropTypes.string,
};

export default MainContainer;
