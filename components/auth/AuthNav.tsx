import { Box } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import AuthFrom from "./AuthFrom";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { AuthTab } from "./AuthTab";

const AuthNav = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
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
