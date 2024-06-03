/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../../axiosConfig";

function AddProductForm({ open, handleClose, handleAddProduct }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    brand: "",
    category: "",
    name: "",
    description: "",
    price: "",
    qty: "",
    minQty: "",
    image: null,
  });

  const [isBrandDialogOpen, setIsBrandDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newBrandImage, setNewBrandImage] = useState(null);
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [brandNameError, setBrandNameError] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [qtyError, setQtyError] = useState(false);
  const [minQtyError, setMinQtyError] = useState(false);
  const [isAddProductButtonDisabled, setIsAddProductButtonDisabled] =
    useState(true);
  const [isAddBrandButtonDisabled, setIsAddBrandButtonDisabled] =
    useState(true);
  const [isAddCategoryButtonDisabled, setIsAddCategoryButtonDisabled] =
    useState(true);
  const [isMinQtyDisabled, setIsMinQtyDisabled] = useState(true);
  useEffect(() => {
    fetchBrandsData();
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    validateProductForm();
  }, [newProduct, brandNameError, priceError, qtyError, minQtyError]);

  useEffect(() => {
    validateAddBrandForm();
  }, [newBrand, newBrandImage, brandNameError]);

  useEffect(() => {
    validateAddCategoryForm();
  }, [newCategory, newCategoryImage, categoryNameError]);

  // Fetch brands data from the API
  const fetchBrandsData = async () => {
    try {
      const response = await axiosInstance.get("/auth/admin/protected/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Fetch categories data from the API
  const fetchCategoriesData = async () => {
    try {
      const response = await axiosInstance.get(
        "/auth/admin/protected/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image && /\.(png|jpe?g)$/i.test(image.name)) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: null,
      }));
    }
  };

  const handleAddBrand = async () => {
    if (newBrand && /^[A-Z]/.test(newBrand) && newBrandImage) {
      const formData = new FormData();
      formData.append("name", newBrand);
      formData.append("image", newBrandImage);

      try {
        const response = await axiosInstance.post(
          "/auth/admin/protected/brands", // Assuming this is your API endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setBrands([...brands, response.data]);
        setNewBrand("");
        setNewBrandImage(null);
        setIsBrandDialogOpen(false);
        setBrandNameError(false);
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          brand: response.data.brandname,
        }));
        setIsAddBrandButtonDisabled(true);
      } catch (error) {
        console.error("Error adding brand:", error);
      }
    } else {
      setBrandNameError(true);
    }
  };
  const handleAddCategory = async () => {
    if (newCategory && /^[A-Z]/.test(newCategory) && newCategoryImage) {
      const formData = new FormData();
      formData.append("name", newCategory);
      formData.append("image", newCategoryImage);

      try {
        const response = await axiosInstance.post(
          "/auth/admin/protected/categories",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCategories([...categories, response.data]);
        setNewCategory("");
        setNewCategoryImage(null);
        setIsCategoryDialogOpen(false);
        setCategoryNameError(false);
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          category: response.data.categoryname,
        }));
        setIsAddCategoryButtonDisabled(true);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      setCategoryNameError(true);
    }
  };

  const validateProductForm = () => {
    const isNameValid = newProduct.name.trim() !== "";
    const isPriceValid = /^\d+(\.\d{1,2})?$/.test(newProduct.price);
    const isQtyValid =
      newProduct.qty &&
      /^\d+$/.test(newProduct.qty) &&
      parseInt(newProduct.qty) >= 0;
    const isMinQtyValid =
      newProduct.minQty &&
      /^\d+$/.test(newProduct.minQty) &&
      parseInt(newProduct.minQty) >= 0 &&
      parseInt(newProduct.minQty) < parseInt(newProduct.qty);

    setPriceError(!isPriceValid);
    setQtyError(!isQtyValid);
    setMinQtyError(!isMinQtyValid);
    setIsAddProductButtonDisabled(
      !newProduct.brand ||
        !newProduct.category ||
        !newProduct.name ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.qty ||
        !newProduct.minQty ||
        !newProduct.image ||
        !isNameValid ||
        !isPriceValid ||
        !isQtyValid ||
        !isMinQtyValid
    );
  };

  const validateAddBrandForm = () => {
    const isBrandNameValid = /^[A-Z]/.test(newBrand);
    setBrandNameError(!isBrandNameValid);
    setIsAddBrandButtonDisabled(
      !newBrandImage || !isBrandNameValid || !newBrand
    );
  };

  const validateAddCategoryForm = () => {
    const isCategoryNameValid = /^[A-Z]/.test(newCategory);
    setCategoryNameError(!isCategoryNameValid);
    setIsAddCategoryButtonDisabled(
      !newCategoryImage || !isCategoryNameValid || !newCategory
    );
  };

  const handleBrandInputChange = (e) => {
    const value = e.target.value;
    setNewBrand(value);
    validateAddBrandForm();
  };

  const handleCategoryInputChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
    validateAddCategoryForm();
  };

  const handleBrandImageChange = (e) => {
    const image = e.target.files[0];
    if (image && /\.(png|jpe?g)$/i.test(image.name)) {
      setNewBrandImage(image);
    } else {
      setNewBrandImage(null);
    }
    validateAddBrandForm();
  };

  const handleCategoryImageChange = (e) => {
    const image = e.target.files[0];
    if (image && /\.(png|jpe?g)$/i.test(image.name)) {
      setNewCategoryImage(image);
    } else {
      setNewCategoryImage(null);
    }
    validateAddCategoryForm();
  };

  const handleSubmit = async () => {
    if (!isAddProductButtonDisabled) {
      try {
        const formData = new FormData();
        formData.append("brandid", newProduct.brand);
        formData.append("categoryid", newProduct.category);
        formData.append("name", newProduct.name);
        formData.append("description", newProduct.description);
        formData.append("price", newProduct.price);
        formData.append("qty", newProduct.qty);
        formData.append("minQty", newProduct.minQty);
        formData.append("image", newProduct.image);
        const response = await axiosInstance.post(
          "/auth/admin/protected/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        handleAddProduct(response.data);
        handleClose();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };
  const handleQtyChange = (e) => {
    const value = e.target.value;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      qty: value,
    }));
    setQtyError(!/^\d+$/.test(value) || parseInt(value) < 0);
    setIsMinQtyDisabled(!value || parseInt(value) <= 0);
  };

  const handleMinQtyChange = (e) => {
    const value = e.target.value;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      minQty: value,
    }));
    setMinQtyError(
      !value ||
        !/^\d+$/.test(value) ||
        parseInt(value) < 0 ||
        (newProduct.qty && parseInt(value) >= parseInt(newProduct.qty))
    );
  };

  const handleKeyPress = (e) => {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      "Delete",
    ];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent style={{ width: "600px" }} className="pt-2">
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              label="Brand"
              name="brand"
              value={newProduct.brand}
              onChange={handleChange}
              fullWidth
            >
              {brands.map((brand, index) => (
                <MenuItem key={index} value={brand.brandid}>
                  <div>
                    <img
                      src={brand.imageurl}
                      width={"17px"}
                      style={{ marginRight: "30px", marginLeft: "30px" }}
                    />
                    {brand.brandname}
                  </div>
                </MenuItem>
              ))}
              <MenuItem
                value="addBrand"
                onClick={() => setIsBrandDialogOpen(true)}
              >
                <AddIcon style={{ marginRight: "27px", marginLeft: "25px" }} />
                Add Brand
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.categoryid}>
                  <div>
                    <img
                      src={category.imageurl}
                      width={"17px"}
                      style={{ marginRight: "30px", marginLeft: "30px" }}
                    />
                    {category.categoryname}
                  </div>
                </MenuItem>
              ))}
              <MenuItem
                value="addCategory"
                onClick={() => setIsCategoryDialogOpen(true)}
              >
                <AddIcon style={{ marginRight: "27px", marginLeft: "25px" }} />
                Add Category
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            fullWidth
            error={priceError}
            helperText={priceError && "Price should be a valid number"}
            type="number"
            onKeyDown={handleKeyPress}
          />
          <TextField
            label="Quantity"
            name="qty"
            value={newProduct.qty}
            onChange={handleQtyChange}
            fullWidth
            error={qtyError}
            helperText={qtyError && "Quantity should be a positive number"}
            type="number"
            onKeyDown={handleKeyPress}
          />
          <TextField
            label="Minimum Quantity Level"
            name="minQty"
            value={newProduct.minQty}
            onChange={handleMinQtyChange}
            fullWidth
            error={minQtyError}
            helperText={
              minQtyError &&
              "Minimum Quantity should be a positive number and less than Quantity"
            }
            type="number"
            onKeyDown={handleKeyPress}
            disabled={isMinQtyDisabled}
          />
          {newProduct.image && (
            <center>
              <img
                src={URL.createObjectURL(newProduct.image)}
                alt="Product Preview"
                className="d-flex"
                style={{ marginTop: "40px", width: "150px" }}
              />
            </center>
          )}
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
            />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={isAddProductButtonDisabled}
          variant="contained"
          color="primary"
        >
          Add Product
        </Button>
      </DialogActions>

      {/* Add New Brand Dialog */}
      <Dialog
        open={isBrandDialogOpen}
        onClose={() => setIsBrandDialogOpen(false)}
      >
        <DialogTitle>Add New Brand</DialogTitle>
        <DialogContent style={{ width: "400px", height: "400px" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Brand Name"
            value={newBrand}
            onChange={handleBrandInputChange}
            error={brandNameError}
            helperText={
              brandNameError
                ? "Brand name should start with an uppercase letter"
                : ""
            }
          />
          <Button variant="contained" component="label" startIcon={<AddIcon />}>
            Upload Image
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              hidden
              onChange={handleBrandImageChange}
            />
          </Button>
          {newBrandImage && (
            <center>
              <img
                src={URL.createObjectURL(newBrandImage)}
                alt="Product Preview"
                className="d-flex"
                style={{ marginTop: "40px", width: "150px" }}
              />
            </center>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsBrandDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddBrand}
            disabled={isAddBrandButtonDisabled}
            variant="contained"
            color="primary"
          >
            Add Brand
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Category Dialog */}
      <Dialog
        open={isCategoryDialogOpen}
        onClose={() => setIsCategoryDialogOpen(false)}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent style={{ width: "400px", height: "400px" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            value={newCategory}
            onChange={handleCategoryInputChange}
            error={categoryNameError}
            helperText={
              categoryNameError
                ? "Category name should start with an uppercase letter"
                : ""
            }
          />
          <Button variant="contained" component="label" startIcon={<AddIcon />}>
            Upload Image
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              hidden
              onChange={handleCategoryImageChange}
            />
          </Button>
          {newCategoryImage && (
            <center>
              <img
                src={URL.createObjectURL(newCategoryImage)}
                alt="Product Preview"
                className="d-flex"
                style={{ marginTop: "40px", width: "150px" }}
              />
            </center>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCategoryDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddCategory}
            disabled={isAddCategoryButtonDisabled}
            variant="contained"
            color="primary"
          >
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}

export default AddProductForm;
