import { Box, styled, Tab } from "@mui/material";
import React from "react";
import AuthFrom from "./AuthFrom";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

interface StyledTabProps {
  label: string;
  value: string;
}

const AuthTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",

  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const AuthNav = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ bgcolor: "#fff" }}>
      <TabContext value={value}>
        <Box display="flex" justifyContent={"center"}>
          <TabList
            onChange={handleChange}
            aria-label="ant example"
            sx={{ borderBottom: 1, borderColor: "divider", width: "50%" }}
          >
            <AuthTab label="Log In" value={"1"} />
            <AuthTab label="Sign Up" value={"2"} />
          </TabList>
        </Box>

        <TabPanel value={"1"}>
          <AuthFrom mode="login" />
        </TabPanel>
        <TabPanel value={"2"}>
          <AuthFrom mode="signup" />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default AuthNav;
