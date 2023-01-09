import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";

export const UserAccessListResults = ({ userAccess, handleOpenUserAccessDetails,handleOpenDeleteDialogue, ...rest }) => {
  const [selectedUserAccessIds, setSelectedUserAccessIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedUserAccessIds;

    if (event.target.checked) {
      newSelectedUserAccessIds = userAccess.map((customer) => customer.id);
    } else {
      newSelectedUserAccessIds = [];
    }

    setSelectedUserAccessIds(newSelectedUserAccessIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUserAccessIds.indexOf(id);
    let newSelectedUserAccessIds = [];

    if (selectedIndex === -1) {
      newSelectedUserAccessIds = newSelectedUserAccessIds.concat(selectedUserAccessIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUserAccessIds = newSelectedUserAccessIds.concat(selectedUserAccessIds.slice(1));
    } else if (selectedIndex === selectedUserAccessIds.length - 1) {
      newSelectedUserAccessIds = newSelectedUserAccessIds.concat(
        selectedUserAccessIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedUserAccessIds = newSelectedUserAccessIds.concat(
        selectedUserAccessIds.slice(0, selectedIndex),
        selectedUserAccessIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUserAccessIds(newSelectedUserAccessIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUserAccessIds.length === userAccess.length}
                    color="primary"
                    indeterminate={
                      selectedUserAccessIds.length > 0
                      && selectedUserAccessIds.length < userAccess.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Full name</TableCell>
                <TableCell>User name</TableCell>
                {/* <TableCell>
                Password
                </TableCell> */}
                {/* <TableCell>
                  Address
                </TableCell> */}
                <TableCell>Email</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Action</TableCell>
                {/* <TableCell>
                  UserRole
                </TableCell>
                <TableCell>
                  Access
                </TableCell>
                <TableCell>
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {userAccess?.slice(0, limit).map((users) => (
                <TableRow
                  // style={{cursor:"pointer"}}
                  // onClick={()=>{
                  //   handleOpenUserAccessDetails(users)
                  // }}
                  hover
                  key={users.ID}
                  // selected={selectedUserAccessIds.indexOf(users.ID) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUserAccessIds.indexOf(users.id) !== -1}
                      onChange={(event) => handleSelectOne(event, users.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenUserAccessDetails(users);
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={users.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(users.FullName)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {users.FullName}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenUserAccessDetails(users);
                    }}
                  >
                    {users.UserName}
                  </TableCell>

                  {/* <TableCell>
                    {users.password}
                  </TableCell> */}

                  {/* <TableCell>
                    {`${users.address.street}, ${users.address.city}`}
                  </TableCell> */}

                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenUserAccessDetails(users);
                    }}
                  >
                    {users.EMail}
                  </TableCell>

                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenUserAccessDetails(users);
                    }}
                  >
                    {users.MobileNo}
                  </TableCell>
                  <TableCell>
              {(users.UserName !== "SuperAdmin") && <Button
                      onClick={() => {
                        handleOpenDeleteDialogue(users);
                      }}
                    >
                      X
                    </Button>}
                  </TableCell>

                  {/* <TableCell>
                    {users.userRole}
                  </TableCell>

                  <TableCell>
                    {users.userAccess}
                  </TableCell>

                  <TableCell>
                    {users.action}
                  </TableCell> */}

                  {/* <TableCell>
                    {format(users.createdAt, 'dd/MM/yyyy')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={userAccess.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

UserAccessListResults.propTypes = {
  userAccess: PropTypes.array.isRequired,
};
