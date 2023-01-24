import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";

import StarBorder from "@mui/icons-material/StarBorder";
import { getInitials } from "src/utils/get-initials";

export default function AcademyFinance({ academyFinance }) {
  const formik = useFormik({
    initialValues: {
      AcademySponsers: "",
      AcademyDonation: "",
      FeesToFedration: "",
      FeesByPlayer: "",
      MurchandiceIncome: "",
    },
    validationSchema: Yup.object({}),

    onSubmit: async (data) => {
      try {
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>

              <Grid item md={6} xs={12}>
                <Typography>Sponsors</Typography>
                <Stack direction="row" spacing={2}>
                  {academyFinance?.Sponsors?.map((item) => (
                    <Chip
                      color="primary"
                      variant="outlined"
                      avatar={<Avatar>{getInitials(item)}</Avatar>}
                      label={item}
                    />
                  ))}
                </Stack>
              </Grid>

              <Grid item md={6} xs={12}>
                <Typography>Total Donation</Typography>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={academyFinance?.Donations} />
                  </ListItem>
                </List>
              </Grid>

              {/* <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.AcademySponsers && formik.errors.AcademySponsers)}
                  fullWidth
                  helperText={formik.touched.AcademySponsers && formik.errors.AcademySponsers}
                  label="Academy Sponsers"
                  margin="dense"
                  name="AcademySponsers"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.AcademySponsers}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.AcademyDonation && formik.errors.AcademyDonation)}
                  fullWidth
                  helperText={formik.touched.AcademyDonation && formik.errors.AcademyDonation}
                  label="Academy Donation"
                  margin="dense"
                  name="AcademyDonation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.AcademyDonation}
                  variant="outlined"
                />
              </Grid> */}

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.FeesToFedration && formik.errors.FeesToFedration)}
                  fullWidth
                  helperText={formik.touched.FeesToFedration && formik.errors.FeesToFedration}
                  label="Fees To Fedration"
                  margin="dense"
                  name="FeesToFedration"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.FeesToFedration}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.FeesByPlayer && formik.errors.FeesByPlayer)}
                  fullWidth
                  helperText={formik.touched.FeesByPlayer && formik.errors.FeesByPlayer}
                  label="Fees By Player"
                  margin="dense"
                  name="FeesByPlayer"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.FeesByPlayer}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.MurchandiceIncome && formik.errors.MurchandiceIncome)}
                  fullWidth
                  helperText={formik.touched.MurchandiceIncome && formik.errors.MurchandiceIncome}
                  label="Murchandice Income"
                  margin="dense"
                  name="MurchandiceIncome"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.MurchandiceIncome}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
              </Grid>

              <Grid item md={6} xs={12}>
              </Grid>

              <Grid item md={12} xs={12} textAlign="center">
                <Button type="submit" variant="outlined" color="primary">
                  Save
                </Button>
              </Grid>
              <Grid />
            </Grid>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
