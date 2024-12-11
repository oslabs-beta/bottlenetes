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
          className="m-0.5 aspect-square rounded-full brightness-90 transition hover:brightness-50 hover:filter"
          style={{
            backgroundColor: color(Math.floor(Math.random() * 100), 0, 100),
          }}
        ></button>,
      );
    } else if (status === "error") {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 aspect-square rounded-full bg-[rgba(255,43,19,0.7)] transition hover:brightness-50 hover:filter"
        ></button>,
      );
    } else {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 aspect-square rounded-full border-4 border-slate-600 brightness-90 transition hover:bg-slate-900 hover:filter"
        ></button>,
      );
    }
  }

  return (
    <div className="align-space-between flex h-full overflow-scroll">
      <div className="w-3/4 overflow-auto p-4">
        <div
          id="test-grid"
          className="grid h-screen grid-cols-3 gap-1 overflow-scroll md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9"
        >
          {buttonArray}
        </div>
      </div>
      <div className="flex w-1/4 flex-col justify-start gap-4 p-4">
        <button className="text-semibold rounded-2xl bg-blue-700 px-4 py-2 py-5 text-lg text-slate-200 hover:brightness-90 hover:filter">
          CPU Usage (%)
        </button>
        <button className="text-semibold rounded-2xl bg-blue-700 px-4 py-2 py-5 text-lg text-slate-200 hover:brightness-90 hover:filter">
          Latency
        </button>
      </div>
    </div>
  );
};

export default TestGrid;
