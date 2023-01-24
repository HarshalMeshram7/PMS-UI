import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { UserProfile } from '../components/account/user-profile';
import { UserProfileDetails } from '../components/account/user-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect } from 'react';

const Profile = () =>{ 
  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   });
  // },[])
  return(
  <>
    <Head>
      <title>
        Profile | PMS
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          User Profile
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <UserProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <UserProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

Profile.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Profile;
