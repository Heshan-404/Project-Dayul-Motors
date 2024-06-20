/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import AdminHomePage from "../../pages/AdminDashboard/AdminHome/AdminHomePage";
import ProductMNGPage from "../../pages/AdminDashboard/ProductMNG/ProductMNGPage";
import OrderMNGPage from "../../pages/AdminDashboard/OrderMNGPage/OrderMNGPage";
import Billing from "./Billing/Billing";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBoxOpen,
  faClipboardList,
  faFileInvoice,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../axiosConfig";
import { Button } from "@mui/material";

const drawerWidth = 250;

const SideBar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<AdminHomePage />);
  const [activeItem, setActiveItem] = useState(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    try {
      console.log(token);
      const response = await axiosInstance.post(
        "/auth/admin/protected/token_verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setIsSessionExpired(true);
      localStorage.removeItem("adminToken");
    }
  };
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/adminSign"); // Redirect to admin signin if token is missing
    } else {
      verifyToken(adminToken);
    }
  }, []);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (component, text, itemId) => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/adminSign"); // Redirect to admin signin if token is missing
    } else {
      verifyToken(adminToken);
    }
    setSelectedComponent(component);
    setTittleText(text);
    setActiveItem(itemId); // Update active item
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear the admin token
    navigate("/adminSign");
  };
  const handleSignin = () => {
    navigate("/adminSign"); // Redirect to admin signin
  };
  const drawer = (
    <div>
      <div>
        <div className="row align-items-center">
          <div className="col-6 w-25">
            <img
              src={logo}
              height={"63px"}
              width={"63px"}
              className=""
              alt="Dayul Motors Logo"
            />
          </div>
          <div className="col-6">
            <span className="fw-bolder text-black fs-6">Dayul Motors</span>
          </div>
        </div>
        <div className="bg-black opacity-25" style={{ height: "1px" }} />
      </div>
      <Divider />
      <List>
        {[
          {
            text: "Home",
            icon: <FontAwesomeIcon icon={faHome} size="lg" />,
            component: <AdminHomePage />,
            id: "home",
          },
          {
            text: "Product Management",
            icon: <FontAwesomeIcon icon={faBoxOpen} size="lg" />,
            component: <ProductMNGPage />,
            id: "products",
          },
          {
            text: "Order Management",
            icon: <FontAwesomeIcon icon={faClipboardList} size="lg" />,
            component: <OrderMNGPage />,
            id: "orders",
          },
          {
            text: "Billing",
            icon: <FontAwesomeIcon icon={faFileInvoice} size="lg" />,
            component: <Billing />,
            id: "billing",
          },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() =>
              handleListItemClick(item.component, item.text, item.id)
            }
            className={activeItem === item.id ? "active" : ""}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography variant="body1">{item.text}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const [titleText, setTittleText] = useState("Dashboard");
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {isSessionExpired && (
        <div className="modal">
          <div className="modal-content">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              className="close"
            ></IconButton>
            <Typography variant="body1" style={{ marginTop: "30px" }}>
              Your session has expired. Please log in again.
            </Typography>
            <Button
              variant="contained"
              className="d-flex align-self-center mt-5"
              style={{ width: "fit-content" }}
              onClick={handleSignin}
            >
              Sign-in
            </Button>
          </div>
        </div>
      )}
      <Box sx={{ display: "flex" }}>
        <div>
          <style>{`
          .active {
            background-color: #f0f0f0; 
            color: #000; 
          }
          .modal {
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px); /* Add blur effect */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            width: 300px;
            height: 200px;  
            text-align: center;
          }
          
          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          }
          
        `}</style>
        </div>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "black",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-white"
            >
              {titleText}
            </Typography>
            <IconButton
              onClick={handleLogout}
              sx={{ ml: "auto", color: "white" }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerClose}
            ModalProps={{ keepMounted: true }}
          >
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Box>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {drawer}
            </Box>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {selectedComponent}
        </Box>
      </Box>
    </div>
  );
};

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;
