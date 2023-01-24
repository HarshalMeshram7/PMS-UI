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
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Card,
    CardContent,
    Stack,
    Chip
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBox from "src/components/common/loading-box";
import { addTournament } from "src/services/tournamentRequest";


export const AddFixturesDialog = ({ open, handleClose, mutate }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            Tournament: "",
            Description: "",
            Address: "",
            City: "",
            State: "",
            Country: "",
            Pincode: "",
            ContactPerson: "",
            Phone: "",
            EmailID: "",
            StartDate: "",
            EndDate: "",

        },

        validationSchema: Yup.object({
        }),

        onSubmit: async (data) => {
            setLoading(true);
            try {
                await addTournament(data).then((resp) => {
                    if (resp.status === "success") {
                        handleClose();
                        enqueueSnackbar("Tournament Added Succesfully", { variant: "success" });
                        mutate();
                        setLoading(false);
                    }
                    if (resp.status === "failed") {
                        handleClose();
                        enqueueSnackbar("Tournament Not Added", { variant: "failed" });
                        setLoading(false);
                    }
                });
            } catch (error) {
                setLoading(false);
            }
        }
    });




    return (
        <form onSubmit={formik.handleSubmit}>
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
                <DialogTitle>Tournament Fixtures</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: 2 }}>
                        {/* Enter the required basic details of the Administrative Template below. */}
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
                            <TextField
                                error={Boolean(formik.touched.Tournament && formik.errors.Tournament)}
                                fullWidth
                                helperText={formik.touched.Tournament && formik.errors.Tournament}
                                label="Name of Tournament"
                                margin="dense"
                                name="Tournament"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.Tournament}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.Description && formik.errors.Description)}
                                fullWidth
                                helperText={formik.touched.Description && formik.errors.Description}
                                label="Description"
                                margin="dense"
                                name="Description"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.Description}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.Address && formik.errors.Address)}
                                fullWidth
                                helperText={formik.touched.Address && formik.errors.Address}
                                label="Address"
                                margin="dense"
                                name="Address"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.Address}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.City && formik.errors.City)}
                                fullWidth
                                helperText={formik.touched.City && formik.errors.City}
                                label="City"
                                margin="dense"
                                name="City"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.City}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.State && formik.errors.State)}
                                fullWidth
                                helperText={formik.touched.State && formik.errors.State}
                                label="State"
                                margin="dense"
                                name="State"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.State}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.Country && formik.errors.Country)}
                                fullWidth
                                helperText={formik.touched.Country && formik.errors.Country}
                                label="Country"
                                margin="dense"
                                name="Country"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.Country}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.Pincode && formik.errors.Pincode)}
                                fullWidth
                                helperText={formik.touched.Pincode && formik.errors.Pincode}
                                label="Pincode"
                                margin="dense"
                                name="Pincode"
                                type="number"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.Pincode}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.ContactPerson && formik.errors.ContactPerson)}
                                fullWidth
                                helperText={formik.touched.ContactPerson && formik.errors.ContactPerson}
                                label="Manager's Name"
                                margin="dense"
                                name="ContactPerson"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.ContactPerson}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.Phone && formik.errors.Phone)}
                                fullWidth
                                helperText={formik.touched.Phone && formik.errors.Phone}
                                label="Manager's Phone Number"
                                margin="dense"
                                name="Phone"
                                type="text"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.Phone}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.EmailID && formik.errors.EmailID)}
                                fullWidth
                                helperText={formik.touched.EmailID && formik.errors.EmailID}
                                label="Manager's Email"
                                margin="dense"
                                name="EmailID"
                                type="email"
                                variant="outlined"
                                onChange={(e) => { formik.handleChange(e) }}
                                onBlur={formik.handleBlur}
                                value={formik.values.EmailID}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.StartDate && formik.errors.StartDate)}
                                fullWidth
                                helperText={formik.touched.StartDate && formik.errors.StartDate}
                                name="StartDate"
                                label="Tournament Start Date"
                                InputLabelProps={{ shrink: true }}
                                margin="dense"
                                onBlur={formik.handleBlur}
                                value={formik.values.StartDate}
                                onChange={formik.handleChange}
                                type="date"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.EndDate && formik.errors.EndDate)}
                                fullWidth
                                helperText={formik.touched.EndDate && formik.errors.EndDate}
                                name="EndDate"
                                label="Tournament End Date"
                                InputLabelProps={{ shrink: true }}
                                margin="dense"
                                onBlur={formik.handleBlur}
                                value={formik.values.EndDate}
                                onChange={formik.handleChange}
                                type="date"
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button type="submit" onClick={formik.handleSubmit} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};
