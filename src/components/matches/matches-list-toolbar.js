import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
  FormControl,
  InputLabel,
  Select, MenuItem, Grid, Autocomplete,
  IconButton
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useEffect, useState } from 'react';
import { Close, Groups } from "@mui/icons-material";

const Tournaments = [
  { label: 'Hard Tournament 1', year: 1994 },
  { label: 'Hard Tournament 2', year: 1972 },
  { label: 'Hard Tournament 3', year: 1974 },
];
const Sports = [
  { label: 'Hard Sports 1 ', year: 1994 },
  { label: 'Hard Sports 2', year: 1972 },
  { label: 'Hard Sports 3', year: 1974 },
];
const Teams = [
  { label: 'Teams 1', year: 1994 },
  { label: 'Teams 2', year: 1972 },
  { label: 'Teams 3', year: 1974 },
];
const Players = [
  { label: 'Hard Division 1', year: 1994 },
  { label: 'Hard Division 2', year: 1972 },
  { label: 'Hard Division 3', year: 1974 },
];
const Division = [
  { label: 'Hard Division 1', year: 1994 },
  { label: 'Hard Division 2', year: 1972 },
  { label: 'Hard Division 3', year: 1974 },
];
const Group = [
  { label: 'Hard Group 1', year: 1994 },
  { label: 'Hard Group 2', year: 1972 },
  { label: 'Hard Group 3', year: 1974 },
];
const Stadiums = [
  { label: 'Hard Stadiums 1', year: 1994 },
  { label: 'Hard Stadiums 2', year: 1972 },
  { label: 'Hard Stadiums 3', year: 1974 },
];
const Results = [
  { label: 'Hard Results 1', year: 1994 },
  { label: 'Hard Results 2', year: 1972 },
  { label: 'Hard Results 3', year: 1974 },
];



export const MatchesListToolbar = (props) => {
  const [searchText, setSearchText] = useState("");

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (props.params?.search) {
      setSearchText(props.params?.search);
    }
  }, [props.params?.search]);

  const handleClear = () => {
    setSearchText("");
    props.search && props.search("");
  };

  const handleSubmitSearch = () => {
    if (searchText.length > 0) {
      props.search && props.search(searchText);
    } else {
      props.search && props.search("");
    }
  };


  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Matches
        </Typography>
        <Box sx={{ m: 1 }}>
          {/* <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button> */}
          <Button
            color="primary"
            variant="contained"
            onClick={props.handleOpenAddPlayer}
          >
            Add Matches
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>

            <Grid container spacing={3}>

              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Tournaments}
                  sx={{ width: 300 }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Tournamnets"
                      placeholder="Select Tournaments"
                    />}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Sports}
                  sx={{ width: 300 }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Sports"
                      placeholder="Select Sports"
                    />}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Teams}
                  sx={{ width: 300 }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Teams"
                      placeholder="Select Teams"
                    />}
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={Players}
                  sx={{ width: 300 }}
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      label="Players"
                      placeholder="Select Players"
                    />}
                />
              </Grid>

              <Grid item md={12} xs={12}  >

                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography><h4>More Filters</h4></Typography>
                    </AccordionSummary>

                    <Grid container spacing={3}>

                      <Grid item md={3} xs={12}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={Division}
                          sx={{ width: 300, padding: 1 }}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              label="Division"
                              placeholder="Select Division"
                            />}
                        />
                      </Grid>

                      <Grid item md={3} xs={12}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={Group}
                          sx={{ width: 300, padding: 1 }}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              label="Groups"
                              placeholder="Select Groups"
                            />}
                        />
                      </Grid>

                      <Grid item md={3} xs={12}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={Stadiums}
                          sx={{ width: 300, padding: 1 }}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              label="Stadiums"
                              placeholder="Select Stadiums"
                            />}
                        />
                      </Grid>

                      <Grid item md={3} xs={12}>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={Results}
                          sx={{ width: 300, padding: 1 }}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              label="Results"
                              placeholder="Select Results"
                            />}
                        />
                      </Grid>
                    </Grid>
                  </Accordion>

                  <Button>Search</Button>

                </div>
              </Grid>

            </Grid>

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
