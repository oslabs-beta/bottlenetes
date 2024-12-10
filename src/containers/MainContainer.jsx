import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import MenuContainer from "./MenuContainer";
import Overview from "../components/Overview";
import ErrorRate from "../components/ErrorRate";
import Metrics from "../components/Metrics";
import PodGrid from "../components/PodGrid";
import TestGrid from "../test-components/TestGrid";
import TestRequestLimit from "../test-components/TestRequestLimit";
import TestMetrics from "../test-components/TestMetrics";
import TestLatency from "../test-components/TestLatency";
import RequestLimit from "../components/RequestLimit";
import { Hexagon } from "lucide-react";
import "../styles.css";

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

  //helper function
  // const fetchData = async (method, endpoint, body) => {
  //   try {
  //     const response = await fetch(url + endpoint, {
  //       method: method,
  //       header: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setOverviewData(data);
  //     } else {
  //       const data = await response.json();
  //       console.error(data);
  //       alert(response.statusText);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert(
  //       "😿 Could not fetch data from the server. TryingToFetch default data",
  //     );
  //   }
  // };
  // //Used to populate overview component
  // useEffect(() => {
  //   const body = {
  //     type: "cpu",
  //     time: "1d",
  //     aggregation: "avg",
  //     level: "node",
  //   };
  //   fetchData("POST", "query", body);
  //   const intervalID = setInterval(fetchData, 30000);
  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, []);

  return (
    <div
      id="main-container"
      className="text-sinc-100 flex min-h-screen flex-col gap-4 bg-gradient-to-bl from-slate-950 from-10% via-slate-800 via-70% to-cyan-950 to-90% p-4"
    >
      <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenu(true)}
            className="rounded bg-slate-800 text-xl font-semibold px-6 py-3 text-slate-200 hover:bg-slate-700"
          >
            Menu
          </button>
          {!menu && <MenuContainer />}
        </div>
        <h1 className="text-color-animation font-sans text-6xl font-black transition duration-300 hover:scale-105">
          B o t t l e N e t e s
      </h1>
      <Hexagon
        className="slow-spin size-35"
        color="rgb(14, 116, 144)"
        strokeWidth={0.5}
      />
      <Hexagon
        className="slow-spin size-35 opacity-35"
        color="rgb(8 145 178)"
        strokeWidth={1}
      />
        <h1 className="text-slate-300 text-2xl font-semibold">{`Welcome, ${username}`}</h1>
      </header>
      <div className="rounded bg-slate-800 p-4">
        <Overview overviewData={overviewData} />
      </div>
      {/*Arrange components in columns for a larger screen, and stack vertically if the screen is smaller*/}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="relative flex-auto rounded bg-slate-800 p-4 xl:col-span-2">
          <TestRequestLimit defaultView={defaultView} clickedPod={clickedPod} />
        </div>
        <div className="rounded bg-slate-800 p-4 xl:col-span-2">
          <TestLatency defaultView={defaultView} clickedPod={clickedPod} />
        </div>
        <div className="rounded bg-slate-800 p-4 xl:col-span-2">
          <TestMetrics defaultView={defaultView} clickedPod={clickedPod} />
        </div>
        <div className="flex flex-col rounded bg-slate-800 p-4 xl:col-span-2">
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
