import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Grid,
    Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";
import AcademyFinance from "../academy/academyfinance-component/academy-finance";
import AdministrativeTabs from "./administrative-basketball-tabs";
import AdministrativeBasketballTabs from "./administrative-basketball-tabs";
import AdministrativeVolleyballTabs from "./administrative-volleyball-tabs";
import AdministrativeSoccerTabs from "./administrative-soccer-tabs";



export const AddAdministrativeDialog = ({ open, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    const [sports, setSports] = useState('');


    const handleSportsChange = (e) => {
        setSports(e.target.value)
    }

    return (
        <Dialog

            open={open}
            onClose={!loading && handleClose}
            fullWidth
            maxWidth="lg"
            BackdropProps={{
                style: { backgroundColor: "#121212dd", },
            }}
        >
            {loading && <LoadingBox />}
            {/* <form onSubmit={formik.handleSubmit}> */}
                <DialogTitle>Add New Template</DialogTitle>
                <DialogContent style={{ height: '600px' }}>
                    <DialogContentText sx={{ marginBottom: 2 }}>
                        Enter the required basic details of the Administrative Template below.
                    </DialogContentText>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography
                                align="center"
                                color="textPrimary"
                            // gutterBottom
                            >
                                Type of Sports:
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">SportsList</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    // value={formik.values.SportsList}
                                    name="SportsList"
                                    label="SportsList"
                                    onChange={(e) => {
                                        
                                        handleSportsChange(e);
                                    }}

                                >
                                    <MenuItem value="basketball">Basketball</MenuItem>
                                    <MenuItem value="volleyball">Volleyball</MenuItem>
                                    <MenuItem value="soccer">Soccer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {(sports === 'basketball') ? <AdministrativeBasketballTabs /> : ''}
                        {(sports === 'volleyball') ? <AdministrativeVolleyballTabs/> : ''}
                        {(sports === 'soccer') ? <AdministrativeSoccerTabs/> : ''}

                    </Grid>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button type="submit" variant="contained">Add</Button>
                </DialogActions> */}
            {/* </form> */}
        </Dialog>
    );
};
