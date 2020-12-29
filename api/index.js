export const getStockData = async ticker => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
  const startDateStr = startDate.toISOString().slice(0,10);
  const endDate = new Date();
  const endDateStr = endDate.toISOString().slice(0,10);
  const data = await fetch(`${process.env.BACKEND_URL}/api/dailyaggs?ticker=${ticker}&startDate=${startDateStr}&endDate=${endDateStr}`);
  return data.json();
};

export const getStockSearch = async query => {
  const data = await fetch(`${process.env.BACKEND_URL}/api/search?query=${query}`);
  return data.json();
};
