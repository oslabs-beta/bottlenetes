import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Overview.css";

const Overview = ({ podsStatuses, allNodes }) => {
  // Set initial state for metrics overview
  const [overview, setOverview] = useState({
    clusterName: "Loading...",
    nodes: 0,
    pods: 0,
    containers: 0,
  });

  // Loading and error states for UI feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true); // Start loading
      console.log("🏃💨 Fetching data...");

      // Check if podsStatuses and allNodes contain valid data
      if (
        podsStatuses?.allPodsStatus?.length &&
        allNodes?.allNodes?.length
      ) {
        // OLD CODE: No null checks, assumed data was present
        /*
        const podCount = podsStatuses.allPodsStatus.length;
        const containerCount = podsStatuses.allPodsStatus.reduce(
          (acc, pod) => acc + pod.containerCount,
          0
        );
        const clusterName = allNodes.allNodes[0]?.clusterName || "Unknown";
        const nodeCount = allNodes.allNodes.length;
        */

        // NEW CODE: Add null checks and safe defaults
        const podCount = podsStatuses.allPodsStatus.length;
        const containerCount = podsStatuses.allPodsStatus.reduce(
          (acc, pod) => acc + pod.containerCount,
          0
        );
        const clusterName = allNodes.allNodes[0]?.clusterName || "Unknown";
        const nodeCount = allNodes.allNodes.length;

        setTimeout(() => {
          setOverview({
            clusterName,
            nodes: nodeCount,
            pods: podCount,
            containers: containerCount,
          });
          console.log("✅ Data successfully loaded!");
          setLoading(false); // Stop loading
        }, 3000);
      }
    } catch (err) {
      console.error("❌💀❌💀 Error fetching metrics:", err);
      setError(err.message || "An unknown error occurred.");
      setLoading(false); // Stop loading on error
    }
  }, [podsStatuses, allNodes]); // Re-run if data changes

  // Render UI for loading state
  if (loading) {
    return (
      <div className="overview-container fade-in">
        <p className="overview-message blinking">
          ⏳ Loading Cluster Overview...
        </p>
      </div>
    );
  }

  // Render UI for error state
  if (error) {
    return (
      <div className="overview-container fade-in">
        <p className="overview-error">❗❗ Error❗❗ : {error}</p>
      </div>
    );
  }

  // Render UI when data is loaded
  return (
    <div className="overview-container fade-in">
      <div className="overview-cluster thin-line">
        <h2 style={{ fontWeight: 600 }}>Cluster Name</h2>
        <p className="overview-value dynamic-text">{overview.clusterName}</p>
      </div>

      <div className="overview-metrics-row">
        <div className="overview-card overview-nodes">
          <h2>No. of Nodes</h2>
          <p className="overview-value">{overview.nodes}</p>
        </div>

        <div className="overview-card overview-pods">
          <h2>No. of Pods</h2>
          <p className="overview-value">{overview.pods}</p>
        </div>

        <div className="overview-card overview-containers">
          <h2>No. of Containers</h2>
          <p className="overview-value">{overview.containers}</p>
        </div>
      </div>
    </div>
  );
};

// Type checking for props to ensure correct data structure
Overview.propTypes = {
  podsStatuses: PropTypes.object.isRequired,
  allNodes: PropTypes.object.isRequired,
};

export default Overview;

// import React, { useState, useEffect } from "react";
// import "./Overview.css";

// const Overview = ({ podsStatuses, allNodes }) => {
//   const [overview, setOverview] = useState({
//     clusterName: "Loading...",
//     nodes: 0,
//     pods: 0,
//     containers: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     try {
//       setLoading(true);
//       console.log("🏃💨 Fetching data...");

//       if (podsStatuses.allPodsStatus && allNodes.allNodes) {
//         const podCount = podsStatuses.allPodsStatus.length;
//         const containerCount = podsStatuses.allPodsStatus.reduce(
//           (acc, pod) => acc + pod.containerCount,
//           0,
//         );
//         const clusterName = "MiniKube";
//         // Need to populate cluster name here, currently hard coded- COME BACK TO
//         const nodeCount = allNodes.allNodes.length;
//         // podsStatuses.allPodsStatus[0]?.clusterName || "Unknown";

//         setTimeout(() => {
//           setOverview({
//             clusterName: clusterName,
//             nodes: nodeCount,
//             pods: podCount,
//             containers: containerCount,
//           });
//           console.log("✅ Data successfully loaded!");
//           setLoading(false);
//         }, 3000);
//       }
//     } catch (err) {
//       console.error("😵 Error fetching metrics:", err);
//       setError(err.message || "An unknown error occurred.");
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="overview-container fade-in">
//         <p className="overview-message blinking">
//           ⏳ Loading Cluster Overview...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="overview-container fade-in">
//         <p className="overview-error">❗❗ Error❗❗ : {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overview-container fade-in">
//       <div className="overview-cluster thin-line">
//         <h2 style={{ fontWeight: 600 }}>Cluster Name</h2>
//         <p className="overview-value dynamic-text">{overview.clusterName}</p>
//       </div>

//       <div className="overview-metrics-row">
//         <div className="overview-card overview-nodes">
//           <h2>No. of Nodes</h2>
//           <p className="overview-value">{overview.nodes}</p>
//         </div>

//         <div className="overview-card overview-pods">
//           <h2>No. of Pods</h2>
//           <p className="overview-value">{overview.pods}</p>
//         </div>

//         <div className="overview-card overview-containers">
//           <h2>No. of Containers</h2>
//           <p className="overview-value">{overview.containers}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
