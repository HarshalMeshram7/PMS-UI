import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Card,
  CardContent,
  ListItemText
} from "@mui/material";
import { getInitials } from "src/utils/get-initials";
import StarBorder from "@mui/icons-material/StarBorder";


export default function ClubFinance({ clubFinance }) {
  const formik = useFormik({
    initialValues: {
      ClubSponsers: "",
      ClubDonation: "",
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
                  {clubFinance?.Sponsors?.map((item) => (
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
                    <ListItemText primary={clubFinance?.Donations} />
                  </ListItem>
                </List>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.ClubSponsers && formik.errors.ClubSponsers)}
                  fullWidth
                  helperText={formik.touched.ClubSponsers && formik.errors.ClubSponsers}
                  label="Club Sponsers"
                  margin="dense"
                  name="ClubSponsers"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.ClubSponsers}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.ClubDonation && formik.errors.ClubDonation)}
                  fullWidth
                  helperText={formik.touched.ClubDonation && formik.errors.ClubDonation}
                  label="ClubDonation"
                  margin="dense"
                  name="ClubDonation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.ClubDonation}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.FeesToFedration && formik.errors.FeesToFedration)}
                  fullWidth
                  helperText={formik.touched.FeesToFedration && formik.errors.FeesToFedration}
                  label="FeesToFedration Number"
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
