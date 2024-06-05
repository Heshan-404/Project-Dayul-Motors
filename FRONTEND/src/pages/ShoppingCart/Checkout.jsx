import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import oipImage from "../../assets/Project Images/Dayul Motors/Brands/Bajaj.jpg"; // Assuming you have this image in your assets

const Checkout = () => {
  const location = useLocation();

  const sampleItems = [
    { id: 1, name: "Sample Item 1", price: 100.0, qty: 2, img: oipImage },
    { id: 2, name: "Sample Item 2", price: 150.0, qty: 1, img: oipImage },
    { id: 3, name: "Sample Item 3", price: 200.0, qty: 1, img: oipImage },
  ];

  const items = location.state?.items || sampleItems;
  const [paymentType, setPaymentType] = useState("credit");

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment submitted via ${paymentType}!`);
  };

  return (
    <div className="outer-container">
      <div className="checkout-container">
        <style>{`
          .outer-container {
            background-color: rgba(0, 0, 0, 0.1); /* Light black background */
            padding: 20px;
          }

          .checkout-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #fff; /* White background for the content */
            border-radius: 8px;
          }

          @media (min-width: 768px) {
            .checkout-container {
              flex-direction: row;
              justify-content: space-between;
            }
          }

          .continue-shopping {
            position: absolute;
            top: 10px;
            left: 10px;
            display: flex;
            align-items: center;
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
            font-size: 24px; /* Larger font size */
            text-underline-offset: 5px;
            text-decoration-thickness: 2px;
            margin-bottom: 20px; /* Added margin */
          }

          .continue-shopping:hover {
            text-decoration: underline;
          }

          .continue-shopping svg {
            margin-right: 10px;
            width: 32px; /* Larger icon size */
            height: 32px; /* Larger icon size */
          }

          .circle-arrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px; /* Circle size */
            height: 40px; /* Circle size */
            border-radius: 50%;
            background-color: #007bff; /* Circle background color */
            color: white; /* Arrow color */
          }

          .items-container {
            width: 100%;
            margin-bottom: 20px;
          }

          @media (min-width: 768px) {
            .items-container {
              width: 60%;
            }
          }

          .payment-container {
            width: 100%;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #e7f3ff; /* Light blue background */
          }

          @media (min-width: 768px) {
            .payment-container {
              width: 35%;
            }
          }

          .item {
            display: flex;
            align-items: center;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            background-color: #000;
            color: white;
          }

          .item + .item {
            margin-top: 10px; /* Gap between items */
          }

          .item-image {
            width: 100px;
            height: 100px;
            border-radius: 5px;
          }

          .item-details {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
          }

          .item-details p {
            margin: 0 10px;
          }

          .total-amount {
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            text-align: right;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          form div {
            margin-bottom: 10px;
          }

          label {
            display: block;
            margin-bottom: 5px;
          }

          input[type="text"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
          }

          .payment-options {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
          }

          .payment-options input[type="radio"] {
            margin-right: 5px;
          }

          .expiration-cvv {
            display: flex;
            justify-content: space-between;
          }

          .expiration-cvv div {
            width: 48%;
          }

          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }

          h2 {
            color: #007bff; /* Blue color for headings */
            margin-top: 20px; /* Added margin */
          }
        `}</style>

        <Link to="/" className="continue-shopping">
          <div className="circle-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Continue Shopping
        </Link>

        <div className="items-container">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div className="item" key={item.id}>
              <img src={item.img} alt={item.name} className="item-image" />
              <div className="item-details">
                <p>{item.name}</p>
                <p>Price: Rs.{item.price.toFixed(2)}</p>
                <p>Quantity: {item.qty}</p>
                <p>Subtotal: Rs.{(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="total-amount">Total: Rs.{calculateTotal()}</div>
        </div>

        <div className="payment-container">
          <h2>Payment Details</h2>
          <p>
            Please select your payment type and enter your payment details
            below:
          </p>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentType"
                value="credit"
                checked={paymentType === "credit"}
                onChange={handlePaymentTypeChange}
              />
              Credit
            </label>
            <label>
              <input
                type="radio"
                name="paymentType"
                value="cash"
                checked={paymentType === "cash"}
                onChange={handlePaymentTypeChange}
              />
              Cash
            </label>
          </div>
          {paymentType === "credit" && (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" required />
              </div>
              <div className="expiration-cvv">
                <div>
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv">CVV:</label>
                  <input type="text" id="cvv" name="cvv" required />
                </div>
              </div>
              <div>
                <label htmlFor="cardName">Name on Card:</label>
                <input type="text" id="cardName" name="cardName" required />
              </div>
              <button type="submit">Checkout</button>
            </form>
          )}
          {paymentType === "cash" && (
            <button onClick={handleSubmit}>Checkout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
