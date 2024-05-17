import { useState } from "react";
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
import OrderIcon from "../../assets/Project Images/Dayul Motors/AdminSideBar/OrderMNG.png";
import ProductIcon from "../../assets/Project Images/Dayul Motors/AdminSideBar/Products.png";
import HomeIcon from "../../assets/Project Images/Dayul Motors/AdminSideBar/Home.png";
import AdminHomePage from "../../pages/AdminDashboard/AdminHome/AdminHomePage";
import ProductMNGPage from "../../pages/AdminDashboard/ProductMNG/ProductMNGPage";
import OrderMNGPage from "../../pages/AdminDashboard/OrderMNGPage/OrderMNGPage";

const drawerWidth = 250;

const SideBar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (component) => {
    setSelectedComponent(component);
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <div>
        <div className="row align-items-center">
          <div className="col-6 w-25">
            <img src={logo} height={"63px"} width={"63px"} className=""></img>
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
            icon: <img src={HomeIcon} width={"30px"} alt="Home Icon" />,
            component: <AdminHomePage />,
          },
          {
            text: "Product Management",
            icon: <img src={ProductIcon} width={"30px"} alt="Inbox Icon" />,
            component: <ProductMNGPage />,
          },
          {
            text: "Order Management",
            icon: <img src={OrderIcon} width={"30px"} alt="Mail Icon" />,
            component: <OrderMNGPage />,
          },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleListItemClick(item.component)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography variant="body1">{item.text}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
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
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
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
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedComponent}
      </Box>
    </Box>
  );
};

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;
