import ColumnGroupingTable from "@/components/UsersTable";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  image: string | null;
  roles: [];
}

const Page = () => {
  const { data: session, status } = useSession();

  const user = session?.user as User;

  if (status === "loading" || !user) {
    return <div>Loading</div>;
  }

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <Box height="100vh" padding={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontSize={24}>
          {` Welcome, ${user.firstName}.`}
        </Typography>
        <Typography
          fontSize={16}
          color={"#1565C0"}
          component={Link}
          href="/"
          sx={{ textDecoration: "none" }}
          onClick={handleSignOut}
        >
          Logout
        </Typography>
      </Stack>
      <Box pt={2} pb={2}>
        <ColumnGroupingTable />
      </Box>
    </Box>
  );
};

export default Page;
