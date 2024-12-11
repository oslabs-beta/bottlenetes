const TestGrid = () => {
  const testArray = [];
  for (let i = 0; i <= 200; i++) {
    testArray.push(i);
  }

  const statusArray = ["active", "inactive", "error"];
  let status = "";

  const randomStatus = () => {
    status = statusArray[Math.floor(Math.random() * statusArray.length)];
  };

  const color = (value /*value[1]*/, minVal = 0, maxVal /*value[0]*/) => {
    const normalizedValue = (value - minVal) / (maxVal - minVal);
    const r = 238 - Math.floor(normalizedValue * 204);

    return `rgb(${r}, 197, 94, 1)`;
  };

  const buttonArray = [];
  for (let i = 1; i < testArray.length; i++) {
    randomStatus();
    if (status === "active") {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 aspect-square rounded-xl border-blue-600 brightness-90 transition hover:border-[5px] hover:filter"
          style={{
            backgroundColor: color(Math.floor(Math.random() * 100), 0, 100),
          }}
        ></button>,
      );
    } else if (status === "error") {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 aspect-square rounded-xl border-blue-600 bg-[#db6451] transition hover:border-[5px] hover:filter"
        ></button>,
      );
    } else {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 aspect-square rounded-xl border-4 border-slate-500 brightness-90 transition hover:border-4 hover:border-blue-500 hover:filter"
        ></button>,
      );
    }
  }

  return (
    <div className="align-space-between flex h-full overflow-scroll">
      <div className="w-3/4 overflow-auto p-4">
        <div
          id="test-grid"
          className="grid h-screen grid-cols-5 overflow-scroll md:grid-cols-7 lg:grid-cols-4 xl:grid-cols-5 xl-2xl:grid-cols-7 3xl:grid-cols-9"
        >
          {buttonArray}
        </div>
      </div>
      <div className="flex w-1/4 min-w-[200px] max-w-[250px] flex-col justify-start gap-4 p-4">
        <button className="rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] px-4 py-2 py-5 text-lg font-semibold text-slate-200 hover:brightness-90 hover:filter">
          CPU Usage (%)
        </button>
        <button className="rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 px-4 py-2 py-5 text-lg font-semibold text-slate-400 hover:brightness-90 hover:filter">
          Latency
        </button>
      </div>
    </div>
  );
};

export default TestGrid;
