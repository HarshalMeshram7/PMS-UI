import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { AcademyCard } from 'src/components/academy/academy-card';
import { AcademyListToolbar } from 'src/components/academy/academy-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { AddAcademyDialog } from 'src/components/academy/add-academy-dialog';
import { useState, useEffect } from 'react';
import { AcademyDetailsDialog } from 'src/components/academy/academy-details-dialog';
import { useAllAcademies } from 'src/adapters/academyAdapter';
import { AcademyFinanceDialog } from 'src/components/academy/academy-finance-dialog';
import { getAcademy, getAcademyFinanceById } from 'src/services/academyRequest';
import useStorage from 'src/hooks/useStorage';
import { filterArrayByArrayIDs } from 'src/utils/commonFunctions';

const Academy = () => {
  const [showAddAcademyDialog, setShowAddAcademyDialog] = useState(false);

  const [showAcademyDetailsDialog, setShowAcademyDetailsDialog] = useState(false);

  const [showAcademyFinanceDialog, setShowAcademyFinanceDialog] = useState(false);

  const [academyFinance, setAcademyFinance] = useState({})
  
  const [academy, setAcademy] = useState([])
  
  const [filteredAcademies, setFilteredAcademies] = useState([])
  
  const [params, setParams] = useState({ searchpattern: "" })
  
  const { academies, loading, error, mutate } = useAllAcademies({ ...params });
  const handleOpenAddAcademy = () => setShowAddAcademyDialog(true);
  const handleCloseAddAcademy = () => setShowAddAcademyDialog(false);

  const handleOpenAcademyDetails = (academy) => {

    try {
      getAcademy({ id: academy.ID }).then((res) => {
        setAcademy(res)
      })
      
      setShowAcademyDetailsDialog(true)
    } catch (error) {
      console.log(error);
    }
    
    
  };
  const handleCloseAcademyDetails = () => setShowAcademyDetailsDialog(false);

  const handleOpenAcademyFinance = (academy) => {
    getAcademy({ id: academy.ID }).then((res) => {
      setAcademy(res)
      setShowAcademyFinanceDialog(true)
    })
    getAcademyFinanceById({ id: academy.ID }).then((res) => {
      setAcademyFinance(res)
    })
  };

  const handleCloseAcademyFinance = () => setShowAcademyFinanceDialog(false);

  const handleSearch = (value) => {
    setParams((p) => ({ ...p, searchpattern: value }))
  };

  const {academyFilter ,loggedInUserName} =useStorage()
  
  useEffect(() => {
    filterArrayByArrayIDs(academies, academyFilter,loggedInUserName).then((filtered) => {
      setFilteredAcademies(filtered);
    });
  }, [academies]);


  return (
    <>
      <Head>
        <title>
          Academies | PMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <AddAcademyDialog
          mutate={mutate}
          open={showAddAcademyDialog}
          handleClose={handleCloseAddAcademy}
        />
        <AcademyDetailsDialog academy={academy}
          mutate={mutate}
          open={showAcademyDetailsDialog}
          handleClose={handleCloseAcademyDetails} ></AcademyDetailsDialog>

        <AcademyFinanceDialog
         academyFinance={academyFinance}
          academy={academy}
          mutate={mutate}
          open={showAcademyFinanceDialog}
          handleClose={handleCloseAcademyFinance}
        ></AcademyFinanceDialog>

        <Container maxWidth={false}>
          <AcademyListToolbar
            onSearch={handleSearch}
            handleOpenAddAcademy={handleOpenAddAcademy}
            open={showAddAcademyDialog}
          />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {filteredAcademies?.map((product, key) => (
                <Grid
                  item
                  key={key}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <AcademyCard
                    handleOpenAcademyFinance={handleOpenAcademyFinance}
                    handleOpenAcademyDetails={handleOpenAcademyDetails}
                    product={product || []} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
        </Container>
      </Box>
    </>
  );
}

Academy.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Academy;