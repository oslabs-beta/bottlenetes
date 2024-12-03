export const runPromQLQuery = async (req, res, next) => {
  const query = "rate(container_cpu_usage_seconds_total[5m])";
};
