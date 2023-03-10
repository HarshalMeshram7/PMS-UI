import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Autocomplete,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Grid,
    Select,
    Container,
    MenuItem,
    Box,
    Snackbar,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";
import { parseWithOptions } from "date-fns/fp";
import { OnlinePredictionSharp } from "@mui/icons-material";

export const AddClubDialog = ({ open, handleClose, mutate }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    const formik = useFormik({
        initialValues: {
            clubName: "Academy12",
            address: "Address",
            phone: "8208793805",
            email: "@gmail.com",
            personName: "Person name",
            logo: "",
            banner: "",
            accreditation: "accreditation",
            password: "Monish@1995",
            cnfpassword: "Monish@1995"
        },
        validationSchema: Yup.object({
            clubName: Yup
                .string()
                .max(30, "Not more than 30 characters")
                .required("Club Name is required"),

            address: Yup.string().max(50, "Not more than 50 characters").required('Address required'),

            phone: Yup.string()
                .length(10)
                // .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Phone number is not valid')
            .required("Phone number is required"),
            
            email: Yup
                .string()
                .email("Must be a valid Email")
                .max(35, "Not more than 35 characters").required("Email is required"),

            personName: Yup
                .string()
                .max(30, "Not more than 30 characters")
            .required("Person Name is required")
            ,
            accreditation: Yup
                .string()
                .max(30, "Not more than 30 characters"),
            password: Yup
                .string()
                .max(20, "Maximum 20 characters")
                .required('Password is required')
                .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/, " Must have uppercase, lowecase, special character and no space allowed"),
            cnfpassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),

        onSubmit: async (data) => {
            setLoading(true);
            try {
                await addAcademy(data).then((resp) => {
                    if (resp.status === "success") {
                        handleClose();
                        enqueueSnackbar("Club Added Succesfully", { variant: "success" });
                        mutate();
                        setLoading(false);
                    }
                    if (resp.status === "failed") {
                        handleClose();
                        enqueueSnackbar("Club Not Added", { variant: "failed" });
                        setLoading(false);
                    }
                })
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
                <DialogTitle>Add New Club</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: 2 }}>
                        Enter the required basic details of the Club below.
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
                                error={Boolean(formik.touched.clubName && formik.errors.clubName)}
                                fullWidth
                                helperText={formik.touched.clubName && formik.errors.clubName}
                                label="Name"
                                margin="dense"
                                name="clubName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.clubName}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.address && formik.errors.address)}
                                fullWidth
                                helperText={formik.touched.address && formik.errors.address}
                                label="Address"
                                margin="dense"
                                name="address"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="address"
                                value={formik.values.address}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.phone && formik.errors.phone)}
                                fullWidth
                                helperText={formik.touched.phone && formik.errors.phone}
                                label="Phone Number"
                                margin="dense"
                                name="phone"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="phone"
                                value={formik.values.phone}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                fullWidth
                                helperText={formik.touched.email && formik.errors.email}
                                label="Email"
                                margin="dense"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.email}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.personName && formik.errors.personName)}
                                fullWidth
                                helperText={formik.touched.personName && formik.errors.personName}
                                label="Person Name"
                                margin="dense"
                                name="personName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.personName}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.accreditation && formik.errors.accreditation)}
                                fullWidth
                                helperText={formik.touched.accreditation && formik.errors.accreditation}
                                label="Accreditation"
                                margin="dense"
                                name="accreditation"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.accreditation}
                                variant="outlined"
                            />
                        </Grid>

                                                <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Create Password"
                                margin="dense"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.cnfpassword && formik.errors.cnfpassword)}
                                fullWidth
                                helperText={formik.touched.cnfpassword && formik.errors.cnfpassword}
                                label="Confirm Password"
                                margin="dense"
                                name="cnfpassword"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.cnfpassword}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
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
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField style={{ display: 'none' }}
                                error={Boolean(formik.touched.banner && formik.errors.banner)}
                                fullWidth
                                helperText={formik.touched.banner && formik.errors.banner}
                                label="Banner"
                                id="uploadClubBanner"
                                margin="dense"
                                name="banner"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="file"
                                value={formik.values.banner}
                                variant="outlined"
                            />
                            <Button onClick={() => { document.getElementById("uploadClubBanner").click() }}>Upload Banner</Button>
                        </Grid>
                        <Grid />
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
