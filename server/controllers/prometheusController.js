import fetch from "node-fetch";

export const runPromQLQuery = async (req, res, next) => {
  const queryStr = res.locals.query;
  const url = `http://localhost:9090/api/v1/query?query=${encodeURIComponent(
    queryStr,
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.locals.data = data.data.result;
    console.log("url", url);
    return next();
  } catch (error) {
    return next({
      log: "Error in runPromQLQuery middleware" + error,
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
