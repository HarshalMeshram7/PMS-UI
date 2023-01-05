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

const TournamentMatches = () => {

  const [showAddTournamentDialog, setShowAddTournamentDialog] = useState(false);
  const handleCloseAddTournament = () => setShowAddTournamentDialog(false);
  const handleOpenAddTournament = () => setShowAddTournamentDialog(true);
  const [showTournamentDetailsDialog, setShowTournamentDetailsDialog] = useState(false);
  const [params, setParams] = useState({ searchpattern: "" })

  const handleCloseStaffRegistrationDetails = () => setShowTournamentDetailsDialog(false);

  const handleOpenTournamentDetails = (tournament) => {
    console.log(tournament);
    setShowTournamentDetailsDialog(true)
  };
  const handleCloseTournamentDetails = () => setShowTournamentDetailsDialog(false);

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
        />

        <TournamentDetailsDialog
          // staff={staff}
          open={showTournamentDetailsDialog}
          handleClose={handleCloseTournamentDetails}
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
                console.log(product);
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