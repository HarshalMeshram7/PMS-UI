import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, Typography, Grid, Container } from "@mui/material";
import { useState } from "react";
import LoadingBox from "src/components/common/loading-box";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ClubFinance from "./finance-component/club-finance";
import ClubEccomerce from "./finance-component/club-ecommerce";
import ClubEarning from "./finance-component/club-earnings";
import ClubBudget from "./finance-component/club-budget";
import ClubStatistic from "./finance-component/club-statistic";
import ClubOrganization from "./finance-component/club-organization";
import ClubEvents from "./finance-component/club-event";
import ClubExpenses from "./finance-component/club-expenses";
import ClubEcommerce from "./finance-component/club-ecommerce";


export const ClubFinanceDialog = ({ open, handleClose, clubFinance, club, mutate }) => {
    const { enqueueSnackbar } = useSnackbar();

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

            <DialogContent style={{ height: '600px' }}>
                <Typography align="center" variant="h4">
                    Club Finance
                </Typography>

                <Grid>
                    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            centered
                            // variant="scrollable"
                            // scrollButtons
                            // aria-label="visible arrows tabs example"
                            // sx={{
                            //     [`& .${tabsClasses.scrollButtons}`]: {
                            //         '&.Mui-disabled': { opacity: 0.3 },
                            //     },
                            // }}

                        >
                            <LinkTab value="0" label="Finance" />
                            <LinkTab value="1" label="Ecommerse Site" />
                            <LinkTab value="2" label="Earning" />
                            <LinkTab value="3" label="Expenses" />
                            <LinkTab value="4" label="Budget" />
                            <LinkTab value="5" label="Event" />
                            <LinkTab value="6" label="Organization" />
                            <LinkTab value="7" label="Statistic" />
                        </Tabs>
                    </Box>
                </Grid>
                <Container maxWidth="md">
                    {value == "0" && <ClubFinance clubFinance={clubFinance} />}
                    {value == "1" && <ClubEcommerce />}
                    {value == "2" && <ClubEarning />}
                    {value == "3" && <ClubExpenses />}
                    {value == "4" && <ClubBudget />}
                    {value == "5" && <ClubEvents />}
                    {value == "6" && <ClubOrganization />}
                    {value == "7" && <ClubStatistic />}
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
