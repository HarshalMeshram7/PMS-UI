import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ClubCard } from 'src/components/club/club-card';
import { ClubListToolbar } from 'src/components/club/club-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { AddClubDialog } from 'src/components/club/add-club-dialog';
import { useState, useEffect } from 'react';
import { ClubDetailsDialog } from 'src/components/club/club-details-dialog';
import { useAllAcademies } from 'src/adapters/academyAdapter';
import { useAllClubs } from 'src/adapters/clubAdapter';
import { ClubFinanceDialog } from 'src/components/club/club-finance-dialog';
import { getClub, getClubFinanceById } from 'src/services/clubRequest';

const Clubs = () => {
    const [showAddClubDialog, setShowAddClubDialog] = useState(false);
    const [showClubDetailsDialog, setShowClubDetailsDialog] = useState(false);
    const [showClubFinanceDialog, setShowClubFinanceDialog] = useState(false);
    const [clubFinance, setClubFinance] = useState({});

    const [club, setClub] = useState([])
    const [params, setParams] = useState({ searchpattern: "" })

    const handleOpenAddClub = () => setShowAddClubDialog(true);
    const handleCloseAddClub = () => setShowAddClubDialog(false);

    const handleOpenClubDetails = (club) => {

        getClub({ id: club.ID }).then((res) => {
            setClub(res)
            setShowClubDetailsDialog(true)
        })

    };
    const handleCloseClubDetails = () => setShowClubDetailsDialog(false);

    const handleOpenClubFinance = (club) => {

        // getClub({id:club.ID}).then((res)=>{
        //     setClub(club)
        //     setShowClubFinanceDialog(true)
        // })

        try {
            getClub({ id: club.ID }).then((res) => {
                setClub(club)
            })
            getClubFinanceById({ id: club.ID }).then((res) => {
                setClubFinance(res)
            })
            setShowClubFinanceDialog(true)
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseClubFinance = () => setShowClubFinanceDialog(false);

    const handleSearch = (value) => {
        setParams((p) => ({ ...p, searchpattern: value }))
    };

    // const { academies, loading, error, mutate } = useAllAcademies({ ...params });
    const { clubs, loading, error, mutate } = useAllClubs({ ...params });

    let clubsLocal = [{
        "_id": "62de8df69fda862707152867",
        "Club": "club2",
        "Address": "Address",
        "Phone": 8208793805,
        "Email": "club2@pixonix.tech",
        "ContactPersonName": "Person name",
        "Logo": "/static/images/products/product_2.png",
        "Banner": "../../../public/static/images/background/register.jpg",
        "Accreditation": "accreditation",
        "Facebook": "fb",
        "Twitter": "tw",
        "Instagram": "ins",
        "sportsList": ["Football", "Cricket", "Tennis"], "__v": 0
    }]

    return (
        <>
            <Head>
                <title>
                    Club | PMS
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <AddClubDialog
                    mutate={mutate}
                    open={showAddClubDialog}
                    handleClose={handleCloseAddClub}
                />
                <ClubDetailsDialog
                    club={club}
                    mutate={mutate}
                    open={showClubDetailsDialog}
                    handleClose={handleCloseClubDetails} />

                <ClubFinanceDialog
                    clubFinance={clubFinance}
                    club={club}
                    mutate={mutate}
                    open={showClubFinanceDialog}
                    handleClose={handleCloseClubFinance}
                />

                <Container maxWidth={false}>
                    <ClubListToolbar
                        search={handleSearch}
                        handleOpenAddClub={handleOpenAddClub}
                        open={showAddClubDialog}
                    />
                    <Box sx={{ pt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {clubs?.map((product, key) => (
                                <Grid
                                    item
                                    key={key}
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    <ClubCard
                                        handleOpenClubFinance={handleOpenClubFinance}
                                        handleOpenClubDetails={handleOpenClubDetails}
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

Clubs.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Clubs;