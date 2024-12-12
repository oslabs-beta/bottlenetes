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
import TestOverview from "../test-components/TestOverview";
import RequestLimit from "../components/RequestLimit";
import { Hexagon } from "lucide-react";
import "../styles.css";

// Pod level data to be displayed, updates when user clicks into pod
// const [podData, setPodData] = useState({});

const MainContainer = ({ username }) => {
  const url = "http:/localhost:3000/";

  username = "Quin";

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
    <div>
      <header className="header sticky top-0 z-50 flex flex-col items-center justify-between gap-4 border-b-2 border-slate-600 bg-slate-950 py-4 sm:flex-row">
        <div id="leftside" className="flex items-center">
          <div className="flex items-center gap-0 px-5">
            <button
              onClick={() => setMenu(true)}
              className="group inline-flex h-12 w-12 items-center justify-center rounded border-2 border-slate-500 bg-slate-950 text-center text-slate-300"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="pointer-events-none h-6 w-6 fill-current"
                viewBox="0 0 16 16"
              >
                <rect
                  className="origin-center -translate-y-[5px] translate-x-[7px]"
                  y="7"
                  width="9"
                  height="2"
                ></rect>
                <rect
                  className="origin-center"
                  y="7"
                  width="16"
                  height="2"
                ></rect>
                <rect
                  className="origin-center translate-y-[5px]"
                  y="7"
                  width="9"
                  height="2"
                ></rect>
              </svg>
            </button>
            {!menu && <MenuContainer />}
          </div>
          <h1 className="bg-gradient-to-bl from-blue-500 to-blue-600 bg-clip-text px-5 font-sans text-5xl font-bold text-transparent transition duration-300 hover:scale-105">
            BottleNetes
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="mr-5 px-5 text-2xl font-semibold text-slate-300">{`Welcome, ${username}`}</h1>
        </div>
      </header>
      <div className="bg-custom-gradient">
        <div className="border-b-2 border-slate-600 bg-slate-950 p-10">
          <TestOverview overviewData={overviewData} />
        </div>
        <div
          id="main-container"
          className="flex min-h-screen flex-col gap-4 p-6 text-slate-100"
        >
          {/*Arrange components in columns for a larger screen, and stack vertically if the screen is smaller*/}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-4">
            <div className="relative flex-auto rounded-3xl p-4 shadow-custom-lg xl:col-span-2">
              <h2 className="text-center text-2xl font-semibold text-slate-300">
                Request Rate vs. Limit
              </h2>
              <TestRequestLimit
                defaultView={defaultView}
                clickedPod={clickedPod}
              />
            </div>
            <div className="rounded-3xl p-4 shadow-custom-lg xl:col-span-2">
              <h2 className="text-center text-2xl font-semibold text-slate-300">
                Latency
              </h2>
              <TestLatency defaultView={defaultView} clickedPod={clickedPod} />
            </div>
            <div className="max-h-[41%] rounded-3xl p-4 shadow-custom-lg xl:col-span-2">
              <h2 className="text-center text-2xl font-semibold text-slate-300">
                Additional Metrics
              </h2>
              <TestMetrics defaultView={defaultView} clickedPod={clickedPod} />
            </div>
            <div className="flex max-h-[41%] shadow-custom-lg flex-col rounded-3xl bg-transparent p-4 xl:col-span-2">
              <h2 className="text-center text-2xl font-semibold text-slate-300">
                Select Pod
              </h2>
              <TestGrid
                defaultView={defaultView}
                setDefaultView={setDefaultView}
                setClickedPod={setClickedPod}
                metric={metric}
                setMetric={setMetric}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setDefaultView(true)}>
                Reset to default
              </button>
              <button>Ask AI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  username: PropTypes.string,
};

export default MainContainer;
