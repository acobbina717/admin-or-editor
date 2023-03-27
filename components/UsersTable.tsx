import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { v4 as uuidv4 } from "uuid";
import { allowedRoles } from "./Permission";
import { useSession } from "next-auth/react";
import { usersData } from "@/prisma/usersData";
import { User } from "./LandingPage";

interface Column {
  id: "user" | "role";
  label?: string;
  width?: string;
  format?: (value: number) => string;
}

interface Data {
  user: string;
  role?: string;
}

function createData(user: string, role?: string): Data {
  if (!role) {
    return { user };
  }
  return { user, role };
}

const createRows = (user: User, roles: allowedRoles[]) => {
  if (user.roles.find((role) => roles.includes(role))) {
    const columns: Column[] = [
      { id: "user", label: "Users", width: "30%" },
      { id: "role", label: "Roles" },
    ];

    const rows = usersData.map((user) => {
      const userName = [user.firstName, user.lastName].join(" ");
      const rowData = createData(userName, String(user.roles));
      return rowData;
    });

    return { rows, columns };
  } else {
    const columns: Column[] = [{ id: "user", label: "Users", width: "30%" }];

    const rows = usersData.map((user) => {
      const userName = [user.firstName, user.lastName].join(" ");
      const rowData = createData(userName);
      return rowData;
    });

    return { rows, columns };
  }
};

export default function UsersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data } = useSession();
  const user = data?.user;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { columns, rows } = createRows(user as User, ["Admin"]);
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ minHeight: "80vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} size="medium" width={column.width}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={uuidv4()}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#E3F2FD !important",
                      },
                      "&:nth-of-type(even)": {
                        backgroundColor: "#FAFAFA",
                      },
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
