import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState } from "react";
import { RefereeListToolbar, UserRefereeListToolbar, UserRefereeToolbar } from "src/components/referee/referee-list-toolbar";
import { AddRefereeDialog } from "src/components/referee/add-referee-dialog";
import { RefereeDetailsDialog } from "src/components/referee/referee-details-dialog";
import { RefereeListResults } from "src/components/referee/referee-list-result";
import { getRefereeDetails } from "src/services/refereeRequest";
import { useAllReferee } from "src/adapters/refereeAdapter";

const RefereeRegistration = () => {
  const [showAddRefereeDialog, setShowAddRefereeDialog] = useState(false);
  const [showRefereeDetailsDialog, setShowRefereeDetailsDialog] = useState(false);

  const [referee, setReferee] = useState({});

  const [params, setParams] = useState({});
  const handleOpenAddReferee = () => setShowAddRefereeDialog(true);
  const handleCloseAddReferee = () => setShowAddRefereeDialog(false);
  const handleCloseRefereeDetails = () => setShowRefereeDetailsDialog(false);

  const handleOpenRefereeDetails = (referee) => {
    try {
      // getRefereeDetails({ id: referee.ID }).then((res) => {
      //   if (res?.status === "SUCCESS") {
      //     let Sendreferee = { ...res.result, fullName: referee.FullName }
      // setReferee(Sendreferee);
      // setShowRefereeDetailsDialog(true)
      // }
      // })
      setReferee(referee);
      setShowRefereeDetailsDialog(true)
    }
    catch (error) {
      console.log(error);
    }
  };

  const { loading, referees, mutate } = useAllReferee({ ...params });


  return (
    <>
      <Head>
        <title>Referee Registration | PMS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <AddRefereeDialog
          open={showAddRefereeDialog}
          handleClose={handleCloseAddReferee}
        />

        <RefereeDetailsDialog
          referees={referee}
          open={showRefereeDetailsDialog}
          handleClose={handleCloseRefereeDetails}
        />

        <Container maxWidth={false}>
          <RefereeListToolbar
            handleOpenAddReferee={handleOpenAddReferee}
            open={showAddRefereeDialog}
          />

          <Box sx={{ mt: 3 }}>
            <RefereeListResults referee={referees || []}
              handleOpenRefereeDetails={handleOpenRefereeDetails} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RefereeRegistration.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RefereeRegistration;
