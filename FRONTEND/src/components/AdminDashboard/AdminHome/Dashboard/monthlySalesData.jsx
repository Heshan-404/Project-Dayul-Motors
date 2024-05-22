const monthlySalesData = {};

// Function to generate random data for a month
function generateRandomMonthData(monthLength, year) {
  const monthData = [];
  for (let day = 1; day <= monthLength; day++) {
    monthData.push({
      day: day,
      sales: Math.floor(Math.random() * 1000) + 1000,
      profit: Math.floor(Math.random() * 500) + 400,
      userCount: Math.floor(Math.random() * 30) + 20,
      itemCount: Math.floor(Math.random() * 50) + 50,
      lowStockItems: Math.floor(Math.random() * 15) + 5,
      year: year, // Add the year to the data
    });
  }
  return monthData;
}

// Generate data for 2023 and 2024
for (let year = 2023; year <= 2024; year++) {
  for (let month = 0; month <= 11; month++) {
    const monthLength = new Date(year, month + 1, 0).getDate();
    monthlySalesData[month] = monthlySalesData[month] || []; // Initialize array if it doesn't exist
    monthlySalesData[month].push(...generateRandomMonthData(monthLength, year));
  }
}

export default monthlySalesData;
