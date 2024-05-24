import React, { useState, useEffect } from "react";
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

function createData(id, orderId, orderDate, orderTime, amount, status) {
  return { id, orderId, orderDate, orderTime, amount, status };
}

const originalRows = [
  createData(1, "10010", "2024-05-14", "10:30 AM", 100.0, "Completed"),
  createData(2, "10004", "2024-05-15", "12:45 PM", 150.0, "Completed"),
  createData(3, "10003", "2024-05-16", "09:15 AM", 120.0, "Completed"),
  createData(4, "10002", "2024-05-17", "03:20 PM", 200.0, "Completed"),
  createData(5, "10001", "2024-05-18", "11:00 AM", 180.0, "Completed"),
];

const headCells = [
  { id: "orderId", label: "Order ID" },
  { id: "orderDate", label: "Order Date" },
  { id: "orderTime", label: "Order Time" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "Action", label: "Action" },
];

export default function CompletedOrders({ searchValue }) {
  const [rows, setRows] = useState(originalRows);

  useEffect(() => {
    if (searchValue) {
      const filteredRows = originalRows.filter((row) => {
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
      setRows(originalRows);
    }
  }, [searchValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Link to={`/admin/orderDetail/${row.orderId}`}>
                      <Button color="primary" variant="contained">
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
    </Box>
  );
}
