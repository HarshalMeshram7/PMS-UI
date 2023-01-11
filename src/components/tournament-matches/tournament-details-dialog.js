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
import TournamentStep1 from "./tournament-step1";
import TournamentStep2 from "./tournament-step2";
import TournamentStep3 from "./tournament-step3";
import { saveTournamentSportsDivision } from "src/services/tournamentRequest";

export const TournamentDetailsDialog = ({ open, handleClose, tournament }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();

  const [numberOfTeams, setNumberOfTeams] = useState([]);
  const [numberOfGroups, setNumberOfGroups] = useState([]);
  const [numberOfTeamsInGroup, setNumberOfTeamsInGroup] = useState([]);
  const [teamsFixed, setTeamsFixed] = useState(false);
  const [sportsList, setSportsList] = useState(null);

  const [step1, setStep1] = useState((true))
  const [tournamentSportsDivision, setTournamentSportsDivision] = useState(null)
  const [step2, setStep2] = useState((false))
  const [step3, setStep3] = useState((false))

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // Add Tournament same fields
      Tournament: tournament?.name || "",
      Description: tournament?.Description || "",
      Address: "",
      City: tournament?.City || "",
      State: "",
      Country: "",
      Pincode: "",
      ContactPerson: "",
      Phone: "",
      EmailID: "",
      StartDate: tournament?.StartDate || "",
      EndDate: tournament?.EndDate || "",
      //Sports Division (Step 1)
      SportID: "",
      MinPlayers: "",
      MaxPlayers: "",
      InternationalPlayers: "",
      NationalPlayers: "",
      LocalPlayers: "",
      AcademyPlayers: "",
      DivisonDescription: "",
      Gender: "",
      NoOfTeams: "",
      //Create Group (Step 2)
      teamList: [],
      NOG: "",
      NOTIG: "",
      // Add Teams (Step 3)
      AvailableGroup: "",
      AvailableGroupTeams: [],
    },

    validationSchema: Yup.object({
    }),

    onSubmit: async (data) => {
      console.log(data);
    },
  });

  useEffect(() => {

    getAllSports({ searchpattern: "" }).then((res) => {
      setSportsList(res);
    });
  }, []);

  const { teams, error, mutate } = useAllTeams();

  const handleStep1 = () => {
    const { DivisonDescription, Gender, MinPlayers, MaxPlayers, NoOfTeams,
      InternationalPlayers, NationalPlayers, LocalPlayers, AcademyPlayers, SportID } = formik.values

    saveTournamentSportsDivision({
      DivisonDescription, Gender, MinPlayers, MaxPlayers, NoOfTeams,
      InternationalPlayers, NationalPlayers, LocalPlayers, AcademyPlayers,
      SportID, TournamentID: tournament.ID
    })
      .then((res) => {
        setTournamentSportsDivision(res.result)
        setStep2(true)
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

          <Grid
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
          </Grid>

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
            md={4}
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
            md={4}
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
            md={12}
            xs={12}
          >
            <Button type="submit" onClick={formik.handleSubmit} variant="contained">Update</Button>
          </Grid>

        </Grid>

        <TournamentStep1
          formik={formik}
          sportsList={sportsList}
          handleStep1={handleStep1}
        />

        {/* creating teams chips */}
        {/* <Grid
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
        </Grid> */}

        {/* Creating Groups */}
        {teamsFixed && false &&
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

        {/* START 22222222222222222222222222222222222222222222222222222222222222222222222222222 */}

        {step2 && <TournamentStep2
          teams={teams}
          formik={formik}
        />}

        {/* <Grid
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
              Create Groups (Step 2)
            </Typography>
          </Grid>

          <Grid
            item
            md={4}
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
            md={4}
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
            md={4}
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
            md={12}
            xs={12}
          >
            <Button type="submit" onClick={handleSelectTeam} variant="contained">Next (Step 2)</Button>
          </Grid>
        </Grid> */}
        {/* END 22222222222222222222222222222222222222222222222222222222222222222222222222222 */}




        {/* START 33333333333333333333333333333333333333333333333333333333333333333333333333333333 */}
        {step3 && <TournamentStep3
          formik={formik}
        />}

        {/* <Grid
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
              Add Teams (Step 3)
            </Typography>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Available Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="AvailableGroup"
                label="Available Group"
                onChange={(e) => { formik.handleChange(e) }}
              >
                <MenuItem value={1}>Hard code Group 1</MenuItem>
                <MenuItem value={2}>Hard code Group 2</MenuItem>
                <MenuItem value={0}>Hard code Group 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Available Teams</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={formik.values.AvailableGroupTeams}
                name="AvailableGroupTeams"
                label="Available Teams"
                onChange={(e) => { formik.handleChange(e) }}
              >
                <MenuItem value={1}>Hard code team 1</MenuItem>
                <MenuItem value={2}>Hard code team 2</MenuItem>
                <MenuItem value={0}>Hard code team 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
          >
            <Button type="submit" onClick={handleSelectTeam} variant="contained">Next (Step 3)</Button>
          </Grid>

        </Grid> */}
        {/* END 33333333333333333333333333333333333333333333333333333333333333333333333333333333 */}

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} >Cancel</Button>
        {/* <Button type="submit" variant="contained">Add</Button> */}
      </DialogActions>
      {/* </form> */}
    </Dialog >
  );
};
