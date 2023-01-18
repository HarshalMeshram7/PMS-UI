import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Autocomplete,
  TextField,

} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBox from "src/components/common/loading-box";
import { DateTimePicker } from "@mui/lab";

const GroupHard = [
  {
    ID: 1,
    Description: 'Group Hard 1'
  },
  {
    ID: 2,
    Description: 'Group Hard 2'
  },
  {
    ID: 3,
    Description: 'Group Hard 3'
  },
];

const TeamHard1 = [
  {
    ID: 1,
    Description: 'Team Hard 1'
  },
  {
    ID: 2,
    Description: 'Team Hard 2'
  },
  {
    ID: 3,
    Description: 'Team Hard 3'
  },
];

const TeamHard2 = [
  {
    ID: 1,
    Description: 'Team Hard 1'
  },
  {
    ID: 2,
    Description: 'Team Hard 2'
  },
  {
    ID: 3,
    Description: 'Team Hard 3'
  },
];

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

export const TournamentFixturesDialog = ({ open, handleClose, }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

    },

    validationSchema: Yup.object({

    }),

  });

  const [value, setValue] = React.useState(('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };


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
            xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={GroupHard || []}
              getOptionLabel={(option) => option.Description}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Group"
                  placeholder="Select Group"
                />
              )}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={TeamHard1 || []}
              getOptionLabel={(option) => option.Description}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Team 1"
                  placeholder="Select Team 1"
                />
              )}
            />
          </Grid>

          <Grid
            item
            md={4}
            xs={12}>
            <Autocomplete
              id="tags-outlined"
              options={TeamHard2 || []}
              getOptionLabel={(option) => option.Description}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Team 2"
                  placeholder="Select Team 2"
                />
              )}
            />
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

        </Grid>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} >Cancel</Button>
      </DialogActions>
      {/* </form> */}
    </Dialog >
  );
};
