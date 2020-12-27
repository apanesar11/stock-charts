export const getStockData = async ticker => {
  const data = await fetch(`${process.env.BACKEND_URL}/api/dailyaggs?ticker=${ticker}`);
  return data.json();
};