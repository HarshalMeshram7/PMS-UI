import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { getInitials } from "src/utils/get-initials";
import StarBorder from "@mui/icons-material/StarBorder";

export default function FederationFinance({ federationFinance }) {
  const formik = useFormik({
    initialValues: {
      GrantFromMinistrySports: "",
      FedrationDonation: "",
      FeesFromClub: "",
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
                  {federationFinance?.Sponsors?.map((item) => (
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
                    <ListItemText primary={federationFinance?.Donations} />
                  </ListItem>
                </List>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.GrantFromMinistrySports && formik.errors.GrantFromMinistrySports
                  )}
                  fullWidth
                  helperText={
                    formik.touched.GrantFromMinistrySports && formik.errors.GrantFromMinistrySports
                  }
                  label="Grant From Ministry Of Sports"
                  margin="dense"
                  name="GrantFromMinistrySports"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.GrantFromMinistrySports}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.FeesFromClub && formik.errors.FeesFromClub)}
                  fullWidth
                  helperText={formik.touched.FeesFromClub && formik.errors.FeesFromClub}
                  label="Fees From Club"
                  margin="dense"
                  name="FeesFromClub"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.FeesFromClub}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.MurchandiceIncome && formik.errors.MurchandiceIncome
                  )}
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

              <Grid item md={6} xs={12}></Grid>

              <Grid item md={6} xs={12}></Grid>

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
