import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import monthlySalesData from "./monthlySalesData";

const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [salesData, setSalesData] = useState([]);
  const [lastMonthSalesData, setLastMonthSalesData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [lowStockItemCount, setLowStockItemCount] = useState(6);

  useEffect(() => {
    setLowStockItemCount(4);
    // Get the data for the selected month and year
    const currentMonthData = monthlySalesData[currentMonth] || [];

    // Filter data by year (assuming your monthlySalesData has a year property)
    const filteredData = currentMonthData.filter(
      (item) => item.year === currentYear
    );

    setSalesData(filteredData);

    // Calculate total profit, user count, and item count
    const profit = filteredData.reduce((acc, item) => acc + item.profit, 0);
    const userCount = filteredData.reduce(
      (acc, item) => acc + item.userCount,
      0
    );
    const itemCount = filteredData.reduce(
      (acc, item) => acc + item.itemCount,
      0
    );

    setTotalProfit(profit);
    setTotalUserCount(userCount);
    setTotalItemsCount(itemCount);

    // Calculate last month based on year and month
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Get data for last month and filter by lastYear
    const lastMonthData =
      (monthlySalesData[lastMonth] || []).filter(
        (item) => item.year === lastYear
      ) || [];

    setLastMonthSalesData(lastMonthData);
  }, [currentMonth, currentYear]);

  const handleYearChange = (event) => {
    setCurrentYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(parseInt(event.target.value, 10));
  };

  // Data for the line chart
  const lineChartData = salesData.map((item) => ({
    day: item.day,
    sales: item.sales,
  }));

  // Calculate last month's total sales
  const lastMonthTotalSales = lastMonthSalesData.reduce(
    (acc, item) => acc + item.sales,
    0
  );

  return (
    <div>
      <Grid container spacing={2} className="dashboard-container">
        <Grid item xs={12} md={12}>
          <Card sx={{ backgroundColor: "#000000", color: "white" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Welcome to the Admin Dashboard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} className="top-stats">
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <AttachMoneyIcon /> Total Profit
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    LKR : {totalProfit.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <PeopleAltIcon /> Total User Count
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {totalUserCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Inventory2Icon /> Total Items Count
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {totalItemsCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Sales Overview
              </Typography>
              <div className="month-navigation">
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <TextField
                      select
                      label="Year"
                      value={currentYear}
                      onChange={handleYearChange}
                      variant="outlined"
                    >
                      {[2022, 2023, 2024, 2025].map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      select
                      label="Month"
                      value={currentMonth}
                      onChange={handleMonthChange}
                      variant="outlined"
                    >
                      {Array.from(Array(12).keys()).map((month) => (
                        <MenuItem key={month} value={month}>
                          {new Date(2024, month).toLocaleString("default", {
                            month: "long",
                          })}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={lineChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis
                      dataKey="day"
                      tickFormatter={(value) => `Day ${value}`}
                      tickLine={false}
                    />
                    <YAxis tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#333"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last Month Total Sales
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    LKR : {lastMonthTotalSales}.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ backgroundColor: "#fdd", color: "#800" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <WarningAmberIcon /> Low Stock Items
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {lowStockItemCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
