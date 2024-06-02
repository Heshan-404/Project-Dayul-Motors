import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Aboutus from "../../../pages/AboutUsPage/AboutUs";
import AdminAccountsPage from "../../../pages/AdminDashboard/AdminHome/AdminAccounts/AdminAccountsPage";
import UserAccountsPage from "../../../pages/AdminDashboard/AdminHome/AdminAccounts/UserAccountsPage";
import Dashboard from "./Dashboard/Dashboard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          <Tab
            label="Statistics"
            {...a11yProps(0)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "lightblue",
                color: "blue",
              },
            }}
          />
          <Tab
            label="Settings"
            {...a11yProps(1)}
            sx={{
              "&.Mui-selected": { backgroundColor: "lightblue", color: "blue" },
            }}
          />
          <Tab
            label="Admin Accounts"
            {...a11yProps(2)}
            sx={{
              "&.Mui-selected": { backgroundColor: "lightblue", color: "blue" },
            }}
          />
          <Tab
            label="User Accounts"
            {...a11yProps(3)}
            sx={{
              "&.Mui-selected": { backgroundColor: "lightblue", color: "blue" },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Dashboard />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Aboutus />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AdminAccountsPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <UserAccountsPage />
      </CustomTabPanel>
    </Box>
  );
}
