import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

  TextField,

  Grid,

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
import { saveTournamentSportsDivision, saveTournamentSportsDivisionGroupAndTeams, saveTournamentSportsDivisionTeamsinGroup, updateTournament } from "src/services/tournamentRequest";

export const TournamentDetailsDialog = ({ open, handleClose, tournament, tournamentDetails }) => {
  // console.log(tournamentDetails);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();


  const [sportsList, setSportsList] = useState(null);

  const [step1, setStep1] = useState((true))
  const [tournamentSportsDivisionID, setTournamentSportsDivisionID] = useState(null)
  const [step2, setStep2] = useState((false))
  const [tournamentSportsDivisionGroupsTeams, setTournamentSportsDivisionGroupsTeams] = useState(null)
  const [step3, setStep3] = useState((false))

  const [groupsTeamsForTable, setGroupsTeamsForTable] = useState([]);
  const [groupsTeamsID, setGroupsTeamsID] = useState([]);

  const GroupTeams = {
    groupsTeamsForTable, setGroupsTeamsForTable, groupsTeamsID, setGroupsTeamsID
  }

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
      SportID: tournamentDetails?.TournamentInfo?.SportsID || '',
      MinPlayers: tournamentDetails?.TournamentInfo?.MinPlayers || '',
      MaxPlayers: tournamentDetails?.TournamentInfo?.MaxPlayers || '',
      InternationalPlayers: tournamentDetails?.TournamentInfo?.InternationalPlayer || '',
      NationalPlayers: tournamentDetails?.TournamentInfo?.NationalPlayer || '',
      LocalPlayers: tournamentDetails?.TournamentInfo?.LocalPlayer || '',
      AcademyPlayers: tournamentDetails?.TournamentInfo?.AcademyPlayer || '',
      DivisonDescription: tournamentDetails?.TournamentInfo?.DivisionName || '',
      Gender: tournamentDetails?.TournamentInfo?.Gender || '',
      NoOfTeams: tournamentDetails?.TournamentInfo?.NoOfTeams || '',
      //Create Group (Step 2)
      teamList: [],
      NoOfGroups: "",
    },

    validationSchema: Yup.object({
    }),

    onSubmit: async (data) => {
      console.log(data);
      setLoading(true);
      try {
        let finalData = {
          "ID": tournament.ID,
          "Tournament": data.Tournament,
          "Description": data.Description,
          "Address": data.Address,
          "City": data.City,
          "State": data.State,
          "Country": data.Country,
          "PinCode": data.Pincode,
          "ContactPerson": data.ContactPerson,
          "Phone": data.Phone,
          "EmailID": data.EmailID,
          "StartDate": data.StartDate,
          "EndDate": data.EndDate,
        }
        await updateTournament(finalData).then((resp) => {
          if (resp.status === "success") {
            enqueueSnackbar("Tournament Updated Succesfully", { variant: "success" });
            setLoading(false);
          }
          if (resp.status === "failed") {
            enqueueSnackbar("Tournament not updated", { variant: "failed" });
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });


  useEffect(() => {

    getAllSports({ searchpattern: "" }).then((res) => {
      setSportsList(res);
    });
  }, []);

  useEffect(() => {

    // FOR STEP3
    if(tournamentDetails?.GroupTeamData?.length > 0){
      
      let newTempMainIDArray = [], newTempArray = []
      let GroupTeamData = tournamentDetails?.GroupTeamData
      GroupTeamData.map((item)=>{
       let tempID = {
          GroupID : item.GroupID,
          TeamsID : item.TeamIDs
        }

        let tempName = {
          group : item.GroupName,
          teams : item.TeamNames
        }
        
        newTempMainIDArray.push(tempID)
        newTempArray.push(tempName)
      })
      setGroupsTeamsID(newTempMainIDArray);
      setGroupsTeamsForTable(newTempArray);
      setStep3(true)
    }else{
      
      setStep3(false)
    }
    
    
  }, [tournamentDetails?.GroupTeamData]);

  useEffect(() => {
    // for step 1
    if (tournamentDetails?.TournamentInfo?.TournamentSportsDivisionID !== undefined) {
      setStep2(true)
      setTournamentSportsDivisionID(tournamentDetails?.TournamentInfo?.TournamentSportsDivisionID)
    }
    else {
      setStep2(false)
      setTournamentSportsDivisionID(null)
    }
  }, [tournamentDetails?.TournamentInfo?.TournamentSportsDivisionID]);

  useEffect(() => {
    // for step 2
    if (tournamentDetails?.TSDGT?.TSDGroups?.length !== 0 && tournamentDetails?.TSDGT?.TSDTeams?.length !== 0 && tournamentDetails?.TSDGT?.TSDGroups !== undefined && tournamentDetails?.TSDGT?.TSDTeams !== undefined) {
      setTournamentSportsDivisionGroupsTeams(tournamentDetails?.TSDGT)
      
      setStep3(true)
    }
    else {
      
      setStep3(false)
      setTournamentSportsDivisionGroupsTeams(null)
    }
  }, [tournamentDetails]);

  const { teams, error, mutate } = useAllTeams();

  const handleStep1 = () => {
    const { DivisonDescription, Gender, MinPlayers, MaxPlayers, NoOfTeams,
      InternationalPlayers, NationalPlayers, LocalPlayers, AcademyPlayers, SportID } = formik.values

    try {
      saveTournamentSportsDivision({
        DivisonDescription, Gender, MinPlayers, MaxPlayers, NoOfTeams,
        InternationalPlayers, NationalPlayers, LocalPlayers, AcademyPlayers,
        SportID, TournamentID: tournament.ID
      })
        .then((res) => {
          setTournamentSportsDivisionID(res.result.TournamentSportsDivisionID)
          setStep2(true)
        })
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleStep2 = (TournamentSportsDivisionID) => {
    const { NoOfGroups, teamList } = formik.values
    try {
      saveTournamentSportsDivisionGroupAndTeams({
        TournamentSportsDivisionID, NoOfGroups, ClubTeamListID: teamList
      })
        .then((res) => {
          setTournamentSportsDivisionGroupsTeams(res.result)
          setStep3(true)

        })
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleStep3 = (GroupTeam) => {
    try {
      saveTournamentSportsDivisionTeamsinGroup({
        TournamentSportsDivisionID: tournamentSportsDivisionID,
        GroupTeams: GroupTeam
      })
        .then((res) => {
          if (res.status == "success") {
            enqueueSnackbar("Tournament Teams Saved Succesfully", { variant: "success" });
          }
          else {
            enqueueSnackbar("Something went wrong", { variant: "failed" });
          }
        })
      console.log(GroupTeam);
    }
    catch (error) {
      console.log(error);
    }
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



          <TournamentStep1
            formik={formik}
            sportsList={sportsList}
            handleStep1={handleStep1}
            step2={step2}
          />

          {step2 && <TournamentStep2
            teams={teams}
            formik={formik}
            handleStep2={handleStep2}
            tournamentSportsDivisionID={tournamentSportsDivisionID}
            step3={step3}
          />}

          {step3 && <TournamentStep3
            handleStep3={handleStep3}
            tournamentSportsDivisionGroupsTeams={tournamentSportsDivisionGroupsTeams}
            GroupTeams={GroupTeams}
          />}
        </Grid>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} >Cancel</Button>
        {/* <Button type="submit" variant="contained">Add</Button> */}
      </DialogActions>
      {/* </form> */}
    </Dialog >
  );
};
