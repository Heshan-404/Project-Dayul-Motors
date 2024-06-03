import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField as MuiTextField,
  InputAdornment,
  InputLabel,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../../axiosConfig";
import AddProductForm from "./AddProductForm";

function ProductTable() {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // State for the confirm dialog
  const [productToDelete, setProductToDelete] = useState(null); // State to store the product to be deleted

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const brandsResponse = await axiosInstance.get(
          "/auth/admin/protected/brands"
        );
        setBrands(brandsResponse.data);

        const categoriesResponse = await axiosInstance.get(
          "/auth/admin/protected/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching brands or categories:", error);
      }
    };

    fetchBrandsAndCategories();
  }, []);

  const handleRefresh = async () => {
    try {
      const response = await axiosInstance.get(
        "/auth/admin/protected/products"
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error refreshing product data:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/auth/admin/protected/products"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddProduct = () => {
    handleRefresh();
  };

  const handleViewDetails = (product) => {
    // Set image preview to the current image
    setImagePreview(product.imageurl);
    setSelectedImage(null); // Reset selected image when viewing
    setSelectedProduct(product);
    setIsEditing(false); // Reset editing state when viewing
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleSaveEdit = async () => {
    try {
      // Validate all fields except description
      if (
        selectedProduct.productname.trim() === "" ||
        selectedProduct.price.trim() === "" ||
        selectedProduct.quantity.trim() === "" ||
        selectedProduct.minquantitylevel.trim() === ""
      ) {
        return; // Don't proceed if fields are empty
      }

      const formData = new FormData();
      formData.append("productname", selectedProduct.productname);
      formData.append("price", selectedProduct.price);
      formData.append("quantity", selectedProduct.quantity);
      formData.append("minquantitylevel", selectedProduct.minquantitylevel);
      formData.append("productdescription", selectedProduct.productdescription);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      // Update the product in your backend (replace with your API call)
      await axiosInstance.put(
        `/auth/admin/protected/products/${selectedProduct.productid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update the table data
      handleRefresh();
      setIsEditing(false);
      setSelectedProduct(null);
      console.log("Form Data:", formData); // Log the form data
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productid) => {
    setProductToDelete(productid); // Set the product to be deleted
    setIsConfirmDialogOpen(true); // Open the confirm dialog
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete the product from your backend (replace with your API call)
      await axiosInstance.delete(
        `/auth/admin/protected/products/${productToDelete}`
      );
      // Update the table data
      const updatedData = tableData.filter(
        (item) => item.productid !== productToDelete
      );
      setTableData(updatedData);
      // Close the confirm dialog
      setIsConfirmDialogOpen(false);
      // Refresh the table data
      handleRefresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCancelDelete = () => {
    // Close the confirm dialog
    setIsConfirmDialogOpen(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      if (value.startsWith("-")) {
        setSelectedProduct((prev) => ({
          ...prev,
          price: "0",
        }));
      } else {
        setSelectedProduct((prev) => ({
          ...prev,
          price: value,
        }));
      }
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      if (value.startsWith("-")) {
        setSelectedProduct((prev) => ({
          ...prev,
          quantity: "0",
        }));
      } else {
        setSelectedProduct((prev) => ({
          ...prev,
          quantity: value,
        }));
      }
    }
  };

  const handleMinQuantityLevelChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      if (value.startsWith("-")) {
        setSelectedProduct((prev) => ({
          ...prev,
          minquantitylevel: "0",
        }));
      } else {
        setSelectedProduct((prev) => ({
          ...prev,
          minquantitylevel: value,
        }));
      }
    }
  };

  const filteredTableData = tableData.filter((item) => {
    const matchBrand =
      selectedBrand === "all" || item.brandid === selectedBrand;
    const matchCategory =
      selectedCategory === "all" || item.categoryid === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      item.productname.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBrand && matchCategory && matchSearch;
  });

  return (
    <Box padding={2}>
      {/* Align dropdowns and search bar on the same line */}
      <Grid container spacing={2} alignItems="center" marginBottom={2}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <Box marginRight={2}>
              <InputLabel sx={{ color: "black" }}>Brand</InputLabel>
              <Select
                value={selectedBrand}
                onChange={handleBrandChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: 200 }}
              >
                <MenuItem key="all" value="all">
                  All
                </MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand.brandid} value={brand.brandid}>
                    <div className="d-flex">
                      <img
                        src={brand.imageurl}
                        width={"20px"}
                        style={{ marginRight: "15px" }}
                      />
                      {brand.brandname}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box marginRight={2}>
              <InputLabel sx={{ color: "black" }}>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: 200 }}
              >
                <MenuItem key="all" value="all">
                  All
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.categoryid}
                    value={category.categoryid}
                  >
                    <div className="d-flex">
                      <img
                        src={category.imageurl}
                        width={"20px"}
                        style={{ marginRight: "15px" }}
                      />
                      {category.categoryname}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <TextField
              style={{ marginTop: "22px" }}
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Product
            </Button>
            {/* Refresh icon button */}
            <IconButton onClick={handleRefresh} color="primary" marginLeft={2}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "black" }}>
              <TableCell style={{ color: "white" }}>Image</TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Price
              </TableCell>

              <TableCell align="center" style={{ color: "white" }}>
                QTY
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Low Qty Level
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTableData.map((item) => {
              var rowBGColor;
              const quantity = parseInt(item.quantity);
              const minQuantityLevel = parseInt(item.minquantitylevel);
              if (!isNaN(quantity) && !isNaN(minQuantityLevel)) {
                if (quantity > minQuantityLevel) {
                  rowBGColor = "white";
                } else {
                  rowBGColor = "#fdd";
                }
              } else {
                rowBGColor = "grey"; // Default color
              }

              return (
                <TableRow
                  key={item.productid}
                  style={{
                    backgroundColor: rowBGColor,
                  }}
                >
                  <TableCell>
                    <img
                      src={item.imageurl}
                      alt={`Product ${item.productid} Image`}
                      style={{ width: "40px", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell align="center">{item.productid}</TableCell>
                  <TableCell>
                    <Typography align="center">{item.productname}</Typography>
                  </TableCell>
                  {/* Align price, stock, and low qty level on the same line */}
                  <TableCell align="center">
                    <Typography>{item.price}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.quantity}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.minquantitylevel}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </Button>
                    {/* Add delete button */}
                    <IconButton
                      onClick={() => handleDeleteProduct(item.productid)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        aria-labelledby="product-details-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="product-details-dialog-title">
          Product Details
        </DialogTitle>
        <DialogContent>
          {/* Image should be at the top */}
          <></>

          <DialogContentText>
            {selectedProduct && (
              <>
                <div className="d-md-flex justify-content-between align-items-start">
                  <div>
                    <Typography variant="h6">Product ID:</Typography>
                    <Typography>{selectedProduct.productid}</Typography>
                    <Typography variant="h6">Name:</Typography>
                    <MuiTextField
                      className="w-100"
                      disabled={!isEditing}
                      value={selectedProduct.productname}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          productname: e.target.value,
                        }))
                      }
                      style={{ width: "500px" }}
                      margin="dense"
                    />
                  </div>
                  <div className="float-end">
                    <Box
                      marginBottom={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                    >
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: "120px",
                            maxWidth: "250px", // Adjust the max-width as needed
                            maxHeight: "250px", // Adjust the max-height as needed
                            marginTop: "10px",
                            marginRight: "80px",
                          }}
                        />
                      )}
                      {/* Show the button only when editing */}
                      {isEditing && (
                        <Button
                          variant="contained"
                          component="label"
                          className="mt-3"
                          style={{ marginRight: "70px" }}
                        >
                          Upload Image
                          <input
                            type="file"
                            hidden
                            accept=".png, .jpg, .jpeg"
                            onChange={handleImageChange}
                          />
                        </Button>
                      )}
                    </Box>
                  </div>
                </div>

                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  style={{ paddingLeft: "15px", paddingTop: "18px" }}
                >
                  <Typography variant="h6">Price:</Typography>
                  <MuiTextField
                    disabled={!isEditing}
                    value={selectedProduct.price}
                    onChange={handlePriceChange}
                    fullWidth
                    margin="dense"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                      inputProps: { min: 0 }, // Prevent negative numbers
                    }}
                  />
                  <Typography variant="h6">Quantity:</Typography>
                  <MuiTextField
                    disabled={!isEditing}
                    value={selectedProduct.quantity}
                    onChange={handleQuantityChange}
                    fullWidth
                    margin="dense"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 }, // Prevent negative numbers
                    }}
                  />
                  <Typography variant="h6">Minimum Quantity Level:</Typography>
                  <MuiTextField
                    disabled={!isEditing}
                    value={selectedProduct.minquantitylevel}
                    onChange={handleMinQuantityLevelChange}
                    fullWidth
                    margin="dense"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 }, // Prevent negative numbers
                    }}
                  />
                </Grid>

                <Typography variant="h6">Description:</Typography>
                <MuiTextField
                  disabled={!isEditing}
                  value={selectedProduct.productdescription}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({
                      ...prev,
                      productdescription: e.target.value,
                    }))
                  }
                  fullWidth
                  margin="dense"
                  multiline
                  rows={3}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Show Edit button by default, Save button after editing */}
          {!isEditing ? (
            <Button onClick={handleEditClick} color="primary">
              Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
              disabled={
                selectedProduct &&
                (selectedProduct.productname.trim() === "" ||
                  selectedProduct.price.trim() === "" ||
                  selectedProduct.quantity.trim() === "" ||
                  selectedProduct.minquantitylevel.trim() === "")
              }
            >
              Save
            </Button>
          )}
          <Button onClick={handleCancelClick} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => setSelectedProduct(null)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Dialog Component (you might need to create this) */}
      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete product{" "}
            {productToDelete ? productToDelete : " "}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <AddProductForm
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleAddProduct={handleAddProduct}
        brands={brands}
        categories={categories}
      />
    </Box>
  );
}

export default ProductTable;
