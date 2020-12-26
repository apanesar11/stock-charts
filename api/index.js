// place all api calls here
export const getStockData = async ticker => {
  const data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2020-10-01/2020-12-25?unadjusted=true&sort=asc&limit=120&apiKey=Zxz52R0YHRxVMQJq9bO_bE5VpwkRguAY`)
  return data.json();
};