import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { useState } from "react";
import LoadingBox from "src/components/common/loading-box";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FederationFinance from "./federationfinance-component/federation-finance";
import FederationEcommerse from "./federationfinance-component/federation-ecommerse";
import FederationOrganization from "./federationfinance-component/federation-organization";


export const FederationFinanceDialog = ({ open, handleClose,federationFinance, federation, mutate }) => {
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
                    Federation Finance
                </Typography>
                <Grid>
                    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            centered
                                                >
                            <LinkTab value="0" label="Finance" />
                            <LinkTab value="1" label="Ecommerse Site" />
                            <LinkTab value="2" label="Tournament Organization" />
                        </Tabs>
                    </Box>
                </Grid>
                <Container maxWidth="md">
                    {value == "0" && <FederationFinance federationFinance={federationFinance}/>}
                    {value == "1" && <FederationEcommerse/>}
                    {value == "2" && <FederationOrganization/>}
                </Container>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    );
};
