/* eslint-disable react/prop-types */
import { useState } from "react";
const DropdownWithAddOption = ({ options, addOptionLabel, onAddOption }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === addOptionLabel) {
      const newOptionValue = prompt(
        `Enter the new ${addOptionLabel.toLowerCase()}:`
      );
      if (newOptionValue) {
        onAddOption(newOptionValue);
      }
    } else {
      setSelectedOption(selectedValue);
    }
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      <option value={addOptionLabel}>{addOptionLabel}</option>
    </select>
  );
};

const Additem = () => {
  const [categories, setCategories] = useState([
    { value: "cat1", label: "Category 1" },
    { value: "cat2", label: "Category 2" },
    { value: "cat3", label: "Category 3" },
  ]);

  const handleAddCategory = (newCategoryValue) => {
    const newCategoryOption = {
      value: `cat${categories.length + 1}`,
      label: newCategoryValue,
    };
    setCategories([...categories, newCategoryOption]);
  };

  return (
    <div className="c">
      <div className="form-box">
        <h2>Add New Item</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              style={{ width: "200px" }}
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <div className="form-group horizontal-dropdowns">
            <div className="dropdown-c">
              <label htmlFor="brand">Brand:</label>
              <DropdownWithAddOption
                options={[
                  { value: "brand1", label: "Brand 1" },
                  { value: "brand2", label: "Brand 2" },
                  { value: "brand3", label: "Brand 3" },
                ]}
                addOptionLabel="Add Brand +"
                onAddOption={(newBrandValue) => {
                  // You can implement adding new brand here
                  console.log(`Adding brand: ${newBrandValue}`);
                }}
              />
            </div>
            <div className="dropdown-c">
              <label htmlFor="category">Category:</label>
              <DropdownWithAddOption
                options={categories}
                addOptionLabel="Add Category +"
                onAddOption={handleAddCategory}
              />
            </div>
          </div>
          <div className="form-group horizontal-inputs">
            <div className="input-c">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                style={{ width: "200px" }}
              />
            </div>
            <div className="input-c">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              style={{ width: "200px" }}
              type="text"
              id="price"
              name="price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxQuantity">Max Quantity:</label>
            <input
              style={{ width: "200px" }}
              type="number"
              id="maxQuantity"
              name="maxQuantity"
            />
          </div>
          <button
            style={{ marginLeft: "300px", backgroundColor: "purple" }}
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Additem;
