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
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // Import html2canvas for converting HTML to canvas
const headCells = [
  { id: "orderId", label: "Order ID" },
  { id: "orderDate", label: "Order Date" },
  { id: "orderTime", label: "Order Time" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "paymentmethod", label: "Payment Method" },
  { id: "action", label: "Action" },
];

const AllOrders = ({ orders = [], searchValue }) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    const processOrdersData = () => {
      const transformedRows = orders.map((order, index) => ({
        id: index + 1,
        orderId: order.orderid,
        orderDate: order.orderdate,
        orderTime: order.ordertime,
        amount: order.totalamount,
        status: order.orderstatus,
        paymentmethod: order.paymentmethod,
      }));

      transformedRows.sort((a, b) => b.orderId - a.orderId);

      if (searchValue) {
        const filteredRows = transformedRows.filter((row) =>
          Object.values(row).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchValue.toLowerCase())
          )
        );
        setRows(filteredRows);
      } else {
        setRows(transformedRows);
      }
      setIsLoading(false);
    };

    if (orders.length > 0) {
      processOrdersData();
    }
  }, [orders, searchValue]);

  const downloadReport = () => {
    setGeneratingPdf(true);

    const input = document.getElementById("table-to-print");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("report.pdf");
      setGeneratingPdf(false);
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer id="table-to-print">
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
                    <TableCell align="center">{"LKR. " + row.amount + ".00"}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.paymentmethod}</TableCell>
                    <TableCell align="center">
                      <Link to={`/admin/orderDetail/${row.orderId}`} target="_blank">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            localStorage.setItem("selected_orderid", row.orderId);
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={downloadReport}
              disabled={generatingPdf}
            >
              {generatingPdf ? <CircularProgress size={24} /> : "Download Report"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AllOrders;
