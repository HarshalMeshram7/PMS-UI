import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Chip,
  Stack,
  Card,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBox from "src/components/common/loading-box";
import { useAllTeams } from "src/adapters/teamAdapter";
import { getAllSports } from "src/services/commonRequest";

export const TournamentDetailsDialog = ({ open, handleClose, tournament }) => {
  console.log(tournament);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();

  const [numberOfTeams, setNumberOfTeams] = useState([]);
  const [numberOfGroups, setNumberOfGroups] = useState([]);
  const [numberOfTeamsInGroup, setNumberOfTeamsInGroup] = useState([]);
  const [teamsFixed, setTeamsFixed] = useState(false);

  const [sportsList, setSportsList] = useState(null);

  const Venue = [
    {
      value: "Dubai",
      label: "Dubai"
    },
    {
      value: "Qatar",
      label: "Qatar"
    },
    {
      value: "Abu Dhabi",
      label: "Abu Dhabi"
    },
    {
      value: "Other",
      label: "Other"
    }
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Tournament: "",
      Description: "",
      Address: "",
      City: "",
      State: "",
      Country: "",
      Pincode: "",
      ContactPerson: "",
      Phone: "",
      EmailID: "",
      StartDate: "",
      EndDate: "",
      NOG: "",
      NOTIG: "",
      teamList: [],

      //Additional Details
      sportsList: [],
      MinPlayers: "",
      MaxPlayers: "",
      InternationalPlayers: "",
      NationalPlayers: "",
      LocalPlayers: "",
      AcademyPlayers: "",
      DivisionDescription: "",
      Gender: "",
      NoOfTeams: "",
    },

    validationSchema: Yup.object({
    }),

    onSubmit: async (data) => {
      console.log(data);
    },
  });

  const handleSelectTeam = (e) => {
    setNumberOfTeams(formik.values.teamList)
    setTeamsFixed(true)
    let groups = [];
    let teamsingroup = [];
    for (let i = 0; i < formik.values.NOG; i++) {
      groups.push(`Group${i + 1}`);
    }
    for (let i = 0; i < formik.values.NOTIG; i++) {
      teamsingroup.push(`Team${i + 1}`);
    }
    setNumberOfGroups(groups)
    setNumberOfTeamsInGroup(teamsingroup)
  }

  useEffect(() => {

    getAllSports({ searchpattern: "" }).then((res) => {
      setSportsList(res);
    });
  }, []);



  const { teams, error, mutate } = useAllTeams();


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
      {loading && <LoadingBox />}
      <DialogTitle>Tournament Fixtures</DialogTitle>
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
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Tournament && formik.errors.Tournament)}
              fullWidth
              helperText={formik.touched.Tournament && formik.errors.Tournament}
              label="Name of Tournament"
              margin="dense"
              name="Tournament"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Tournament}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Description && formik.errors.Description)}
              fullWidth
              helperText={formik.touched.Description && formik.errors.Description}
              label="Description"
              margin="dense"
              name="Description"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Description}
            />
          </Grid>

          {/* <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Address && formik.errors.Address)}
              fullWidth
              helperText={formik.touched.Address && formik.errors.Address}
              label="Address"
              margin="dense"
              name="Address"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Address}
            />
          </Grid> */}

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.City && formik.errors.City)}
              fullWidth
              helperText={formik.touched.City && formik.errors.City}
              label="City"
              margin="dense"
              name="City"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.City}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.State && formik.errors.State)}
              fullWidth
              helperText={formik.touched.State && formik.errors.State}
              label="State"
              margin="dense"
              name="State"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.State}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Country && formik.errors.Country)}
              fullWidth
              helperText={formik.touched.Country && formik.errors.Country}
              label="Country"
              margin="dense"
              name="Country"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Country}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Pincode && formik.errors.Pincode)}
              fullWidth
              helperText={formik.touched.Pincode && formik.errors.Pincode}
              label="Pincode"
              margin="dense"
              name="Pincode"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Pincode}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.ContactPerson && formik.errors.ContactPerson)}
              fullWidth
              helperText={formik.touched.ContactPerson && formik.errors.ContactPerson}
              label="ContactPerson"
              margin="dense"
              name="ContactPerson"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.ContactPerson}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.Phone && formik.errors.Phone)}
              fullWidth
              helperText={formik.touched.Phone && formik.errors.Phone}
              label="Phone"
              margin="dense"
              name="Phone"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.Phone}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.EmailID && formik.errors.EmailID)}
              fullWidth
              helperText={formik.touched.EmailID && formik.errors.EmailID}
              label="EmailID"
              margin="dense"
              name="EmailID"
              type="email"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.EmailID}
            />
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              color="inherit"
              variant="h5"
            >
              Organizing Tournament
            </Typography>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Venue</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formik.values.Venue}
                name="Venue"
                label="Venue"
                onChange={formik.handleChange}
              >
                {Venue?.map((option, key) => (
                  <MenuItem key={key}
                    value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.StartDate && formik.errors.StartDate)}
              fullWidth
              helperText={formik.touched.StartDate && formik.errors.StartDate}
              name="StartDate"
              label="Tournament Start Date"
              InputLabelProps={{ shrink: true }}
              margin="dense"
              onBlur={formik.handleBlur}
              value={formik.values.StartDate}
              onChange={formik.handleChange}
              type="date"
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.EndDate && formik.errors.EndDate)}
              fullWidth
              helperText={formik.touched.EndDate && formik.errors.EndDate}
              name="EndDate"
              label="Tournament End Date"
              InputLabelProps={{ shrink: true }}
              margin="dense"
              onBlur={formik.handleBlur}
              value={formik.values.EndDate}
              onChange={formik.handleChange}
              type="date"
              variant="outlined"
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Select teams for tournament</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formik.values.teamList}
                name="teamList"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiple
                label="Team List"
              >{teams?.map((item, key) => (
                <MenuItem key={key} value={item.name}>{item.name}</MenuItem>)
              )}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.NOG && formik.errors.NOG)}
              fullWidth
              helperText={formik.touched.NOG && formik.errors.NOG}
              label="Select Number of Groups"
              margin="dense"
              name="NOG"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.NOG}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.NOTIG && formik.errors.NOTIG)}
              fullWidth
              helperText={formik.touched.NOTIG && formik.errors.NOTIG}
              label="Select MAX Number of Teams in a Group"
              margin="dense"
              name="NOTIG"
              type="number"
              variant="outlined"
              value={formik.values.NOTIG}
              onChange={(e) => {
                if (formik.values.teamList.length > (formik.values.NOG * e.target.value)) {
                  formik.touched.NOTIG = true;
                  formik.errors.NOTIG = "Please choose greater number"
                } else {
                  formik.touched.NOTIG = false;
                  formik.errors.NOTIG = ""
                }
                formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <Button
              variant="contained"
              onClick={handleSelectTeam}
            >Next</Button>
          </Grid>
        </Grid>
        {/* creating teams chips */}
        <Grid
          container
          style={{ justifyContent: "center", marginTop: 10, marginBottom: 10 }}
        >
          <Stack direction="row" spacing={3}>
            {numberOfTeams?.map((totolteams, teamskey) => {
              return (
                <Chip onClick=
                  {() => alert(totolteams)}
                  label={totolteams} key={teamskey} />
              )
            })}
          </Stack>
        </Grid>

        {/* Creating Groups */}
        {teamsFixed &&
          <Grid
            container
            spacing={3}
          >
            {numberOfGroups.map((group, groupkey) => {
              return (
                <>
                  <Grid
                    item
                    md={3}
                    xs={12}
                  >
                    {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> */}
                    <Card variant="outlined">
                      <CardContent style={{ minHeight: 10 }}>
                        <List subheader={group} key={groupkey}>

                          {numberOfTeamsInGroup?.map((noOfteams, teamkey) => (
                            <>
                              <ListItem disablePadding key={teamkey} >
                                <ListItemButton>
                                  <ListItemText primary={noOfteams} />
                                </ListItemButton>
                              </ListItem>
                              < Divider />
                            </>
                          ))}

                        </List>
                      </CardContent>
                    </Card>
                    {/* </Box> */}
                  </Grid>
                </>
              )
            })}

          </Grid>
        }

        {/* *****************************************************************************/}

        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              color="inherit"
              variant="h5"
            >
              Additional Details
            </Typography>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Sports</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={formik.values.sportsList}
                label="Sports"
                name="sportsList"
                onChange={formik.handleChange}
                required
                multiple
              >
                {sportsList?.map((item, key) => (
                  <MenuItem key={key} value={item.ID}>
                    {item.Sports}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.MinPlayers && formik.errors.MinPlayers)}
              fullWidth
              helperText={formik.touched.MinPlayers && formik.errors.MinPlayers}
              label="Minimum Players"
              margin="dense"
              name="MinPlayers"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.MinPlayers}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.MaxPlayers && formik.errors.MaxPlayers)}
              fullWidth
              helperText={formik.touched.MaxPlayers && formik.errors.MaxPlayers}
              label="Maximum Players"
              margin="dense"
              name="MaxPlayers"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.MaxPlayers}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.InternationalPlayers && formik.errors.InternationalPlayers)}
              fullWidth
              helperText={formik.touched.InternationalPlayers && formik.errors.InternationalPlayers}
              label="International Players"
              margin="dense"
              name="InternationalPlayers"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.InternationalPlayers}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.NationalPlayers && formik.errors.NationalPlayers)}
              fullWidth
              helperText={formik.touched.NationalPlayers && formik.errors.NationalPlayers}
              label="National Players"
              margin="dense"
              name="NationalPlayers"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.NationalPlayers}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.LocalPlayers && formik.errors.LocalPlayers)}
              fullWidth
              helperText={formik.touched.LocalPlayers && formik.errors.LocalPlayers}
              label="Local Players"
              margin="dense"
              name="LocalPlayers"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.LocalPlayers}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.AcademyPlayers && formik.errors.AcademyPlayers)}
              fullWidth
              helperText={formik.touched.AcademyPlayers && formik.errors.AcademyPlayers}
              label="Academy Players"
              margin="dense"
              name="AcademyPlayers"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.AcademyPlayers}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.DivisionDescription && formik.errors.DivisionDescription)}
              fullWidth
              helperText={formik.touched.DivisionDescription && formik.errors.DivisionDescription}
              label="Division Description"
              margin="dense"
              name="DivisionDescription"
              type="text"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.DivisionDescription}
            />
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="Gender"
                label="Gender"
                onChange={(e) => { formik.handleChange(e) }}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <MenuItem value={0}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.NoOfTeams && formik.errors.NoOfTeams)}
              fullWidth
              helperText={formik.touched.NoOfTeams && formik.errors.NoOfTeams}
              label="Number Of Teams"
              margin="dense"
              name="NoOfTeams"
              type="number"
              variant="outlined"
              onChange={(e) => { formik.handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.NoOfTeams}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} >Cancel</Button>
        {/* <Button type="submit" variant="contained">Add</Button> */}
      </DialogActions>
      {/* </form> */}
    </Dialog>
  );
};
