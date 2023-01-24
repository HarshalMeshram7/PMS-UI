import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AddPlayerDialog } from 'src/components/player/add-player-dialog.js';
import { PlayerListResults } from '../components/player/player-list-results.js';
import { PlayerListToolbar } from '../components/player/player-list-toolbar.js';
import { DashboardLayout } from '../components/dashboard-layout.js';
import { useState } from 'react';
import { PlayerDetailsDialog } from 'src/components/player/player-details-dialog.js';
import { useAllPlayers } from 'src/adapters/playersAdapter.js';
import DeleteDialog from "src/components/common/deleteDialog";
import { deletePlayer } from 'src/services/playersRequest.js';
import { initialValues } from 'src/components/player/PlayerDetailsData.js';
import { MatchesListToolbar } from 'src/components/matches/matches-list-toolbar.js';
import { AddMatchesDialog } from 'src/components/matches/add-matches-dialog.js';
import { MatchesDetailsDialog } from 'src/components/matches/matches-details-dialog.js';
import MatchTable from 'src/components/tournament-matches/match-table.js';

const HardMatches = [
  {
      "Sports": "Soccer",
      "Divison": "Division 4",
      "GroupName": "Group 1",
      "Team1": "team2",
      "Team2": "team4",
      "Duration": "45",
      "MatchStartDateTime": "2022-12-31T18:30:00.000Z",
      "Result": "Win",
      "Stadium": "Test"
  },
  {
    "Sports": "Soccer",
    "Divison": "Division 4",
    "GroupName": "Group 1",
    "Team1": "team2",
    "Team2": "team4",
    "Duration": "45",
    "MatchStartDateTime": "2022-12-31T18:30:00.000Z",
    "Result": "Win",
    "Stadium": "Test"
},

]


const Matches = () => {
  const [showAddPlayerDialog, setShowAddPlayerDialog] = useState(false);
  const [showPlayerDetailsDialog, setShowPlayerDetailsDialog] = useState(false);
  const [params, setParams] = useState({});
  const [player, setPlayer] = useState({});
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [initValue, setInitValue] = useState(null);


  const handleOpenAddPlayer = () => setShowAddPlayerDialog(true);
  const handleCloseAddPlayer = () => setShowAddPlayerDialog(false);

  const handleOpenPlayerDetails = async (player) => {
    let res = await initialValues(player.ID)
    setInitValue(res)
    setPlayer(player)
    setShowPlayerDetailsDialog(true)
  };


  const handleClosePlayerDetails = () => setShowPlayerDetailsDialog(false);

 



  const handleSearch = (value) => {
    setParams((p) => ({ ...p, searchpattern: value }))
  };

  const handleDeletePlayer = (id) => {

    try {
      deletePlayer({ "Id": id }).then((res) => {
        if (res?.status === "success") {
          setOpenDeleteDialogue(false)
          mutate();
        }
      })
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleOpenDeleteDialogue = (match) => {
    console.log(match);
    setOpenDeleteDialogue(true);
  };

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteDialogue(false);
  };




  return (
    <>
      <Head>
        <title>
          Players | PMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <DeleteDialog
          handleDelete={handleDeletePlayer}
          name={player.FullName}
          ID={player.ID}
          open={openDeleteDialogue}
          handleClose={handleCloseDeleteDialogue}
        
        />

        {/* Done 66666666666666666666666666666666666666666666666666666666666666666666666*/}
        <MatchesDetailsDialog
          initValue={initValue}
          player={player}
          open={showPlayerDetailsDialog}
          handleClose={handleClosePlayerDetails}
          />

        {/* Done 66666666666666666666666666666666666666666666666666666666666666666666666*/}
        <AddMatchesDialog
          open={showAddPlayerDialog}
          handleClose={handleCloseAddPlayer}
        />

        <Container maxWidth={false}>
          {/* Done 66666666666666666666666666666666666666666666666666666666666666666666666*/}
          <MatchesListToolbar
            search={handleSearch}
            handleOpenAddPlayer={handleOpenAddPlayer}
            open={showAddPlayerDialog}
          />
          <Box sx={{ mt: 3 }}>
            <MatchTable
            title = 'All Matches'
            array = {HardMatches}
            handleRemove = {handleOpenDeleteDialogue}
            />
            
          </Box>
        </Container>
      </Box>
    </>
  );
}

Matches.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Matches;
