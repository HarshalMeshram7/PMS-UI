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
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';



export const AdministrativeListResults = ({ administrative,handleOpenAdministrativeDetails, ...rest }) => {
  const [selectedContractIds, setSelectedContractIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  const handleSelectAll = (event) => {
    let newSelectedContractIds;

    if (event.target.checked) {
      newSelectedContractIds = administrative.map((customer) => customer.id);
    } else {
      newSelectedContractIds = [];
    }

    setSelectedContractIds(newSelectedContractIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedContractIds.indexOf(id);
    let newSelectedContractIds = [];

    if (selectedIndex === -1) {
      newSelectedContractIds = newSelectedContractIds.concat(selectedContractIds, id);
    } else if (selectedIndex === 0) {
      newSelectedContractIds = newSelectedContractIds.concat(selectedContractIds.slice(1));
    } else if (selectedIndex === selectedContractIds.length - 1) {
      newSelectedContractIds = newSelectedContractIds.concat(selectedContractIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedContractIds = newSelectedContractIds.concat(
        selectedContractIds.slice(0, selectedIndex),
        selectedContractIds.slice(selectedIndex + 1)
      );
    }

    setSelectedContractIds(newSelectedContractIds);
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
                    checked={selectedContractIds.length === administrative.length}
                    color="primary"
                    indeterminate={
                      selectedContractIds.length > 0
                      && selectedContractIds.length < administrative.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Names
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {administrative.slice(0, limit).map((player, key) => (
                <TableRow
                 onClick = {handleOpenAdministrativeDetails}
                  hover
                  style={{cursor:"pointer"}}
                  key={key}
                  selected={selectedContractIds.indexOf(player.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedContractIds.indexOf(player.id) !== -1}
                      onChange={(event) => handleSelectOne(event, player.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={player.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(player.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {player.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {player.email}
                  </TableCell>
                  <TableCell>
                    {`${player.address.city}, ${player.address.state}, ${player.address.country}`}
                  </TableCell>
                  <TableCell>
                    {player.phone}
                  </TableCell>
                  <TableCell>
                    {format(player.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={administrative.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AdministrativeListResults.propTypes = {
  administrative: PropTypes.array.isRequired
};
