import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Grid,
    Autocomplete
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBox from "src/components/common/loading-box";

const Gender = [
    {
        value: "1",
        label: "Male"
    },
    {
        value: "2",
        label: "Female"
    },
    {
        value: "0",
        label: "Other"
    }
];

export const AddCoachDialog = ({ open, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    const formik = useFormik({
        initialValues: {
            FirstName: "",
            LastName: "",
            Address: "",
            ContactNo: "",
            Email: "",
            // DateOfBirth: "1990-12-25",
            DateOfBirth: "",
            Gender: [],
        },

        validationSchema: Yup.object({
            
        }),

        onSubmit: async (data) => {
            setLoading(true);

            try {

                console.log("**********");
                console.log(data);
                // await addAcademy(data);
                handleClose();
                enqueueSnackbar("Coach Registered Succesfully", { variant: "success" });

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (!open) {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={!loading && handleClose}
            fullWidth
            maxWidth="lg"
            BackdropProps={{
                style: { backgroundColor: "#121212dd" },
            }}
        >
            {loading && <LoadingBox />}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>Add New Coach</DialogTitle>

                <DialogContent>

                    <DialogContentText sx={{ marginBottom: 2 }}>
                        Enter the required basic details of the Coach below.
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
                                error={Boolean(formik.touched.FirstName && formik.errors.FirstName)}
                                fullWidth
                                helperText={formik.touched.FirstName && formik.errors.FirstName}
                                label="First Name"
                                margin="dense"
                                name="FirstName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.FirstName}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.LastName && formik.errors.LastName)}
                                fullWidth
                                helperText={formik.touched.LastName && formik.errors.LastName}
                                label="Last Name"
                                margin="dense"
                                name="LastName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.LastName}
                                variant="outlined"
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
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.Address}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.DateOfBirth && formik.errors.DateOfBirth)}
                                fullWidth
                                helperText={formik.touched.DateOfBirth && formik.errors.DateOfBirth}
                                name="DateOfBirth"
                                label="Date of Birth"
                                InputLabelProps={{ shrink: true }}
                                margin="dense"
                                onBlur={formik.handleBlur}
                                value={formik.values.DateOfBirth}
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
                                error={Boolean(formik.touched.Email && formik.errors.Email)}
                                fullWidth
                                helperText={formik.touched.Email && formik.errors.Email}
                                label="Email"
                                margin="dense"
                                name="Email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.Email}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.ContactNo && formik.errors.ContactNo)}
                                fullWidth
                                helperText={formik.touched.ContactNo && formik.errors.ContactNo}
                                label="Phone Number"
                                margin="dense"
                                name="ContactNo"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.ContactNo}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.Gender}
                                    name="Gender"
                                    label="Gender"
                                    onChange={formik.handleChange}
                                >
                                    {Gender?.map((option , key) => (
                                        <MenuItem key={key}
                                            value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button type="submit" variant="contained">Add</Button>
                </DialogActions>

            </form>
        </Dialog>
    );
};

