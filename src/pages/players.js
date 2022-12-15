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

const Players = () => {
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

  const { players, loading, mutate } = useAllPlayers({ ...params });

 

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

  const handleOpenDeleteDialogue = (player) => {
    setPlayer(player)
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
          mutate={mutate}
        />

        <PlayerDetailsDialog
          initValue={initValue}
          player={player}
          open={showPlayerDetailsDialog}
          handleClose={handleClosePlayerDetails}
          mutate={mutate}
        />
        <AddPlayerDialog
          open={showAddPlayerDialog}
          handleClose={handleCloseAddPlayer}
          mutate={mutate}
        />
        <Container maxWidth={false}>
          <PlayerListToolbar
            search={handleSearch}

            handleOpenAddPlayer={handleOpenAddPlayer}
            open={showAddPlayerDialog}
          />
          <Box sx={{ mt: 3 }}>
            <PlayerListResults
              players={players}
              handleOpenPlayerDetails={handleOpenPlayerDetails}
              handleOpenDeleteDialogue={handleOpenDeleteDialogue}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Players.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Players;
