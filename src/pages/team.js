import React from "react";
import Head from 'next/head';
import { DashboardLayout } from "src/components/dashboard-layout";
import { Box, Container, Grid, keyframes, Pagination } from '@mui/material';
import { TeamListToolbar } from "src/components/team/team-list-toolbar";
import { TeamCard } from "src/components/team/team-card";
import { useState, useEffect } from 'react';
import { useAllTeams } from "src/adapters/teamAdapter";
import { AddTeamDialog } from "src/components/team/add-team-dialog";
import { TeamDetailsDialog } from "src/components/team/team-details-dialog";
import { TeamFinanceDialog } from "src/components/team/team-finance-dialog";
import { deleteClubTeam, getTeam } from "src/services/teamRequest";
import DeleteDialog from "src/components/common/deleteDialog";
import { useSnackbar } from "notistack";
import useStorage from "src/hooks/useStorage";
import { filterArrayByArrayIDs } from "src/utils/commonFunctions";

const Team = () => {
  const [showAddTeamDialog, setShowAddTeamDialog] = useState(false);
  const [showTeamDetailsDialog, setShowTeamDetailsDialog] = useState(false);
  const [showTeamFinanceDialog, setShowTeamFinanceDialog] = useState(false);
  const [team, setTeam] = useState([])
  const [filteredClubTeams, setFilteredClubTeams] = useState([])
  const [params, setParams] = useState({ searchpattern: "" })
  const { enqueueSnackbar } = useSnackbar();


  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);

  const handleOpenAddTeam = () => setShowAddTeamDialog(true);
  const handleCloseAddTeam = () => setShowAddTeamDialog(false);
  const { teams, loading, error, mutate } = useAllTeams({ ...params });


  const handleOpenTeamDetails = (team) => {
    getTeam({ ID: team.ID }).then((res) => {
      console.log(res)
      setTeam(res?.TeamInfo[0])
      setShowTeamDetailsDialog(true)
    })
  };
  const handleCloseTeamDetails = () => setShowTeamDetailsDialog(false);

  const handleOpenTeamFinance = (team) => {

    getTeam({ ID: team.ID }).then((res) => {
      setTeam(res?.TeamInfo[0])
      setShowTeamFinanceDialog(true)
    })

  };
  const handleCloseTeamFinance = () => setShowTeamFinanceDialog(false);

  const handleSearch = (value) => {
    setParams((p) => ({ ...p, searchpattern: value }))
  };



  const handleDeleteClubTeam = (ID) => {
    try {
      deleteClubTeam({ ID }).then((res) => {
        console.log(res);
        if (res?.status === "success") {
          mutate();
          enqueueSnackbar("Team Deleted Succesfully", { variant: "success" });
          setOpenDeleteDialogue(false);
          setShowTeamDetailsDialog(false)
        } else {

        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDeleteDialogue = (team) => {
    setTeam(team);
    setOpenDeleteDialogue(true);
  };

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteDialogue(false);
  };
  const { clubTeamFilter, loggedInUserName } = useStorage()

  useEffect(() => {
    filterArrayByArrayIDs(teams, clubTeamFilter, loggedInUserName).then((filtered) => {
      console.log(filtered)
      setFilteredClubTeams(filtered);
    });
  }, [teams]);



  return (
    <>
      <Head>
        <title>
          Team | PMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <AddTeamDialog
          open={showAddTeamDialog}
          handleClose={handleCloseAddTeam}
          mutate={mutate}
        />
        <DeleteDialog
          handleDelete={handleDeleteClubTeam}
          name={team.Team}
          ID={team.ID}
          open={openDeleteDialogue}
          handleClose={handleCloseDeleteDialogue}
        />
        <TeamDetailsDialog team={team}
          mutate={mutate}
          open={showTeamDetailsDialog}
          handleClose={handleCloseTeamDetails}
          handleOpenDeleteDialogue={handleOpenDeleteDialogue}
        />
        <TeamFinanceDialog
          team={team}
          mutate={mutate}
          open={showTeamFinanceDialog}
          handleClose={handleCloseTeamFinance}
        />

        <Container maxWidth={false}>
          <TeamListToolbar
            search={handleSearch}
            handleOpenAddTeam={handleOpenAddTeam}
            open={showAddTeamDialog}
          />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {filteredClubTeams && filteredClubTeams?.map((product, key) => (
                <Grid
                  item
                  key={key}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <TeamCard
                    handleOpenTeamFinance={handleOpenTeamFinance}
                    handleOpenTeamDetails={handleOpenTeamDetails}
                    product={product} />
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


Team.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Team;