
const TestGrid = () => {
  const testArray = [];
  for (let i = 0; i <= 200; i++) {
    testArray.push(i);
  }

  const statusArray = ['active', 'inactive', 'error'];
  let status = ''
  
  const randomStatus = () => {
    status = statusArray[Math.floor(Math.random() * statusArray.length)];
  }

  const color = (value /*value[1]*/, minVal = 0, maxVal /*value[0]*/) => {
    const normalizedValue = (value - minVal) / (maxVal - minVal);
    const r = Math.floor(normalizedValue * 255);

    return `rgb(${r}, 255, 0.1)`;
  };

  const buttonArray = [];
  for (let i = 1; i < testArray.length; i++) {
    randomStatus();
    if (status === 'active') {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 rounded-2xl bg-green-400 py-11 transition hover:filter hover:brightness-90"
          style={{
            backgroundColor: color(Math.floor(Math.random() * 100), 0, 100),
          }}
        >
          
        </button>,
      );
    } else if (status === 'error') {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 rounded-2xl py-11 bg-red-400 transition hover:filter hover:brightness-90"
        >
          
        </button>,
      );
    } else {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 rounded-2xl py-11 bg-slate-700 transition hover:filter hover:brightness-90"
        >
          
        </button>,
      );
    }
  }

  return (
    <div id="test-grid" className="grid h-screen grid-cols-8 overflow-scroll">
      {buttonArray}
    </div>
  );
};

export default TestGrid;
