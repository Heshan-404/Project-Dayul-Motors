/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import NavigationBar from "../../components/Homepage/NavigationBar";
import Footer from "../../components/Homepage/Footer";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showStockError, setShowStockError] = useState(false);
  const [stockErrorMessage, setStockErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await axiosInstance.get("/shopcart/cart", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const cartItems = cartResponse.data;

        const productIds = cartItems.map((item) => item.productid);
        const productResponse = await axiosInstance.post(
          "/shopcart/products/details",
          { productIds },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const products = productResponse.data;
        const validatedCartData = cartItems.map((cartItem) => {
          const product = products.find(
            (product) => product.productid === cartItem.productid
          );

          if (product) {
            const remainingStock = product.quantity - cartItem.quantity;
            if (remainingStock < 0) {
              return null;
            }
            return {
              ...cartItem,
              stock: product.quantity,
              price: product.price,
              totalItemPrice: product.price * cartItem.quantity,
            };
          }
          return null;
        });

        const filteredCartData = validatedCartData.filter(
          (item) => item !== null
        );
        setCartData(filteredCartData);
        setTotalPrice(
          filteredCartData.reduce(
            (total, item) => total + item.totalItemPrice,
            0
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setIsLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      fetchCartData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleQtyChange = async (cartid, productid, newQty) => {
    setIsUpdating(true);
    try {
      const response = await axiosInstance.put(
        `/shopcart/cart/update/${cartid}/${productid}`,
        {
          quantity: newQty,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCartData(
        cartData.map((item) =>
          item.cartid === cartid && item.productid === productid
            ? { ...item, quantity: parseInt(newQty, 10) }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
    }
  };

  const handleIncrement = async (cartid, productid) => {
    const newQty =
      parseInt(
        cartData.find(
          (item) => item.cartid === cartid && item.productid === productid
        ).quantity,
        10
      ) + 1;

    await handleQtyChange(cartid, productid, newQty);
  };

  const handleDecrement = async (cartid, productid) => {
    const newQty =
      cartData.find(
        (item) => item.cartid === cartid && item.productid === productid
      ).quantity - 1;

    if (newQty >= 1) {
      await handleQtyChange(cartid, productid, newQty);
    }
  };

  const handleDelete = async (cartid, productid) => {
    try {
      await axiosInstance.delete(
        `/shopcart/cart/delete/${cartid}/${productid}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCartData(
        cartData.filter(
          (item) => item.cartid !== cartid || item.productid !== productid
        )
      );
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleAddToCart = async () => {
    setIsCartPopupVisible(true);
  };

  const confirmAddToCart = async () => {
    if (!localStorage.getItem("token") || !localStorage.getItem("userid")) {
      navigate("/signin");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/shopcart/cart",
        {
          productid: productID,
          quantity: quantity,
          userid: localStorage.getItem("userid"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      setIsCartAdded(true);
      setErrorMessage(null);
      setShowStockError(false);
      setTimeout(() => {
        setIsCartAdded(false);
      }, 3000);

      setIsCartPopupVisible(false);
    } catch (error) {
      console.error("Error adding cart item to database:", error);
      setIsCartPopupVisible(false);

      if (error.response.status === 400 && error.response.data.message) {
        setShowStockError(true);
        setStockErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Error adding item to cart. Please try again."
        );
      }
    }
  };

  const cancelAddToCart = () => {
    setIsCartPopupVisible(false);
  };

  const handleContinueShopping = () => {
    navigate("/shopcart");
  };

  if (isLoading) {
    return (
      <div
        className="mb-3 d-flex align-items-start"
        style={{ maxWidth: "700px", marginLeft: "130px" }}
      >
        <div style={{ width: "350px" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />

      <div className="Shopping mt-5">
        <style>{`
        .Shopping {
          text-align: center;
          background-color: white;
          padding: 20px;
          position: relative;
        }

        .shopping-continue-btn {
          background-color: transparent;
          color: #000;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          text-align: left;
          font-size: 24px; 
          font-weight: bold;
          display: inline-block;
          position: absolute;
          left: 20px;
          top: 20px;
        }

        .shopping-continue-btn:hover {
          color: #333;
        }

        .shopping-continue-btn::before {
          content: '←';
          margin-right: 10px;
          font-size: 28px; 
          background: #000;
          color: white;
          border-radius: 50%;
          padding: 5px 10px;
          display: inline-block;
        }

        .cart-header {
          text-align: center;
          margin-top: 80px; 
          margin-bottom: 20px;
        }

        .cart-header h1 {
          margin: 0;
          font-size: 24px;
          text-decoration: none; 
        }

        .cart-header p {
          margin: 5px 0;
          font-size: 18px;
          color: #555;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          background-color: #000;
          color: white;
        }

        .item-image {
          width: 100px;
          height: 100px;
          border-radius: 5px;
        }

        .item-details {
          flex-grow: 1;
          text-align: left;
          margin-left: 20px;
        }

        .item-details p {
          margin: 5px 0;
        }

        .qty-controls {
          display: flex;
          align-items: center;
        }

        .qty-controls button {
          background-color: #ccc;
          border: none;
          padding: 5px;
          margin: 0 5px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn {
          background-color: #ff4d4d;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 5px;
          margin-left: 20px;
        }

        .delete-btn:hover {
          background-color: #ff1a1a;
        }

        .checkout-container {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          padding: 20px 0;
        }

        .checkout-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 15px 30px;
          cursor: pointer;
          border-radius: 5px;
        }

        .checkout-btn:hover {
          background-color: #218838;
        }
      `}</style>
        <button
          onClick={handleContinueShopping}
          className="shopping-continue-btn"
        >
          Shopping Cart
        </button>
        <div
          className="cart-header"
          style={{ paddingTop: "40px", paddingBottom: "0px" }}
        >
          <h1>Shopping Cart</h1>
          <p>You have {cartData.length} items in your cart</p>
        </div>
        <div className="cart">
          {cartData.map((item) => (
            <div className="item" key={item.productid}>
              <img
                src={item.imageurl}
                alt={item.productname}
                className="item-image"
              />
              {console.log(item)}
              <div className="item-details">
                <p>{item.productname}</p>
                <p>Price: Rs.{item.price}</p>
              </div>
              <div className="qty-controls">
                <button
                  onClick={() => handleDecrement(item.cartid, item.productid)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQtyChange(
                      item.cartid,
                      item.productid,
                      parseInt(e.target.value, 10)
                    )
                  }
                  min="1"
                  style={{ width: "50px", textAlign: "center" }}
                />
                <button
                  onClick={() => handleIncrement(item.cartid, item.productid)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleDelete(item.cartid, item.productid)}
                className="delete-btn"
              >
                Delete
              </button>
              {parseInt(item.stock, 10) < parseInt(item.quantity, 10) && (
                <div className="stock-warning">
                  Insufficient Stock: Only {item.stock} units available
                </div>
              )}
              {isUpdating && (
                // Show the progress indicator if updating
                <CircularProgress size={24} style={{ marginLeft: "10px" }} />
              )}
            </div>
          ))}
        </div>
        {cartData.length !== 0 && (
          <div className="checkout-container">
            <Link to="/checkout">
              <button className="checkout-btn">
                Check Out (Total: Rs.{totalPrice.toFixed(2)})
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
