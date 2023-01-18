import React from "react";
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from "src/components/dashboard-layout";
import { useState } from 'react';
import { FixturesListToolbar } from "src/components/tournament-matches/tournament-list-toolbar";
import { AddFixturesDialog } from "src/components/tournament-matches/add-tournament-dialog";
import { useAllTournament } from "src/adapters/tournamentAdapter";
import { TournamentCard } from "src/components/tournament-matches/tournament-card";
import { StaffRegistrationDetailsDialog } from "src/components/staff-registration/staff-details-dialog";
import { TournamentDetailsDialog } from "src/components/tournament-matches/tournament-details-dialog";
import { getTournamentDetailsByID } from "src/services/tournamentRequest";
import { TournamentFixturesDialog } from "src/components/tournament-matches/tournament-fixtures-dialog";

const TournamentMatches = () => {

  const [showAddTournamentDialog, setShowAddTournamentDialog] = useState(false);
  const [showTournamentDetailsDialog, setShowTournamentDetailsDialog] = useState(false);
  const [params, setParams] = useState({ searchpattern: "" })
  const [tournament, setTournament] = useState(null);

  const [tournamentDetails, setTournamentDetails] = useState(null);

  const handleOpenAddTournament = () => setShowAddTournamentDialog(true);
  const handleCloseAddTournament = () => setShowAddTournamentDialog(false);
  const handleCloseTournamentDetails = () => setShowTournamentDetailsDialog(false);

  const handleOpenTournamentDetails = (tournament) => {
    try {

      setTournament(tournament);
      getTournamentDetailsByID({ ID: tournament.ID }).then((res) => {
        setTournamentDetails(res)
      })
      setShowTournamentDetailsDialog(true)

    }
    catch (error) {
      console.log(error);
    }

  };

  const [showTournamentFixturesDialog, setShowTournamentFixturesDialog] = useState(false);
  const handleCloseTournamentFixtures = () => setShowTournamentFixturesDialog(false);
  const handleOpenTournamentFixtures = () => {
    setShowTournamentFixturesDialog(true)
  };



  const { tournaments, loading, mutate } = useAllTournament({ ...params })

  return (
    <>
      <Head>
        <title>
          Tournament Matches | PMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <AddFixturesDialog
          open={showAddTournamentDialog}
          handleClose={handleCloseAddTournament}
          mutate={mutate}
        />

        <TournamentDetailsDialog
          open={showTournamentDetailsDialog}
          handleClose={handleCloseTournamentDetails}
          mutate={mutate}
          tournament={tournament}
          tournamentDetails={tournamentDetails}
        />

        <TournamentFixturesDialog
          open={showTournamentFixturesDialog}
          handleClose={handleCloseTournamentFixtures}
        // mutate={mutate}
        />

        <Container maxWidth={false}>

          <FixturesListToolbar
            handleOpenAddTournament={handleOpenAddTournament}
            open={showAddTournamentDialog}
          />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {tournaments && tournaments?.map((product, key) => {

                return (
                  <Grid
                    item
                    key={key}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <TournamentCard
                      handleOpenTournamentDetails={handleOpenTournamentDetails}
                      handleOpenTournamentFixtures={handleOpenTournamentFixtures}
                      product={product} />
                  </Grid>
                )
              })}
            </Grid>
          </Box>

        </Container>

      </Box>

    </>
  )
}

TournamentMatches.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default TournamentMatches;