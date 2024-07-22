/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import DownloadIcon from "@mui/icons-material/Download";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Alert,
  AlertTitle,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import Chart from "chart.js/auto";
import {
  AttachMoney,
  PeopleAlt,
  Storage,
  WarningAmber,
  Edit,
} from "@mui/icons-material";
import axiosInstance from "../../../../axiosConfig";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [salesData, setSalesData] = useState([]);
  const [lastMonthSalesData, setLastMonthSalesData] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [lowStockItemCount, setLowStockItemCount] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [maxSales, setMaxSales] = useState(0);
  const [totalMonthlySales, setTotalMonthlySales] = useState(0);
  const chartCanvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [lowStockItemsModalOpen, setLowStockItemsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailsModalOpen, setProductDetailsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editConfirmationOpen, setEditConfirmationOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedMinQuantityLevel, setEditedMinQuantityLevel] = useState("");

  const handleDownloadPDF = () => {
    const input = document.getElementById('chart-container');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('chart.pdf');
      });
  };
  const handleYearChange = (event) => {
    setCurrentYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(parseInt(event.target.value, 10));
  };

  const lastMonthTotalSales = lastMonthSalesData.reduce(
    (acc, item) => acc + parseInt(item.total_sales, 10),
    0
  );

  const handleLowStockItemsClick = () => {
    setLowStockItemsModalOpen(true);
  };

  const handleCloseModal = () => {
    setLowStockItemsModalOpen(false);
  };

  const handleProductDetailsClick = (product) => {
    setSelectedProduct(product);
    setProductDetailsModalOpen(true);
    setEditedProductName(product.productname);
    setEditedQuantity(product.quantity);
    setEditedMinQuantityLevel(product.minquantitylevel);
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModalOpen(false);
    setIsEditing(false);
    setEditedProductName("");
    setEditedQuantity("");
    setEditedMinQuantityLevel("");
    setIsAlertVisible(false);
    setIsSaving(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setEditConfirmationOpen(true);
  };

  const handleConfirmEdit = async () => {
    setIsSaving(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        `/auth/admin/update_product/${selectedProduct.productid}`,
        {
          productname: editedProductName,
          quantity: parseInt(editedQuantity, 10),
          minquantitylevel: parseInt(editedMinQuantityLevel, 10),
        }
      );
      setIsAlertVisible(true);
      setAlertType("success");
      setTimeout(() => {
        setIsAlertVisible(false);
        handleCloseProductDetailsModal();
        fetchData();
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
      setIsAlertVisible(true);
      setAlertType("error");
      setTimeout(() => setIsAlertVisible(false), 2000);
    } finally {
      setIsSaving(false);
      setEditConfirmationOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProductName(selectedProduct.productname);
    setEditedQuantity(selectedProduct.quantity);
    setEditedMinQuantityLevel(selectedProduct.minquantitylevel);
  };

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setEditedQuantity(numericValue);
  };

  const handleMinQuantityChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setEditedMinQuantityLevel(numericValue);
  };

  const handleLastMonthSalesClick = () => {
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = previousMonth === 12 ? currentYear - 1 : currentYear;
    setCurrentMonth(previousMonth);
    setCurrentYear(previousYear);
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        userCountResponse,
        itemCountResponse,
        lowStockResponse,
        monthlySalesResponse,
        lastMonthSalesResponse,
      ] = await Promise.all([
        axiosInstance.get("/auth/admin/get_total_user_count"),
        axiosInstance.get("/auth/admin/get_total_items_count"),
        axiosInstance.get("/auth/admin/get_low_stock_items"),
        axiosInstance.get("/auth/admin/get_monthly_sales_data", {
          params: { year: currentYear, month: currentMonth },
        }),
        axiosInstance.get("/auth/admin/get_last_month_sales_data", {
          params: {
            year: currentYear - 1,
            month: currentMonth === 1 ? 12 : currentMonth - 1,
          },
        }),
      ]);

      setTotalUserCount(userCountResponse.data);
      setTotalItemsCount(itemCountResponse.data);
      setLowStockItems(lowStockResponse.data);
      setLowStockItemCount(lowStockResponse.data.length);

      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      const paddedData = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        total_sales: 0,
      }));
      monthlySalesResponse.data.forEach((item) => {
        paddedData[item.day - 1] = item;
      });
      setSalesData(paddedData);
      setMaxSales(
        Math.max(
          ...monthlySalesResponse.data.map((item) =>
            parseInt(item.total_sales, 10)
          )
        )
      );
      setLastMonthSalesData(lastMonthSalesResponse.data);
      setTotalMonthlySales(
        monthlySalesResponse.data.reduce(
          (acc, item) => acc + parseInt(item.total_sales, 10),
          0
        )
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (salesData.length > 0) {
      const canvas = chartCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: salesData.map((item) => `Day ${item.day}`),
          datasets: [
            {
              label: "Sales",
              data: salesData.map((item) => parseInt(item.total_sales, 10)),
              borderColor: "#8884d8",
              borderWidth: 3,
              fill: true,
              backgroundColor: "rgba(136, 132, 216, 0.2)",
              pointRadius: 5,
              pointBackgroundColor: "#8884d8",
              pointHoverRadius: 7,
              pointHoverBackgroundColor: "#8884d8",
              animation: {
                duration: 2000,
                easing: "easeInOutQuint",
              },
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "LKR",
              },
              grid: {
                display: true,
              },
            },
            x: {
              grid: {
                display: true,
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "white",
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => `LKR ${context.raw}`,
              },
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "#8884d8",
              borderWidth: 1,
              displayColors: false,
            },
          },
          animation: {
            duration: 2000,
            easing: "easeInOutQuint",
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      setChartInstance(myChart);
    }
  }, [salesData]);

  return (
    <div className="dashboard-container">
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: "column",
          "@media (min-width: 768px)": { flexDirection: "row" },
        }}
      >
        <Grid item xs={12} md={12} sx={{ marginBottom: 0 }}>
          <Card sx={{ backgroundColor: "#000000", color: "white" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ color: "white" }}>
                Welcome to the Admin Dashboard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            className="top-stats"
            sx={{ marginBottom: 0 }}
          >
            <Grid item xs={12} md={4}>
              <Card sx={{ width: "100%", marginBottom: 0 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <AttachMoney /> Total Monthly Sales
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    LKR : {totalMonthlySales}.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ width: "100%", marginBottom: 0 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <PeopleAlt /> Total User Count
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {totalUserCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ width: "100%", marginBottom: 0 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Storage /> Total Items Count
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {totalItemsCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginBottom: 0 }}>
          <Card sx={{ height: { xs: "45vh", sm: "80vh", md: "60vh" } }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Sales Overview
              </Typography>
              <div className="month-navigation">
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="year-select-label">Year</InputLabel>
                      <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={currentYear}
                        onChange={handleYearChange}
                        label="Year"
                      >
                        {[2022, 2023, 2024, 2025].map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="month-select-label">Month</InputLabel>
                      <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={currentMonth}
                        onChange={handleMonthChange}
                        label="Month"
                      >
                        {Array.from(Array(12).keys()).map((month) => (
                          <MenuItem key={month} value={month + 1}>
                            {new Date(2024, month).toLocaleString("default", {
                              month: "long",
                            })}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>  <Box display="flex" justifyContent="flex-end" marginBottom={2}>
                  <IconButton onClick={handleDownloadPDF}>
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </div>
              <div id="chart-container" className="chart-container">
                <canvas ref={chartCanvasRef} width="400" height="200" />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ marginBottom: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card
                sx={{ width: "100%", marginBottom: 0, cursor: "pointer" }}
                onClick={handleLastMonthSalesClick}
              >
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
              <Card
                sx={{
                  backgroundColor: "#fdd",
                  color: "#800",
                  width: "100%",
                  marginBottom: 0,
                  cursor: "pointer",
                }}
                onClick={handleLowStockItemsClick}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <WarningAmber /> Low Stock Items
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {lowStockItemCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        {isLoading && (
          <Grid
            item
            xs={12}
            sx={{
              width: "100%",
              display: "flex",
              position: "fixed",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              left: 0,
              right: 0,
              height: "100vh",
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <CircularProgress />
          </Grid>
        )}
        {error && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              There was an error fetching data. Please try again later.
            </Alert>
          </Grid>
        )}
        {lowStockItems.length > 0 && (
          <Dialog
            open={lowStockItemsModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="low-stock-items-dialog-title"
            aria-describedby="low-stock-items-dialog-description"
            maxWidth="md"
            fullWidth
          >
            <DialogTitle id="low-stock-items-dialog-title">
              Low Stock Items
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="low-stock-items-dialog-description"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>View</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lowStockItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <img
                              src={item.imageurl}
                              alt={item.productname}
                              style={{ maxWidth: "50px", maxHeight: "50px" }}
                            />
                          </TableCell>
                          <TableCell>{item.productname}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => handleProductDetailsClick(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContentText>
            </DialogContent>
            <Button onClick={handleCloseModal}>Close</Button>
          </Dialog>
        )}
        <Dialog
          open={productDetailsModalOpen}
          onClose={handleCloseProductDetailsModal}
          aria-labelledby="product-details-dialog-title"
          aria-describedby="product-details-dialog-description"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle id="product-details-dialog-title">
            Product Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="product-details-dialog-description"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {selectedProduct && (
                <>
                  <img
                    src={selectedProduct.imageurl}
                    alt={selectedProduct.productname}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {selectedProduct.productname}
                  </Typography>
                  {isEditing ? (
                    <>
                      <TextField
                        label="Product Name"
                        value={editedProductName}
                        onChange={(e) => setEditedProductName(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Quantity"
                        value={editedQuantity}
                        onChange={handleQuantityChange}
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                      <TextField
                        label="Min Quantity Level"
                        value={editedMinQuantityLevel}
                        onChange={handleMinQuantityChange}
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                      <div style={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button variant="outlined" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" gutterBottom>
                        Quantity: {selectedProduct.quantity}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Min Quantity Level: {selectedProduct.minquantitylevel}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Description: {selectedProduct.description}
                      </Typography>
                      <Button variant="contained" onClick={handleEditClick}>
                        <Edit /> Edit
                      </Button>
                    </>
                  )}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <Button onClick={handleCloseProductDetailsModal}>Close</Button>
        </Dialog>
        <Dialog
          open={editConfirmationOpen}
          onClose={() => setEditConfirmationOpen(false)}
          aria-labelledby="edit-confirmation-dialog-title"
          aria-describedby="edit-confirmation-dialog-description"
        >
          <DialogTitle id="edit-confirmation-dialog-title">
            Confirm Changes
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="edit-confirmation-dialog-description">
              Are you sure you want to save the changes?
            </DialogContentText>
            {isSaving && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </DialogContent>
          <Button onClick={handleConfirmEdit} autoFocus disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={() => setEditConfirmationOpen(false)}>Cancel</Button>
        </Dialog>
        {isAlertVisible && (
          <Alert
            severity={alertType}
            open={isAlertVisible}
            onClose={() => setIsAlertVisible(false)}
          >
            <AlertTitle>
              {alertType === "success" ? "Success" : "Error"}
            </AlertTitle>
            {alertType === "success"
              ? "Product updated successfully!"
              : "Failed to update product. Please try again."}
          </Alert>
        )}
      </Grid>
      <style>{`
        .dashboard-container {
          padding: 20px;
          background-color: #f4f4f4;
          font-family: 'Roboto', sans-serif;
        }
        .dashboard-container * {
          color: #333;
        }
        .chart-container {
          width: 100%;
          height: 40vh;
        }
        .month-navigation {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .month-navigation > div {
          flex: 1;
          margin-right: 10px;
        }
        .month-navigation > div:last-child {
          margin-right: 0;
        }
        .top-stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .top-stats > div {
          width: calc(33.33% - 10px);
          margin-bottom: 10px;
        }
        .top-stats > div:nth-child(3n) {
          margin-right: 0;
        }
        .top-stats CardContent {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .top-stats Typography {
          text-align: center;
        }
        .chart-container {
          height: 40vh;
        }
        @media (max-width: 768px) {
          .top-stats {
            flex-direction: column;
          }
          .top-stats > div {
            width: 100%;
            margin-bottom: 10px;
          }
          .chart-container {
            height: 30vh;
          }
        }
        @media (max-width: 480px) {
          .chart-container {
            height: 25vh;
          } 
          .top-stats > div {
            width: 100%;
            margin-bottom: 5px;
          }
          .month-navigation > div {
            margin-right: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
