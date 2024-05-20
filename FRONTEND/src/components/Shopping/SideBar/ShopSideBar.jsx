import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

// Import images for the AppBar icons
import Bajaj from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import Nachi from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Nachi.jpg"; 
import NOK from "../../../assets/Project Images/Dayul Motors/Brands/Edited/NOK.jpg";

// Replace with your actual image imports for sidebar
import Image1 from "../../../assets/Project Images/Dayul Motors/ShopSideBar/small_AirFIlters-Icon.jpg";
import Image2 from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";
import Image3 from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";
import Background from "../Background/Background"; // Replace with your Background component

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState(null); // State to store the selected brand

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const sidebarItems = [
    { text: "Inbox", icon: Image1 },
    { text: "Starred", icon: Image2 },
    { text: "Send email", icon: Image3 },
    { text: "Drafts", icon: Image1 },
  ];

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={item.icon} alt={item.text} width="30px" height="30px" />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand); // Update the selected brand state
  };

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
          {/* Images instead of Icons in AppBar */}
          <h6>BRANDS</h6>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={() => handleBrandClick("Bajaj")}>
              <img src={Bajaj} alt="Bajaj" height="50px" />
            </IconButton>
            <IconButton color="inherit" onClick={() => handleBrandClick("Nachi")}>
              <img src={Nachi} alt="Nachi" height="50px" />
            </IconButton>
            <IconButton color="inherit" onClick={() => handleBrandClick("NOK")}>
              <img src={NOK} alt="NOK" height="50px" />
            </IconButton>
          </Box>
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
          onTransitionEnd={handleDrawerTransitionEnd}
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
          {drawerContent}
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
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Background selectedBrand={selectedBrand} /> {/* Pass selected brand to Background component */}
        {/* Your main content here */}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;