
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
    const r = 255 - (Math.floor(normalizedValue * 180));

    return `rgb(${r}, 255, 141, 1)`;
  };

  const buttonArray = [];
  for (let i = 1; i < testArray.length; i++) {
    randomStatus();
    if (status === 'active') {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 rounded-3xl brightness-90 py-7 px-3 transition hover:filter hover:brightness-50"
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
          className="bg-gradient-to-bl from-[rgba(255,120,112,0.8)] to-[rgba(255,84,112,0.8)] m-0.5 px-3 rounded-3xl py-7 transition hover:filter hover:brightness-50"
        >
          
        </button>,
      );
    } else {
      buttonArray.push(
        <button
          key={i}
          className="m-0.5 rounded-3xl py-7 px-3 bg-gradient-to-bl from-slate-700 to-slate-800 brightness-90 transition hover:filter hover:brightness-50"
        >
          
        </button>,
      );
    }
  }

  return (
    <div id="test-grid" className="grid h-screen rounded-2xl grid-cols-12 overflow-scroll">
      {buttonArray}
    </div>
  );
};

export default TestGrid;
