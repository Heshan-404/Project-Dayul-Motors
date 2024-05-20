import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomizedBreadcrumbs(props) {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {" "}
      {/* Container with width */}
      <div
        role="presentation"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ display: 'flex' }} // Apply flexbox styling
        >
          <StyledBreadcrumb
            component={Link}
            to="/Home"
            label="HOME"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component={Link} 
            to="/Shop"      
            label="ALL PRODUCTS" 
          />
          <StyledBreadcrumb
            label={props.cat}
            style={{ color: "red" }}
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>
    </div>
  );
}