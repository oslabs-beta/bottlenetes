import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// Component Imports
import MenuContainer from "./MenuContainer";
import Overview from "../components/Overview";
import Latency from "../components/Latency";
import Metrics from "../components/Metrics";
import PodGrid from "../components/PodGrid";
import RequestLimit from "../components/RequestLimit";

const MainContainer = ({ username }) => {
  const url = "http://localhost:3000/";

  // State variables for component interactions
  const [menu, setMenu] = useState(false);
  const [metric, setMetric] = useState("latency");
  const [defaultView, setDefaultView] = useState(true);
  const [clickedPod, setClickedPod] = useState("");
  const [podData, setPodData] = useState([]);
  const [allData, setAllData] = useState({
    podsStatuses: null,
    requestLimits: null,
    allNodes: null,
  });

  // Helper function to fetch API data
  const fetchData = async (method, endpoint, body = null) => {
    try {
      const request = {
        method: method,
        headers: { "Content-Type": "application/json" },
      };
      if (body) request.body = JSON.stringify(body);

      const response = await fetch(`${url}${endpoint}`, request);

      if (response.ok) {
        console.log(`✅ Successfully fetched: ${endpoint}`);
        return await response.json();
      } else {
        const data = await response.json();
        console.error(`🔥 Failed to fetch ${endpoint}:`, data);
      }
    } catch (error) {
      console.error(`😿 Server fetch failed for ${endpoint}:`, error);
    }
  };

  // OLD CODE: Missing `await` on fetch calls
  /*
  const status = fetchData("GET", "api/all-pods-status");
  const requestLimits = fetchData("GET", "api/all-pods-request-limit");
  const allNodes = fetchData("GET", "api/all-nodes");
  */

  // NEW CODE: Added `await` for correct data fetching
  useEffect(() => {
    const bigFetch = async () => {
      try {
        const status = await fetchData("GET", "api/all-pods-status");
        const requestLimits = await fetchData(
          "GET",
          "api/all-pods-request-limit",
        );
        const allNodes = await fetchData("GET", "api/all-nodes");

        console.log("✅ Successfully fetched all endpoints!");

        setAllData({
          podsStatuses: status || { allPodsStatus: [] },
          requestLimits: requestLimits || { allPodsRequestLimit: [] },
          allNodes: allNodes || { allNodes: [] },
        });
      } catch (error) {
        console.error("🔥 Error fetching initial data:", error);
      }
    };

    bigFetch();

    // Refresh data every 30 seconds
    const intervalID = setInterval(bigFetch, 30000);
    return () => {
      clearInterval(intervalID); // Clean up on unmount
    };
  }, []);

  // Component Rendering
  return (
    <div id="main-container">
      <button onClick={() => setMenu(!menu)}>Menu</button>
      {menu && <MenuContainer />}
      <h1>{`Welcome, ${username}`}</h1>

      <div className="grid-container">
        <Overview
          podsStatuses={allData.podsStatuses}
          allNodes={allData.allNodes}
        />
        <RequestLimit
          defaultView={defaultView}
          clickedPod={clickedPod}
          podData={podData}
          setPodData={setPodData}
        />
        <Latency
          defaultView={defaultView}
          clickedPod={clickedPod}
          podData={podData}
          setPodData={setPodData}
          allData={allData}
        />
        <Metrics
          defaultView={defaultView}
          clickedPod={clickedPod}
          podData={podData}
          setPodData={setPodData}
        />
        <PodGrid
          defaultView={defaultView}
          setDefaultView={setDefaultView}
          setClickedPod={setClickedPod}
          metric={metric}
          setMetric={setMetric}
          podData={podData}
          setPodData={setPodData}
        />
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  username: PropTypes.string.isRequired,
};

export default MainContainer;

// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";

// import MenuContainer from "./MenuContainer";
// import Overview from "../components/Overview";
// import Latency from "../components/Latency";
// import Metrics from "../components/Metrics";
// import PodGrid from "../components/PodGrid";
// import RequestLimit from "../components/RequestLimit";

// // Pod level data to be displayed, updates when user clicks into pod
// // const [podData, setPodData] = useState({});

// const MainContainer = ({ username }) => {
//   const url = "http:/localhost:3000/";

//   // State for when the menu button is clicked
//   const [menu, setMenu] = useState(false);

//   // Default metric set to latency
//   // const [metric, setMetric] = useState("latency");

//   // Determines if the graphs display node data or pod specific data
//   const [defaultView, setDefaultView] = useState(true);

//   // Overview data to be displayed at the very top
//   // const [overviewData, setOverviewData] = useState({});

//   // Which pod has been clicked
//   const [clickedPod, setClickedPod] = useState("");

//   // Data of selected pod
//   // const [podData, setPodData] = useState([]);

//   // Data of all pods
//   const [allData, setAllData] = useState({
//     podsStatuses: null,
//     requestLimits: null,
//     latency: null,
//     allNodes: null
//   });

//   //helper function
//   const fetchData = async (method, endpoint, body = null) => {
//     try {
//       const request = {
//         method: method,
//         header: { "Content-Type": "application/json" }
//       }
//       if (body) request.body = JSON.stringify(body);
//       const response = await fetch(url + endpoint, request);

//       if (response.ok) {
//         return await response.json();
//       } else {
//         const data = await response.json();
//         console.error(data);
//         // alert(response.statusText);
//       }
//     } catch (error) {
//       console.error(error);
//       // alert("😿 Could not fetch data from the server. TryingToFetch default data");
//     }
//   };

//   // Populate all pod status and pods request limit
//   // Run big fetch once every 30 seconds
//   useEffect(() => {
//     const bigFetch = async () => {
//       try {
//         const status = fetchData("GET", "api/all-pods-status");
//         const requestLimits = fetchData("GET", "api/all-pods-request-limit");
//         // CHECK ENDPOINT WITH FUNAN
//         // const latency = fetchData("GET", "api/all-pods-latency");
//         // const allNodes = fetchData("GET", "api/all-nodes");
//         // fake data used, to be replaced with the above
//         const fakeNodeData =
//         {
//           "allNodes": [
//             {
//             "nodeName": "Minikube",
//             "clusterName": "Minikube"
//             }
//           ]
//         }
//         // const allNodes = fakeNodeData;

//         setAllData({
//           podsStatuses: status,
//           requestLimits: requestLimits,
//           // latency: latency,
//           // allNodes: allNodes,
//           allNodes: fakeNodeData
//         });
//       } catch (error) {
//           console.error("Error fetching initial data:", error);
//       }
//     }
//     bigFetch();

//     const intervalID = setInterval(bigFetch, 30000);
//     return () => {
//       clearInterval(intervalID);
//     };
//   }, []);

//   // all pods state array

//   return (
//     <div id="main-container">
//       <button onClick={() => setMenu(true)}>Menu</button>
//       {!menu && <MenuContainer />}
//       <h1>{`Welcome, ${username}`}</h1>
//       <div /*grid*/>
//         <Overview
//           podsStatuses={allData.podsStatuses}
//           allNodes={allData.allNodes}
//         />
//         <RequestLimit
//           defaultView={defaultView}
//           clickedPod={clickedPod}
//           podData={podData}
//           setPodData={setPodData}
//         />
//         <Latency
//           defaultView={defaultView}
//           clickedPod={clickedPod}
//           podData={podData}
//           setPodData={setPodData}
//           allData={allData}
//         />
//         <Metrics
//           defaultView={defaultView}
//           clickedPod={clickedPod}
//           podData={podData}
//           setPodData={setPodData}
//         />
//         <PodGrid
//           defaultView={defaultView}
//           setDefaultView={setDefaultView}
//           setClickedPod={setClickedPod}
//           metric={metric}
//           setMetric={setMetric}
//           podData={podData}
//           setPodData={setPodData}
//         />
//       </div>
//       <button onClick={() => setDefaultView(true)}>Reset to default</button>
//       <button>Ask AI</button>
//     </div>
//   );
// };

// MainContainer.propTypes = {
//   username: PropTypes.string,
// };

// export default MainContainer;
