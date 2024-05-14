import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



function createData(id, orderId, orderDate, orderTime, amount, paymentType) {
  return { id, orderId, orderDate, orderTime, amount, paymentType };
}

const rows = [
  createData(1, 'OID001', '2024-05-14', '10:30 AM', 100.00, 'Credit Card'),
  createData(2, 'OID002', '2024-05-15', '12:45 PM', 150.00, 'PayPal'),
  createData(3, 'OID003', '2024-05-16', '09:15 AM', 120.00, 'Cash'),
  createData(4, 'OID004', '2024-05-17', '03:20 PM', 200.00, 'Credit Card'),
  createData(5, 'OID005', '2024-05-18', '11:00 AM', 180.00, 'PayPal'),
];

const headCells = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'orderDate', label: 'Order Date' },
  { id: 'orderTime', label: 'Order Time' },
  { id: 'amount', label: 'Amount' },
  { id: 'paymentType', label: 'Payment Type' },
];

export default function EnhancedTable() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
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
                  <TableCell align="center">{row.paymentType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
