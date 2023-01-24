import React, { useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  gettournamentSportDivisionByTournamentSportID,
  gettournamentSportsByTournamentID,
  saveTournamentSports,
  saveTournamentSportsDivisionNew,
} from "src/services/tournamentRequest";
import { useState } from "react";
import DescriptionTable from "../common/descriptionTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TournamentStep1({ formik, sportsList,  tournament ,sportsByTournament,getSportsByTournamentID,divisionsByTournamentSports,handleSportsChange }) {
  const [selectedSports, setSelectedSports] = useState("");
  

  const handleAddSports = () => {
    const {
      MinPlayers,
      MaxPlayers,
      InternationalPlayers,
      NationalPlayers,
      LocalPlayers,
      AcademyPlayers,
      SportID,
    } = formik.values;
    saveTournamentSports({
      MinPlayers,
      MaxPlayers,
      InternationalPlayers,
      NationalPlayers,
      LocalPlayers,
      AcademyPlayers,
      SportID,
      TournamentID: tournament.ID,
    }).then((res) => {
      console.log(res);
      getSportsByTournamentID();
    });
  };
  const handleAddDivision = () => {
    const {
      DivisonDescription,
      Gender,
      MinPlayers,
      MaxPlayers,
      NoOfTeams,
      InternationalPlayers,
      NationalPlayers,
      LocalPlayers,
      AcademyPlayers,
    } = formik.values;
    saveTournamentSportsDivisionNew({
      TournamentSportsID:selectedSports,
      DivisionDescription:DivisonDescription,
      Gender,
      MinPlayers,
      MaxPlayers,
      NoOfTeams,
      InternationalPlayer:InternationalPlayers,
      NationalPlayer:NationalPlayers,
      LocalPlayer:LocalPlayers,
      AcademyPlayer:AcademyPlayers,
    }).then((res)=>{
      handleSportsChange(selectedSports)
    })
  };

  const handleRemove = (item) => {
    console.log(item);
  };

  useEffect(() => {
    getSportsByTournamentID();
  }, [tournament]);

  return (
    <>
      {/* Typography */}
      <Grid item md={12} xs={12}>
        <Typography color="inherit" variant="h5">
          Sports Division (Step 1)
        </Typography>
      </Grid>

      {/* Sports List */}

      <Grid item md={12} xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Sports</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Sports</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.SportID}
                  label="Sports"
                  name="SportID"
                  onChange={formik.handleChange}
                  required
                >
                  {sportsList?.map((item, key) => (
                    <MenuItem key={key} value={item.ID}>
                      {item.Sports}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                error={Boolean(formik.touched.MinPlayers && formik.errors.MinPlayers)}
                fullWidth
                helperText={formik.touched.MinPlayers && formik.errors.MinPlayers}
                label="Minimum Players"
                margin="dense"
                name="MinPlayers"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.MinPlayers}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                error={Boolean(formik.touched.MaxPlayers && formik.errors.MaxPlayers)}
                fullWidth
                helperText={formik.touched.MaxPlayers && formik.errors.MaxPlayers}
                label="Maximum Players"
                margin="dense"
                name="MaxPlayers"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.MaxPlayers}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.InternationalPlayers && formik.errors.InternationalPlayers
                )}
                fullWidth
                helperText={
                  formik.touched.InternationalPlayers && formik.errors.InternationalPlayers
                }
                label="International Players"
                margin="dense"
                name="InternationalPlayers"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.InternationalPlayers}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                error={Boolean(formik.touched.NationalPlayers && formik.errors.NationalPlayers)}
                fullWidth
                helperText={formik.touched.NationalPlayers && formik.errors.NationalPlayers}
                label="National Players"
                margin="dense"
                name="NationalPlayers"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.NationalPlayers}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                error={Boolean(formik.touched.LocalPlayers && formik.errors.LocalPlayers)}
                fullWidth
                helperText={formik.touched.LocalPlayers && formik.errors.LocalPlayers}
                label="Local Players"
                margin="dense"
                name="LocalPlayers"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.LocalPlayers}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                error={Boolean(formik.touched.AcademyPlayers && formik.errors.AcademyPlayers)}
                fullWidth
                helperText={formik.touched.AcademyPlayers && formik.errors.AcademyPlayers}
                label="Academy Players"
                margin="dense"
                name="AcademyPlayers"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.AcademyPlayers}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Button type="submit" onClick={handleAddSports} variant="contained">
                Add Tournament Sports
              </Button>
            </Grid>

            {sportsByTournament && (
              <DescriptionTable
                array={sportsByTournament}
                title="Tournament Sports"
                handleRemove={handleRemove}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item md={12} xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Division</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Grid item md={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Select Sport</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select Sport"
            name="sportsByTournament"
            required
            onChange={(e) => {
              setSelectedSports(e.target.value);
              handleSportsChange(e.target.value);
            }}
          >
            {sportsByTournament?.map((item, key) => (
              <MenuItem key={key} value={item.ID}>
                {item.Description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.DivisonDescription && formik.errors.DivisonDescription)}
          fullWidth
          helperText={formik.touched.DivisonDescription && formik.errors.DivisonDescription}
          label="Division Description"
          margin="dense"
          name="DivisonDescription"
          type="text"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.DivisonDescription}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="Gender"
            label="Gender"
            onChange={(e) => {
              formik.handleChange(e);
            }}
          >
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
            <MenuItem value={0}>Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.NoOfTeams && formik.errors.NoOfTeams)}
          fullWidth
          helperText={formik.touched.NoOfTeams && formik.errors.NoOfTeams}
          label="Number Of Teams"
          margin="dense"
          name="NoOfTeams"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.NoOfTeams}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.MinPlayers && formik.errors.MinPlayers)}
          fullWidth
          helperText={formik.touched.MinPlayers && formik.errors.MinPlayers}
          label="Minimum Players"
          margin="dense"
          name="MinPlayers"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.MinPlayers}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.MaxPlayers && formik.errors.MaxPlayers)}
          fullWidth
          helperText={formik.touched.MaxPlayers && formik.errors.MaxPlayers}
          label="Maximum Players"
          margin="dense"
          name="MaxPlayers"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.MaxPlayers}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.InternationalPlayers && formik.errors.InternationalPlayers)}
          fullWidth
          helperText={formik.touched.InternationalPlayers && formik.errors.InternationalPlayers}
          label="International Players"
          margin="dense"
          name="InternationalPlayers"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.InternationalPlayers}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.NationalPlayers && formik.errors.NationalPlayers)}
          fullWidth
          helperText={formik.touched.NationalPlayers && formik.errors.NationalPlayers}
          label="National Players"
          margin="dense"
          name="NationalPlayers"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.NationalPlayers}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.LocalPlayers && formik.errors.LocalPlayers)}
          fullWidth
          helperText={formik.touched.LocalPlayers && formik.errors.LocalPlayers}
          label="Local Players"
          margin="dense"
          name="LocalPlayers"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.LocalPlayers}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(formik.touched.AcademyPlayers && formik.errors.AcademyPlayers)}
          fullWidth
          helperText={formik.touched.AcademyPlayers && formik.errors.AcademyPlayers}
          label="Academy Players"
          margin="dense"
          name="AcademyPlayers"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.AcademyPlayers}
        />
      </Grid>

      <Grid item md={12} xs={12}>
        <Button onClick={handleAddDivision} variant="contained">
          Add Division
        </Button>
      </Grid>

      {divisionsByTournamentSports && (
        <DescriptionTable
          array={divisionsByTournamentSports}
          title="Sports Division"
          handleRemove={handleRemove}
        />
      )}
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item md={12} xs={12}></Grid>

      <Grid item md={12} xs={12}></Grid>
    </>
  );
}
