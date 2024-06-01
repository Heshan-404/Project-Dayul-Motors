const EditItem = () => {
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
              <select id="brand" name="brand">
                <option value="brand1">Brand 1</option>
                <option value="brand2">Brand 2</option>
                <option value="brand3">Brand 3</option>
              </select>
            </div>
            <div className="dropdown-c">
              <label htmlFor="category">Category:</label>
              <select id="category" name="category">
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
                <option value="cat3">Category 3</option>
              </select>
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
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
