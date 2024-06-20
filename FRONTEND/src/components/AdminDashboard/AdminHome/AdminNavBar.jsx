import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminAccountsPage from "../../../pages/AdminDashboard/AdminHome/AdminAccounts/AdminAccountsPage";
import UserAccountsPage from "../../../pages/AdminDashboard/AdminHome/AdminAccounts/UserAccountsPage";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";

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
    <Box sx={{ width: "100vw" }}>
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
        <div className="cus-width">
          <Dashboard />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="cus-width">
          <Settings />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="cus-width">
          <AdminAccountsPage />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="cus-width">
          <UserAccountsPage />
        </div>
      </CustomTabPanel>
      <style>
        {`
        @media (min-width: 768px) {
  .cus-width {
    width:83%;
  }
        @media (max-width: 768px) {
  .cus-width {
    width:100%;
  }
        `}
      </style>
    </Box>
  );
}
