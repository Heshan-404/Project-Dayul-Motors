/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

// Table column headers
const headCells = [
  { id: "orderId", label: "Order ID" },
  { id: "orderDate", label: "Order Date" },
  { id: "orderTime", label: "Order Time" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "paymentmethod", label: "Payment Method" },
  { id: "Action", label: "Action" },
];

export default function AllOrders({ orders = [], searchValue }) {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Function to process the orders data
    const processOrdersData = () => {
      // Transforming orders data to the table row format
      const transformedRows = orders.map((order, index) => ({
        id: index + 1,
        orderId: order.orderid,
        orderDate: order.orderdate,
        orderTime: order.ordertime,
        amount: order.totalamount,
        status: order.orderstatus,
        paymentmethod: order.paymentmethod,
      }));

      // Sort rows by orderId in descending order
      transformedRows.sort((a, b) => {
        if (a.orderId > b.orderId) return -1;
        if (a.orderId < b.orderId) return 1;
        return 0;
      });

      if (searchValue) {
        // Filtering rows based on search input
        const filteredRows = transformedRows.filter((row) => {
          return (
            (row.orderId &&
              row.orderId.toLowerCase().includes(searchValue.toLowerCase())) ||
            row.orderDate.includes(searchValue) ||
            (row.status &&
              row.status.toLowerCase().includes(searchValue.toLowerCase())) ||
            (row.orderTime &&
              row.orderTime.toLowerCase().includes(searchValue.toLowerCase()))
          );
        });
        setRows(filteredRows);
      } else {
        setRows(transformedRows);
      }
      setIsLoading(false); // Set loading to false after data is processed
    };

    // If orders data is available, process it
    if (orders.length > 0) {
      processOrdersData();
    }
  }, [orders, searchValue]); // Update when orders or searchValue changes

  return (
    <Box sx={{ width: "100%" }}>
      {/* Show loading animation if isLoading is true */}
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {/* Show the table if isLoading is false */}
      {!isLoading && (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align="center">
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {headCell.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.orderId}</TableCell>
                    <TableCell align="center">{row.orderDate}</TableCell>
                    <TableCell align="center">{row.orderTime}</TableCell>
                    <TableCell align="center">
                      {"LKR. " + row.amount + ".00"}
                    </TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      {row.paymentmethod}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={`/admin/orderDetail/${row.orderId}`}
                        target="_blank"
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            localStorage.setItem(
                              "selected_orderid",
                              row.orderId
                            );
                          }}
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}