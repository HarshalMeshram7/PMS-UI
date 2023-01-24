import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Container,
    Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useState } from "react";
import LoadingBox from "src/components/common/loading-box";
import { useSnackbar } from "notistack";
import AcademyBudget from "./academyfinance-component/academy-budget";
import AcademyEarning from "./academyfinance-component/academy-earning";
import AcademyEvents from "./academyfinance-component/academy-event";
import AcademyEcommerce from "./academyfinance-component/academy-ecommerce";
import AcademyExpenses from "./academyfinance-component/academy-expenses";
import AcademyFinance from "./academyfinance-component/academy-finance";
import AcademyOrganization from "./academyfinance-component/academy-organization";
import AcademyStatistic from "./academyfinance-component/academy-statistic";


export const AcademyFinanceDialog = ({ open, handleClose, academyFinance, academy, mutate }) => {
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

            <DialogContent style={{ height: '600px' }} >
                <Typography align="center" variant="h4"> 
                Academy Finance
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
                    {value == "0" && <AcademyFinance academyFinance={academyFinance} />}
                    {value == "1" && <AcademyEcommerce/>}
                    {value == "2" && <AcademyEarning/>}
                    {value == "3" && <AcademyExpenses/>}
                    {value == "4" && <AcademyBudget/>}
                    {value == "5" && <AcademyEvents/>}
                    {value == "6" && <AcademyOrganization/>}
                    {value == "7" && <AcademyStatistic/>}
                </Container>




            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    );
};
