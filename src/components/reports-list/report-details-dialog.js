import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Box,
    Container,
    Tabs,
    Typography,
    TableContainer,
    Paper,
    TableCell,
    Table,
    TableHead,
    TableRow,
    StyledTableCell,
    TableBody, StyledTableRow,
    Grid,
    TextField,
    Divider,
    Card,
    CardContent,
    Tab,
    CardActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar
} from "@mui/material";
import { useEffect, useState } from "react";

import LoadingBox from "src/components/common/loading-box";
import { PlayerListResults } from "src/components/player/player-list-results";

import { players } from "../../__mocks__/players.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { deleteAcademy } from "src/services/academyRequest.js";
// import banner from '../../../public/static/images/background/register.jpg';
// import FederationFinance from "../federation/federationfinance-component/federation-finance.js";
// import FederationEcommerse from "../federation/federationfinance-component/federation-ecommerse.js";
// import FederationOrganization from "../federation/federationfinance-component/federation-organization.js";
// import PlayerDetailsTab from "./playersdetailtabs/players-personal-tab.js";
// import PlayerPaymnetTab from "./playersdetailtabs/players-paymnet-tab.js";
// import AcademyFinance from "../academy/academyfinance-component/academy-finance.js";
// import PlayerContractType from "./playersdetailtabs/players-contract.js";
// import PlayerFitnessTab from "./playersdetailtabs/player-fitness-tab.js";
// import PlayerTrainingModuleTab from "./playersdetailtabs/player-trainingmodule-tab.js";
// import PlayerTrainingManagementTab from "./playersdetailtabs/player-trainingmanagement-tab.js";
// import PlayerStatisticTab from "./playersdetailtabs/player-statistic.js";
// import PlayerCommunicationTab from "./playersdetailtabs/player-communication.js";
// import PlayerProfileTab from "./playersdetailtabs/player-profile.js";
// import PlayerTMSITMSTab from "./playersdetailtabs/player-TMSITMS-tab.js";


