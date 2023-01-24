import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout.js';
import { useState } from 'react';
import { AdministrativeListToolbar } from 'src/components/administrative-template/administrative-list-toolbar.js';
import { AddAdministrativeDialog } from 'src/components/administrative-template/add-administrative-dialog.js';
import { AdministrativeDetailsDialog } from 'src/components/administrative-template/administrative-details-dialog.js';
import { AdministrativeListResults } from 'src/components/administrative-template/administrative-list-result.js';


const AdministrativeTemplate = () => {
  const [showAddAdministrativeDialog, setShowAddAdministrativeDialog] = useState(false);
  const [showAdministrativeDetailsDialog, setShowAdministrativeDetailsDialog] = useState(false);
  const handleOpenAddAdministrative = () => setShowAddAdministrativeDialog(true);
  const handleCloseAddAdministrative = () => setShowAddAdministrativeDialog(false);
  const handleOpenAdministrativeDetails = () => setShowAdministrativeDetailsDialog(true);

  
  const handleCloseAdministrativeDetails = () => setShowAdministrativeDetailsDialog(false);


  let administrativelist =
    [
      {
        id: "1",
        address: {
          country: 'CONTRACT',
          state: 'West Virginia',
          city: 'Parkersburg',
          street: '2849 Fulton Street'
        },
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Ekaterina Tankova',
        phone: '304-428-3097'
      },
      {
        id: "2",
        address: {
          country: 'CONTRACT',
          state: 'Bristow',
          city: 'Iowa',
          street: '1865  Pleasant Hill Road'
        },
        avatarUrl: '/static/images/avatars/avatar_4.png',
        createdAt: 1555016400000,
        email: 'cao.yu@devias.io',
        name: 'Cao Yu',
        phone: '712-351-5711'
      },
    ]


  return (
    <>
      <Head>
        <title>
          Administrative Template | PMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <AdministrativeDetailsDialog
          open={showAdministrativeDetailsDialog}
          handleClose={handleCloseAdministrativeDetails}
        />
        <AddAdministrativeDialog
          open={showAddAdministrativeDialog}
          handleClose={handleCloseAddAdministrative}
        />
        
        <Container maxWidth={false}>
          <AdministrativeListToolbar
            handleOpenAddAdministrative={handleOpenAddAdministrative} 
            open={showAddAdministrativeDialog}
          />

          <Box sx={{ mt: 3 }}>
            <AdministrativeListResults administrative={administrativelist} handleOpenAdministrativeDetails={handleOpenAdministrativeDetails}
            />
          </Box>
          
        </Container>
      </Box>
    </>
  );
}

AdministrativeTemplate.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default AdministrativeTemplate;
