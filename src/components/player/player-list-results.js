import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  Button,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';



export const PlayerListResults = ({ players, handleOpenPlayerDetails, handleOpenDeleteDialogue,  ...rest }) => {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedPlayerIds;

    if (event.target.checked) {
      newSelectedPlayerIds = players.map((customer) => customer.id);
    } else {
      newSelectedPlayerIds = [];
    }

    setSelectedPlayerIds(newSelectedPlayerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPlayerIds.indexOf(id);
    let newSelectedPlayerIds = [];

    if (selectedIndex === -1) {
      newSelectedPlayerIds = newSelectedPlayerIds.concat(selectedPlayerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPlayerIds = newSelectedPlayerIds.concat(selectedPlayerIds.slice(1));
    } else if (selectedIndex === selectedPlayerIds.length - 1) {
      newSelectedPlayerIds = newSelectedPlayerIds.concat(selectedPlayerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPlayerIds = newSelectedPlayerIds.concat(
        selectedPlayerIds.slice(0, selectedIndex),
        selectedPlayerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedPlayerIds(newSelectedPlayerIds);
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
          {players && <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPlayerIds.length === players.length}
                    color="primary"
                    indeterminate={
                      selectedPlayerIds.length > 0
                      && selectedPlayerIds.length < players.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Full Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players && players?.slice(0, limit).map((players, key) => (
                <TableRow
                  hover
                  style={{ cursor: "pointer" }}
                  key={key}
                  selected={selectedPlayerIds.indexOf(players.id) !== -1}
                >

                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPlayerIds.indexOf(player.id) !== -1}
                      onChange={(event) => handleSelectOne(event, player.id)}
                      value="true"
                    />
                  </TableCell> */}

                  <TableCell
                  onClick={()=>handleOpenPlayerDetails(players)}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={players.Photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(players.FullName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {players.FullName}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell onClick={()=>handleOpenPlayerDetails(players)}                  >
                    {players.Email}
                  </TableCell>

                  <TableCell onClick={()=>handleOpenPlayerDetails(players)}
                  >
                    {players.ContactNo}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        handleOpenDeleteDialogue(players);
                      }}
                    >
                      X
                    </Button>
                  </TableCell>

                  {/* <TableCell>
                    {`${player.address.city}, ${player.address.state}, ${player.address.country}`}
                  </TableCell> */}

                  {/* <TableCell>
                    {format(player.createdAt, 'dd/MM/yyyy')}
                  </TableCell> */}
                </TableRow>

              ))}
            </TableBody>
          </Table>}
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={players.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

PlayerListResults.propTypes = {
  players: PropTypes.array.isRequired
};
