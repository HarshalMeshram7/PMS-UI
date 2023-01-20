import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

export default function TournamentStep2({ formik, teams, handleStep2, step3,sportsByTournament,divisionsByTournamentSports,handleSportsChange }) {
const  [selectedSportsDivision, setSelectedSportsDivision] = useState("");

  return (
    <>
      <Grid item md={12} xs={12}>
        <Typography color="inherit" variant="h5">
          Create Groups (Step 2)
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Select Sport</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select Sport"
            name="sportsByTournament"
            required
            onChange={(e) => {
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
      <Grid item md={6} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Select Division</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select Division"
            name="DivisionBySports"
            required
            onChange={(e) => {
                setSelectedSportsDivision(e.target.value);
            }}
          >
            {divisionsByTournamentSports?.map((item, key) => (
              <MenuItem key={key} value={item.ID}>
                {item.Description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>


      <Grid item md={6} xs={12}>
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
            label="Select teams for tournament"
          >
            {teams?.map((item, key) => (
              <MenuItem key={key} value={item.ID}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item md={6} xs={12}>
        <TextField
          error={Boolean(formik.touched.NoOfGroups && formik.errors.NoOfGroups)}
          fullWidth
          helperText={formik.touched.NoOfGroups && formik.errors.NoOfGroups}
          label="Select Number of Groups"
          margin="dense"
          name="NoOfGroups"
          type="number"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.NoOfGroups}
        />
      </Grid>

      <Grid item md={12} xs={12}>
        <Button
          disabled={step3}
          onClick={() => {
            handleStep2(selectedSportsDivision);
          }}
          variant="contained"
        >
          Next (Step 2)
        </Button>
      </Grid>

      <Grid item md={12} xs={12}></Grid>

      <Grid item md={12} xs={12}></Grid>
    </>
  );
}
