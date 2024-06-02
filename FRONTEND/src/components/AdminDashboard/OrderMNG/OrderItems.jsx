import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Dummy image URLs for demonstration purposes
const itemImages = {
  laptop: "https://via.placeholder.com/100x100",
  smartphone: "https://via.placeholder.com/100x100",
  tablet: "https://via.placeholder.com/100x100",
  headphones: "https://via.placeholder.com/100x100",
  monitor: "https://via.placeholder.com/100x100",
};

function createData(id, itemCode, item, name, brand, unitPrice, quantity) {
  return { id, itemCode, item, name, brand, unitPrice, quantity };
}

const rows = [
  createData(1, "IC001", "laptop", "Dell Inspiron", "Dell", 800.0, 2),
  createData(2, "IC002", "smartphone", "iPhone 12", "Apple", 1200.0, 1),
  createData(3, "IC003", "tablet", "iPad Air", "Apple", 600.0, 3),
  createData(4, "IC004", "headphones", "Sony WH-1000XM4", "Sony", 350.0, 5),
  createData(5, "IC005", "monitor", "Samsung Odyssey G9", "Samsung", 1500.0, 1),
];

const headCells = [
  { id: "itemCode", label: "Item Code" },
  { id: "item", label: "Item" },
  { id: "name", label: "Name" },
  { id: "brand", label: "Brand" },
  { id: "unitPrice", label: "Unit Price" },
  { id: "quantity", label: "Quantity" },
];

export default function OrderItems() {
  return (
    <Box sx={{ width: "100%", paddingLeft: "20px", paddingRight: "20px" }}>
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
                  <TableCell align="center">{row.itemCode}</TableCell>
                  <TableCell align="center">
                    {row.item && (
                      <img
                        src={itemImages[row.item]}
                        alt={row.item}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.brand}</TableCell>
                  <TableCell align="center">{row.unitPrice}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