export const ReportsDetailsDialog = ({ open, handleClose, }) => {
    const { enqueueSnackbar } = useSnackbar();
    const user = {
        avatar: "",
        city: "",
        country: 'USA',
        jobTitle: 'Senior Developer',
        name: "club.Club",
        timezone: 'GTM-7'
    };
    const [loading, setLoading] = useState();
    const [value, setValue] = React.useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function LinkTab(props) {
        return (
            <Tab
                component="a"
                onClick={(event) => {
                    event.preventDefault();
                }}
                {...props}
            />
        );
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {


        },
        validationSchema: Yup.object({

        }),

        onSubmit: async (data) => {
            setLoading(true);
            try {
                console.log(data);
                // await updateAcademy(data);
                handleClose();
                enqueueSnackbar("Player Updated Succesfully", { variant: "success" });
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        },
    });

    const handleDelete = (data) => {

        setLoading(true);
        try {
            // deleteAcademy(data).then((response) => {
            //     if (response.status == "success") {
            //         handleClose();
            //         enqueueSnackbar("Club Deleted Succesfully", { variant: "success" });

            //         setLoading(false);
            //     }
            //     else {
            //         handleClose();
            //         enqueueSnackbar(`Error : ${response.message}`, { variant: "error" });
            //         setLoading(false);
            //     }
            // });
            console.log(data)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    function createData(Goals, Shots, Possessions, Ratings,) {
        return { Goals, Shots, Possessions, Ratings, };
    }

    const rows = [
        createData('Ronaldo ', 26, 60.9, 8),
        createData('Messi', 18, 65.9, 7.7),

    ];


    return (
        <Dialog
            open={open}
            onClose={!loading && handleClose}
            fullWidth
            maxWidth="xl"
            BackdropProps={{
                style: { backgroundColor: "#121212dd" },
            }}
        >
            {loading && <LoadingBox />}
            <DialogContent style={{ margin: 0, padding: 0 }} >
                {/* <form onSubmit={formik.handleSubmit}> */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <div style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "-100px",
                        // background: `url(${club.Banner})center center`,
                    }}></div>

                    <Container maxWidth="lg">
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
                                {/* Profile */}
                                <Card >
                                    <CardContent>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Avatar
                                                src={user.avatar}
                                                sx={{
                                                    height: 64,
                                                    mb: 2,
                                                    width: 64
                                                }}
                                            />
                                            <Typography
                                                color="textPrimary"
                                                gutterBottom
                                                variant="h5"
                                            >
                                                {"Cristiano Ronaldo"}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {"Portugal"}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                            >
                                                {"Manchester United"}
                                            </Typography>
                                            {/* <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {user.timezone}
                                                </Typography> */}
                                        </Box>
                                    </CardContent>
                                    <Divider />

                                    <Grid container
                                        spacing={2} >

                                        {/* <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                xs={6}
                                            >
                                                <CardActions>
                                                    <TextField style={{ display: 'none' }}
                                                        error={Boolean(formik.touched.logo && formik.errors.logo)}
                                                        fullWidth
                                                        helperText={formik.touched.logo && formik.errors.logo}
                                                        label="Logo"
                                                        id="uploadClubLogo"
                                                        margin="dense"
                                                        name="logo"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="file"
                                                        value={formik.values.logo}
                                                        variant="outlined"
                                                    />
                                                    <Button onClick={() => { document.getElementById("uploadClubLogo").click() }}>Upload Logo</Button>
                                                </CardActions>
                                            </Grid> */}
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            xs={6}
                                        >
                                            <Typography
                                                align="center"
                                                variant="h6"
                                            >
                                                Born
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            xs={6}
                                        >
                                            <Typography>
                                                February 5, 1985
                                            </Typography>
                                        </Grid>

                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            xs={6}
                                        >
                                            <Typography
                                                align="center"
                                                variant="h6"
                                            >
                                                Position
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            xs={6}
                                        >
                                            <Typography>
                                                Center
                                            </Typography>
                                        </Grid>


                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            xs={6}
                                        >
                                            <Typography
                                                align="center"
                                                variant="h6"
                                            >
                                                Height
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            xs={6}
                                        >
                                            <Typography>
                                                1.85 m
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Card>
                                {/* Profile */}
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={6}
                                xs={12}
                            >
                                {/* Details */}

                                <Card>
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                                md={6}
                                                xs={12}
                                            >
                                                <Typography>
                                                    <h4>Profile Summary</h4>
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                item
                                                md={12}
                                            // xs={12}
                                            >
                                                <Typography>
                                                    Cristiano Ronaldo dos Santos Aveiro GOIH ComM (Portuguese pronunciation:  born 5 February 1985) is a Portuguese professional footballer who plays as a forward for Premier League club Manchester United and captains the Portugal national team. Widely regarded as one of the greatest players of all time, Ronaldo has won five Ballon d&apos;Or awards[note 3] and four European Golden Shoes, the most by a European player. He has won 32 trophies in his career, including seven league titles, five UEFA Champions Leagues, and the UEFA European Championship. Ronaldo holds the records for most appearances (183), goals (140), and assists (42) in the Champions League, goals in the European Championship (14), international goals (117), and international appearances by a European (189). He is one of the few players to have made over 1,100 professional career appearances, and has scored over 800 official senior career goals for club and country.
                                                </Typography>
                                            </Grid>

                                            {/* <Grid
                                                    item
                                                    md={6}
                                                    xs={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Sports List</InputLabel>
                                                        <Select
                                                            // multiple
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.sportsList}
                                                            label="Sports List"
                                                            name="sportsList"
                                                            onChange={formik.handleChange}
                                                        >
                                                            <MenuItem value="Football">Football</MenuItem>
                                                            <MenuItem value="Cricket">Cricket</MenuItem>
                                                            <MenuItem value="Tennis">Tennis</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid> */}

                                        </Grid>
                                    </CardContent>
                                    <Divider />

                                    {/* <CardActions>
                                            <Grid container
                                                spacing={8}
                                                style={{ textAlign: 'center' }} >
                                                <Grid
                                                    item
                                                    lg={6}
                                                    md={6}
                                                    xs={6}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        style={{ backgroundColor: 'red' }}
                                                        onClick={() => {

                                                            handleDelete(club.email)
                                                        }}>Delete</Button>
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={6}
                                                    md={6}
                                                    xs={6}
                                                >
                                                    <Button type="submit"
                                                        variant="contained">Save Details</Button>
                                                </Grid>
                                            </Grid>
                                        </CardActions> */}
                                </Card>

                                {/* Details */}
                            </Grid>
                        </Grid>

                        {/* Teams List */}
                        {/* <Typography>Clubs - Teams </Typography>
                            <Box sx={{ mt: 3 }}>
                                <PlayerListResults reports={reports} />
                            </Box> */}


                        <Typography>Reports - Teams </Typography>
                        {/* <Box sx={{ mt: 3 }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Shots</TableCell>
                                                <TableCell align="right">Possessions</TableCell>
                                                <TableCell align="right">Ratings</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.Goals}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.Goals}
                                                    </TableCell>
                                                    <TableCell align="right">{row.Shots}</TableCell>
                                                    <TableCell align="right">{row.Possessions}</TableCell>
                                                    <TableCell align="right">{row.Ratings}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box> */}


                        <Grid>
                            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    // centered
                                    variant="scrollable"
                                >
                                    <LinkTab value="0" label="Personal Details" />
                                    <LinkTab value="1" label="Payment Details" />
                                    <LinkTab value="2" label="Contract Type" />
                                    <LinkTab value="3" label="TMS / ITMS" />
                                    <LinkTab value="4" label="Fitness" />
                                    <LinkTab value="5" label="Training Module" />
                                    <LinkTab value="6" label="Training Management" />
                                    <LinkTab value="7" label="Profile" />
                                    <LinkTab value="8" label="Statistic" />
                                    <LinkTab value="9" label="Evaluation" />
                                    <LinkTab value="10" label="Communication" />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Container maxWidth="md">
                            {/* {value == "0" && <PlayerDetailsTab />}
                            {value == "1" && <PlayerPaymnetTab />}
                            {value == "2" && <PlayerContractType />}
                            {value == "3" && <PlayerTMSITMSTab />}
                            {value == "4" && <PlayerFitnessTab />}
                            {value == "5" && <PlayerTrainingModuleTab />}
                            {value == "6" && <PlayerTrainingManagementTab />}
                            {value == "7" && <PlayerProfileTab />}
                            {value == "8" && <PlayerStatisticTab />}
                            {value == "9" && <>Evaluation</>}
                            {value == "10" && <PlayerCommunicationTab />} */}
                        </Container>


                    </Container>
                </Box>
                {/* </form> */}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
