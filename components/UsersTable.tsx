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

interface Column {
  id: "user" | "role";
  label: string;
  width?: string;
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "user", label: "Users", width: "30%" },
  { id: "role", label: "Role" },
];

interface Data {
  user: string;
  role: string;
}

function createData(user: string, role: string): Data {
  return { user, role };
}

const rows = [
  createData("Timmy Xie", "Editor"),
  createData("Jeremy Chu", "Editor"),
  createData("Huisheng Xie", "Admin"),
  createData("Yanru Zhao", "Admin"),
];

export default function UsersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
