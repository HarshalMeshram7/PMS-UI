import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Divider,

} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBox from "src/components/common/loading-box";
import { DateTimePicker } from "@mui/lab";
import {
  gettournamentSportsByTournamentID, gettournamentSportDivisionByTournamentSportID,
  gettournamentGroupsandteamsBySportDivisionID,
  getGroupTeamsByGroupID,
  getMatchesByTournamentID,
  deleteTournamentMatch
} from 'src/services/tournamentRequest';
import MatchTable from './match-table';
import DeleteDialog from '../common/deleteDialog';

const Result = [
  {
    ID: 1,
    Description: 'Draw  Hard'
  },
  {
    ID: 2,
    Description: 'Team Hard 1'
  },
  {
    ID: 3,
    Description: 'Team Hard 2'
  },
  {
    ID: 4,
    Description: 'No result Hard'
  },
];

const Stadium = [
  {
    ID: 1,
    Description: 'Stadium Hard 1'
  },
  {
    ID: 2,
    Description: 'Stadium Hard 2'
  },
  {
    ID: 3,
    Description: 'Stadium Hard 3'
  },
];


export const TournamentFixturesDialog = ({ open, handleClose, tournament }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      GroupHard: '',
      Team1: '',
      Team2: '',
      Duration: '',
      Result: '',
      Stadium: '',
    },
    validationSchema: Yup.object({
    }),
  });

  const [value, setValue] = React.useState(('2014-08-18T21:11:54'));
  const [sportList, setSportList] = useState([]);
  const [sportDivision, setSportDivision] = useState([]);
  const [sportGroups, setSportGroups] = useState([]);
  const [groupTeams, setGroupTeams] = useState([]);
  const [Matches, setMatches] = useState([]);
  const [match, setMatch] = useState({});
  const [deleteDialogue, setDeleteDialogue] = useState(false);


  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const getMatchesByID = ()=>{
    getMatchesByTournamentID({ ID: tournament?.ID }).then((res)=>{
      setMatches(res)
    })
  }

  useEffect(() => {
    gettournamentSportsByTournamentID({ ID: tournament?.ID }).then((res) => {
      setSportList(res)
    })
    getMatchesByID()
  }, [tournament])


  const handleSportsChange = (SportsID) => {
    gettournamentSportDivisionByTournamentSportID({ ID: SportsID }).then((res) => {
      setSportDivision(res)
    })
  }

  const handleDivisionChange = (DivisioID) => {
    gettournamentGroupsandteamsBySportDivisionID({ ID: DivisioID }).then((res) => {
      setSportGroups(res.TSDGroups)
    })
  }

  const handleGroupChange = (GroupID) => {
    getGroupTeamsByGroupID({ ID: GroupID }).then((res) => {
      setGroupTeams(res)
    })
  }
 const handleOpenDeleteDialogue = (match)=>{
  console.log("Will Be Deleted Later",match)
  setMatch(match)
  setDeleteDialogue(true)
 }
 const handleCloseDeleteDialogue = ()=> setDeleteDialogue(false)

 const handleDelete =(ID)=>{
  deleteTournamentMatch(ID).then((res)=>{
      console.log(res)
      handleClose()
  })
 }

  return (

    <Dialog
      open={open}
      onClose={!loading && handleClose}
      fullWidth
      maxWidth="lg"
      BackdropProps={{
        style: { backgroundColor: "#121212dd", },
      }}
    >
      <DeleteDialog 
      open={deleteDialogue}
      handleClose={handleCloseDeleteDialogue}
      handleDelete={handleDelete}
      ID={match.ID}
      name={`${match.Team1} vs ${match.Team2}`}
      
      />
      {loading && <LoadingBox />}
      <DialogTitle>Tournament Fixtures for {tournament?.name}</DialogTitle>
      <DialogContent style={{ height: '600px' }}>
        <DialogContentText sx={{ marginBottom: 2 }}>
          {/* Enter the required basic details of the Administrative Template below. */}
        </DialogContentText>
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            md={4}
            xs={12}>
            <FormControl fullWidth>
              <InputLabel id="SportsList">Sports List</InputLabel>
              <Select
                name="SportsList"
                label="SportsList"
                onChange={(e, value) => {
                  handleSportsChange(e.target.value)
                }}
              >
                {sportList?.map((item, key) => (
                  <MenuItem key={key} value={item.ID}>
                    {item.Description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <FormControl fullWidth>
              <InputLabel id="SportsDivision">Sports Division</InputLabel>
              <Select
                name="SportsDivision"
                label="SportsDivision"
                onChange={(e, value) => {
                  handleDivisionChange(e.target.value)
                }}
              >
                {sportDivision?.map((item, key) => (
                  <MenuItem key={key} value={item.ID}>
                    {item.Description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <FormControl fullWidth>
              <InputLabel id="Groups">Groups</InputLabel>
              <Select
                name="Groups"
                label="Groups"
                onChange={(e, value) => {
                  handleGroupChange(e.target.value)
                }}
              >
                {sportGroups?.map((item, key) => (
                  <MenuItem key={key} value={item.ID}>
                    {item.Description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <FormControl fullWidth>
              <InputLabel id="Team1">Team 1</InputLabel>
              <Select
                name="Team1"
                label="Team1"
                value={formik.values.Team1}
                onChange={(e, value) => {
                  { formik.handleChange(e) }
                }}
              >
                {groupTeams?.map((item, key) => (
                  <MenuItem key={key} value={item.ID}>
                    {item.Description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <FormControl fullWidth>
              <InputLabel id="Team1">Team 2</InputLabel>
              <Select
                name="Team2"
                label="Team2"
                value={formik.values.Team2}
                onChange={(e, value) => {
                  { formik.handleChange(e) }
                }}
              >
                {groupTeams?.map((item, key) => (
                  <MenuItem key={key} value={item.ID}>
                    {item.Description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <DateTimePicker
              fullWidth
              label="Match Date and Time"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={Stadium || []}
              getOptionLabel={(option) => option.Description}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Stadium"
                  placeholder="Select Stadium"
                />
              )}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Duration && formik.errors.Duration)}
              fullWidth
              helperText={formik.touched.Duration && formik.errors.Duration}
              label="Duration"
              margin="dense"
              name="Duration"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Duration}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={Result || []}
              getOptionLabel={(option) => option.Description}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Result"
                  placeholder="Result"
                />
              )}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <Button
              type="submit"
              variant="contained">Save
            </Button>
          </Grid>

         {(Matches?.length> 0) && <MatchTable
            array={Matches}
            handleRemove={handleOpenDeleteDialogue}
          />}

        </Grid>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} >Cancel</Button>
      </DialogActions>
      {/* </form> */}
    </Dialog >
  );
};
