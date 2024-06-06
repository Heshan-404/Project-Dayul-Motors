/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";

const Invoice = React.forwardRef((props, ref) => (
  <div ref={ref} id="invoice-container" className="invoice-container">
    <style>{`
      .container {
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        background-color: #fff;
      }
      .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        padding-bottom: 20px;
      }
      .logo img {
        max-width: 150px;
      }
      .company-details {
        text-align: right;
      }
      .company-details h2 {
        margin: 0;
        color: #000;
        font-size: 24px;
        font-weight: bold;
      }
      .invoice-details {
        text-align: center;
        margin: 20px 0;
      }
      .invoice-details h2 {
        margin: 0;
        color: #fff;
        background-color: #000;
        padding: 10px;
        font-size: 24px;
        font-weight: bold;
      }
      .invoice-details p {
        margin: 5px 0;
        font-size: 14px;
        color: #555;
      }
      .invoice-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 14px;
      }
      .invoice-table th, .invoice-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }
      .invoice-table th {
        background-color: #000;
        color: #fff;
        font-weight: bold;
      }
      .totals {
        margin: 20px 0;
        text-align: right;
      }
      .totals table {
        width: 100%;
        max-width: 300px;
        float: right;
      }
      .totals th, .totals td {
        padding: 10px;
        text-align: right;
      }
      .totals th {
        width: 70%;
      }
      .footer {
        text-align: center;
        margin: 20px 0;
      }
      .footer p {
        margin: 0;
        font-size: 14px;
      }
      .footer h4 {
        margin: 5px 0;
        color: #000;
        font-size: 18px;
      }
      .footer h3 {
        margin: 5px 0;
        color: #000;
        font-size: 16px;
        font-weight: bold;
      }

      /* Adjust Invoice Component Styles for Responsiveness */
      @media (max-width: 768px) {
        .container {
          width: 100%;
          max-width: 90vw; 
        }

        .invoice-table th,
        .invoice-table td {
          font-size: 12px; 
        }

        .totals {
          text-align: center; 
        }

        .totals table {
          float: none; 
          width: auto;
        }
      }
    `}</style>
    <div className="header">
      <div className="logo">
        <img src="Artboard 1.png" alt="Company Logo" />
      </div>
      <div className="company-details">
        <h2>DAYUL MOTORS</h2>
        <p>
          123 Anywhere St,
          <br />
          Thanamalwila
        </p>
        <p>dayulmotors@gmail.com</p>
        <p>077-777-7777</p>
      </div>
    </div>
    <div className="invoice-details">
      <h2>INVOICE</h2>
      <p>Invoice No: #12345</p>
      <p>Due Date: {new Date().toLocaleDateString()}</p>
      <p>Invoice Date: {new Date().toLocaleDateString()}</p>
      <h3>Invoice To:</h3>
      <p>
        {props.userData.name}
        <br />
        {props.userData.address}
        <br />
        {props.userData.email}
        <br />
        {props.userData.phone}
      </p>
    </div>
    <div className="invoice-table-section">
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {props.cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productid}</td>
              <td>{item.name}</td>
              <td>Rs.{item.price}</td>
              <td>{item.quantity}</td>
              <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="totals">
      <table>
        <tbody>
          <tr>
            <th>Sub-total:</th>
            <td>Rs.{props.totalAmount}</td>
          </tr>
          <tr>
            <th>Discount:</th>
            <td>Rs.0.00</td>
          </tr>
          <tr>
            <th>Total:</th>
            <td>Rs.{props.totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="footer">
      <p>
        Make the payment within 05 days of receipt of this invoice. In case of
        delay, the order will be cancelled.
      </p>
      <h4>Thank you for your come again!</h4>
      <h3>DAYUL MOTORS</h3>
    </div>
  </div>
));

export default Invoice;
