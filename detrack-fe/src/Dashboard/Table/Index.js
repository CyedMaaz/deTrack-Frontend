import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import MoreIcon from "@mui/icons-material/MoreVert";
import "./index.css";
import FilterModal from "../Modal/Modal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#464C63",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&.active-user": {
    "& $moreIcon": {
      display: "block",
      width: "auto",
    },
  },
}));

const MoreIconWrapper = styled("div")({
  // display: "none", // Hide initially
  marginLeft: "-29px",
  marginTop: "1rem"

});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function CustomizedTables() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  console.log("🚀 ~ CustomizedTables ~ isModalOpen:", isModalOpen);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const applyFilter = (filterOptions) => {
    console.log("Filter Applied:", filterOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://de-track-9hkuumg4t-shahirs-projects.vercel.app/resource"
        );
        const data = await response.json();
        setUsers(data);
        setTotalRows(data.length);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Implement cleanup logic if needed
    };
  }, []);

  const handleMoreIconClick = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const filteredRows = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.mobileNumber}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <span className="route-text"> Dashboard > Users </span>
      <div className="user-header">
        <span className="user-text">Users</span>
        <button className="add-new" type="submit" onClick={openModal}>
          ADD NEW
        </button>
      </div>
      <div className="table-container">
        <div className="search-container">
          <div className="search-header">
            <Search className="searchbox">
              <SearchIconWrapper>
                <SearchIcon
                  style={{
                    paddingBottom: "1px",
                    color: "rgb(133 138 142)",
                  }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Search>
            <div className="count-container">
              <span className="count-page">
                {`${(page - 1) * rowsPerPage + 1} - ${Math.min(
                  page * rowsPerPage,
                  totalRows
                )} of ${totalRows}`}
                <LeftCircleOutlined className="arrow-icon" />
                <RightCircleOutlined className="arrow-icon" />
              </span>
            </div>
          </div>
          <FilterModal
            open={isModalOpen}
            onClose={closeModal}
            onApply={applyFilter}
          />
          <TableContainer className="table-container" component={Paper}>
            <Table sx={{ minWidth: 620 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>User Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Contact Number</StyledTableCell>
                  <StyledTableCell>Registration Date</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell component="th" scope="row">
                      {`${user.firstName} ${user.lastName}`}
                    </StyledTableCell>
                    <StyledTableCell>{user.email}</StyledTableCell>
                    <StyledTableCell>{user.mobileNumber}</StyledTableCell>
                    <StyledTableCell>{user.registrationDate}</StyledTableCell>
                    <StyledTableCell>
                      {user.status ? "Active" : "Inactive"}
                    </StyledTableCell>
                    <MoreIconWrapper className="moreIcon">
                      <MoreIcon onClick={() => handleMoreIconClick(user)} />
                    </MoreIconWrapper>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default CustomizedTables;
