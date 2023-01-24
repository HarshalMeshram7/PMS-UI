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



export const ReportsListResults = ({ reports, handleOpenReportDetails, ...rest }) => {
  const [selectedReportIds, setSelectedReportIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedReportIds;

    if (event.target.checked) {
      newSelectedReportIds = reports.map((customer) => customer.id);
    } else {
      newSelectedReportIds = [];
    }

    setSelectedReportIds(newSelectedReportIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedReportIds.indexOf(id);
    let newSelectedReportIds = [];

    if (selectedIndex === -1) {
      newSelectedReportIds = newSelectedReportIds.concat(selectedReportIds, id);
    } else if (selectedIndex === 0) {
      newSelectedReportIds = newSelectedReportIds.concat(selectedReportIds.slice(1));
    } else if (selectedIndex === selectedReportIds.length - 1) {
      newSelectedReportIds = newSelectedReportIds.concat(selectedReportIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedReportIds = newSelectedReportIds.concat(
        selectedReportIds.slice(0, selectedIndex),
        selectedReportIds.slice(selectedIndex + 1)
      );
    }

    setSelectedReportIds(newSelectedReportIds);
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
                    checked={selectedReportIds.length === reports.length}
                    color="primary"
                    indeterminate={
                      selectedReportIds.length > 0
                      && selectedReportIds.length < reports.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Name
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
              {reports.slice(0, limit).map((player, key) => (
                <TableRow
                 onClick = {handleOpenReportDetails}
                  hover
                  style={{cursor:"pointer"}}
                  key={key}
                  selected={selectedReportIds.indexOf(player.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedReportIds.indexOf(player.id) !== -1}
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
        count={reports.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ReportsListResults.propTypes = {
  reports: PropTypes.array.isRequired
};
