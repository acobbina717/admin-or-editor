import { Box, Card, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AuthNav from "../../components/auth/AuthNav";

const Auth = () => {
  return (
    <Box sx={{ minHeight: "100vh" }} display="flex" alignItems="center">
      <Container
        maxWidth={"xs"}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Card sx={{ width: 320, pt: 5 }}>
          <Stack alignItems={"center"}>
            <Box pb={2}>
              <Image
                src="/brand-logo.png"
                alt="brand-logo"
                width={50}
                height={50}
              />
            </Box>

            <Typography variant="h4" fontSize={24}>
              Chi University
            </Typography>
            <Typography
              variant="h6"
              fontSize={18}
              fontWeight={400}
              color={"#616161"}
            >
              Student Information System
            </Typography>
          </Stack>
          <Box sx={{ width: "100%" }}>
            <AuthNav />
          </Box>
        </Card>
      </Container>
    </Box>
  );
};
export default Auth;
