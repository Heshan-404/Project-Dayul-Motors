

import React, { useState } from 'react';
import './AllProducts.css';

function AllProducts() {
  const [expandedItemId, setExpandedItemId] = useState(null);

  // Function to handle click on "Show Details" button
  const toggleDetails = (itemId) => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
  };

const brands = [ "Bajaj","TVS"]
  const tableData = [
    {
      id: 1,
      ID :'005',
      imageSrc: 'https://pixlr.com/images/index/ai-image-generator-one.webp',
      name: 'Product Name',
      price: '$10',
      qty:'20',
      power:'12v',
      capacity:'45h',
      warranty:'2 years Full 1 year Pro Rata',
      stock: '100',
      details: {
        priceDetail: 'Rs.40000.00',
        brand: 'Amaron',
        stock:'100',
        categoryDetail: 'Battery',
      },
    },
    // Add more objects for additional rows if needed
    {
      id: 2,
      ID :'006',
      imageSrc: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
      name: 'Another Product',
      price: '$20',
      qty:'30',
      power:'24v',
      capacity:'60h',
      warranty:'1 year Full 6 months Pro Rata',
      stock: '50',
      details: {
        priceDetail: 'Rs.60000.00',
        brand: 'Another Brand',
        stock:'50',
        categoryDetail: 'Another Category',
      },
    },
  ];

  return (
    <div className="a">
      {/* Right Side */}
      <div className="right-side">
        {/* Top Bar */}
        <div className="top-bar">
          {/* Dropdown Menu */}
          <div style={{ marginLeft: '30px', backgroundColor:'white', borderRadius:'0px' , border:"none"}} className="dropdown-menu">
            <select 
              style={{ backgroundColor:'white' ,width: '50px', height: '50px', fontSize: '1rem' }}
              defaultValue="category"
            >
              <option value="category" disabled>
                Brand : click
              </option>
              <option value="Toyota">Toyota</option>
              <option value="Supra">Supra</option>
              <option value="Mustang">Mustang</option>
            </select>
            <select
              style={{
                borderRadius:'4px',
                marginLeft: '50px',
                backgroundColor:'white',
                width: '400px',
                height: '50px',
                fontSize: '1rem',
              }}
              defaultValue="category"
            >
              <option value="category" disabled>
                Category : click
              </option>
              <option value="Gasket">Gasket</option>
              <option value="Spark">Spark</option>
              <option value="Plug">Plug</option>
            </select>
          </div>
          {/* Search Bar */}
          <div style={{  marginLeft: '700px',marginRight: '50px' }} className="search-bar">
            <input 
              style={{borderRadius:'4px', width: '400px', height: '37px' }}
              type="text"
              placeholder="Search product..."
            />
            <button style={{ backgroundColor: 'silver' }}>Add Product +</button>
          </div>
        </div>

        {/* Table with Cards */}
        <table>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'white' , width: '80px'}}>Image</th>
              <th style={{ backgroundColor: 'white', width: '80px' }}>ID</th>
              <th style={{ backgroundColor: 'white', width: '450px' }}>Name</th>
              <th style={{ backgroundColor: 'white', width: '80px' }}>Price</th>
              <th style={{ backgroundColor: 'white', width: '80px' }}>Stock</th>
              <th style={{ backgroundColor: 'white', width: '80px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over tableData to render each row */}
            {tableData.map((item) => (
              <tr key={item.id}>
                {/* Render table cells dynamically */}
                <td>
                <img src={item.imageSrc} alt={`Card ${item.id} Image`} style={{ width: '40px', height: 'auto' }} />
                  {expandedItemId === item.id && (
                    <div>
                      <center>
                        <img style={{ width: '150px', height: '150px' }} src={item.imageSrc} alt="card_image" />
                      </center>
                    </div>
                  )}
                </td>
                <td>{item.ID}</td>
                <td>
                  <p>{item.name}</p>
                  {expandedItemId === item.id && (
                    <div style={{ marginLeft: '90px' }}>
                      <p>ID</p>
                      <p>{item.ID}</p>
                      <p>Minimum qty : {item.qty}</p>
                      <p style={{ color: 'silver' }}>Description</p>
                      <p>. Power out: {item.power}</p>
                      <p>. Capacity: {item.capacity}</p>
                      <p>. Warranty: {item.warranty}</p>
                    </div>
                  )}
                </td>
                <td>{item.price}
                  {expandedItemId === item.id && (
                    <div style={{ marginLeft: '30px' }}>
                      <p>Price</p>
                      <p>{item.details.priceDetail}</p>
                      <br /><br />
                      <p style={{ marginTop: '10px' }}>Brand</p>
                      <p>{item.details.brand}</p>
                      <button style={{backgroundColor:'purple'}}>Edit</button>
                    </div>
                  )}
                </td>
                <td>{item.stock}
                  {expandedItemId === item.id && (
                    <div style={{ marginLeft: '30px' }}>
                      <p>Stock</p>
                      <p>{item.stock}</p>
                      <br /><br />
                      <p style={{ marginTop: '10px' }}>Category</p>
                      <p>{item.details.categoryDetail}</p>
                     <button style={{backgroundColor:'red'}}>delete</button>
                    </div>
                  )}
                </td>
                <td>
                  <img
                    src={expandedItemId === item.id ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxMlTKPiTQ5B1Ph2IbhR4lolhFmgUhk2sgp-xQNVmOvg&s' : 'https://cdn.iconscout.com/icon/free/png-256/down-keyboard-arrow-key-direction-30469.png'}
                    alt={expandedItemId === item.id ? 'Hide Details' : 'Show Details'}
                    onClick={() => toggleDetails(item.id)}
                    style={{ cursor: 'pointer', width: '30px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllProducts;


