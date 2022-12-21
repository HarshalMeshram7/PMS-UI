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
    Typography,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";
import DeleteIcon from '@mui/icons-material/Delete';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { addTeam } from "src/services/teamRequest";
import { useAllClubs } from "src/adapters/clubAdapter";
import { getClubSportsByClubID } from "src/services/clubRequest";


// const clubsportsID = [
//     {
//         value: "football",
//         label: "Football"
//     },
//     {
//         value: "cricket",
//         label: "Cricket"
//     },
//     {
//         value: "tennis",
//         label: "Tennis"
//     }
// ];

export const AddTeamDialog = ({ open, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    //   logo upload
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [selectedLogoName, setSelectedLogoName] = useState("");

    const [uploadedLogo, setUploadedLogo] = useState(false);
    const [uploadedLogoName, setUploadedLogoName] = useState("");

    //  banner banner
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [selectedBannerName, setSelectedBannerName] = useState("");

    const [uploadedBanner, setUploadedBanner] = useState(false);
    const [uploadedBannerName, setUploadedBannerName] = useState("");

    const [clubSports, setClubSports] = useState([])

    const onFileChnage = (e) => {
        if (e.target.name == "logo") {
            setUploadedLogo(false)
            setSelectedLogo(e.target.files[0])
            setSelectedLogoName(e.target.files[0].name)
        }

        if (e.target.name == "banner") {
            setUploadedBanner(false)
            setSelectedBanner(e.target.files[0])
            setSelectedBannerName(e.target.files[0].name)
        }
    }
    const onFileUpload = async (file, id) => {
        setLoading(true)

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(file).then(() => {

            if (id == 1) {
                // prepare UI for results
                setUploadedLogo(true);
                setUploadedLogoName(selectedLogoName);
                //   reseting selected files
                setSelectedLogo(null);
                setSelectedLogoName("");
            }

            if (id == 2) {
                // prepare UI for results
                setUploadedBanner(true);
                setUploadedBannerName(selectedBannerName);
                //   reseting selected files
                setSelectedBanner(null);
                setSelectedBannerName("");
            }

        });

        setLoading(false)
    };

    const onDeleteFile = (fileName, id) => {
        deleteBlob(fileName)
            .then(() => {

                if (id == 1) {
                    setSelectedLogo(null);
                    setUploadedLogoName("");
                    setUploadedLogo(false);
                }

                if (id == 2) {
                    setSelectedBanner(null);
                    setUploadedBannerName("");
                    setUploadedBanner(false);
                }

            })

    }

    const onClubChange = (e) => {
        getClubSportsByClubID({ Id: e.target.value }).then((res) => {
            console.log(res);
            setClubSports(res)
        })

    }


    const formik = useFormik({
        initialValues: {
            team: "Sultan 11",
            address: "not in db",
            phone: "000000000",
            email: "notindb@gmail.com",
            personName: "not in db",
            logo: "",
            banner: "",
            accreditation: "not in db",
            facebook: "Face",
            twitter: "Twitt",
            instagram: "not in db",
            clubsportsID: [],
            club: "",
            password: "Wasif@1234",
            cnfpassword: "Wasif@1234"
        },
        validationSchema: Yup.object({
            team:
                Yup.string().max(30, "Not more than 30 characters").required("Federation Name is required"),

            address: Yup.string().max(50, "Not more than 50 characters")
            // .required('Address required')
            ,

            phone: Yup.string()
                .length(10)
                // .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Phone number is not valid')
                .required("Phone number is required")
            ,
            email: Yup
                .string()
                .email("Must be a valid Email")
                .max(35, "Not more than 35 characters")
                .required("Email is required")
            ,
            personName: Yup
                .string()
                .max(30, "Not more than 30 characters")
                .required("Contact Person Name is required"),

            accreditation: Yup
                .string()
                .max(30, "Not more than 30 characters"),
            accreditation: Yup
                .string()
                .max(30, "Not more than 30 characters"),
            facebook: Yup
                .string()
                .max(30, "Not more than 30 characters"),
            twitter: Yup
                .string()
                .max(30, "Not more than 30 characters"),
            instagram: Yup
                .string()
                .max(30, "Not more than 30 characters"),
            // sportsList: Yup
            //     .string()
            //     .max(100)
            //     // .required("Sport List is required")
            //     ,
            password: Yup
                .string()
                .max(20, "Maximum 20 characters")
                .required('Password is required')
                .min(8, "Minimum 8 characters")
                .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/, " Must have uppercase, lowecase, special character and no space allowed")
            ,
            cnfpassword: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')

        }),
        onSubmit: async (data) => {
            setLoading(true);

            try {
                let finalData = { ...data, logo: handlePriview(uploadedLogoName), banner: handlePriview(uploadedBannerName) }
                console.log(finalData);
                await addTeam(finalData).then((resp) => {
                    if (resp.status === "success") {
                        handleClose();
                        enqueueSnackbar("Team Added Succesfully", { variant: "success" });
                        mutate();
                        setLoading(false);
                    }
                    if (resp.status === "failed") {
                        handleClose();
                        enqueueSnackbar("Team Not Added", { variant: "failed" });
                        setLoading(false);
                    }
                });
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

    const { clubs } = useAllClubs()


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
                <DialogTitle>Add New team</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: 2 }}>
                        Enter the required basic details of the team below.
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Select Club</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.club}
                                    label="Select Club"
                                    name="club"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        onClubChange(e)
                                    }}
                                >
                                    {clubs?.map((option, key) => {
                                        return (
                                            <MenuItem key={key}
                                                value={option.ID}>
                                                {option.name}
                                            </MenuItem>
                                        )
                                    }
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Select Club Sports</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.clubsportsID}
                                    label="Select Club Sports"
                                    name="clubsportsID"
                                    onChange={formik.handleChange}
                                >
                                    {clubSports?.map((option, key) => {
                                        return (
                                            <MenuItem key={key}
                                                value={option.ID}>
                                                {option.Sports}
                                            </MenuItem>
                                        )
                                    }
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.team && formik.errors.team)}
                                fullWidth
                                helperText={formik.touched.team && formik.errors.team}
                                label="Name"
                                margin="dense"
                                name="team"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.team}
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
                                error={Boolean(formik.touched.facebook && formik.errors.facebook)}
                                fullWidth
                                helperText={formik.touched.facebook && formik.errors.facebook}
                                label="Facebook"
                                margin="dense"
                                name="facebook"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.facebook}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.twitter && formik.errors.twitter)}
                                fullWidth
                                helperText={formik.touched.twitter && formik.errors.twitter}
                                label="Twitter"
                                margin="dense"
                                name="twitter"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.twitter}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.instagram && formik.errors.instagram)}
                                fullWidth
                                helperText={formik.touched.instagram && formik.errors.instagram}
                                label="Instagram"
                                margin="dense"
                                name="instagram"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.instagram}
                                variant="outlined"
                            />
                        </Grid>

                        {/* <TextField
                        error={Boolean(formik.touched.sportsList && formik.errors.sportsList)}
                        fullWidth
                        helperText={formik.touched.sportsList && formik.errors.sportsList}
                        label="Sports List"
                        margin="dense"
                        name="sportsList"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.sportsList}
                        variant="outlined"
                        required
                    /> */}

                        {/* <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Sports List</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.sportsList}
                                    label="Sports List"
                                    name="sportsList"
                                    onChange={formik.handleChange}
                                >
                                    {clubsportsID?.map((option, key) => (
                                        <MenuItem key={key}
                                            value={option.label}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}

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
                                required
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
                                id="uploadTeamLogo"
                                margin="dense"
                                name="logo"
                                // onBlur={formik.handleBlur}
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.logo}
                                variant="outlined"
                            />
                            <Button onClick={() => { document.getElementById("uploadTeamLogo").click() }}>Upload Logo</Button>

                            <Button disabled>
                                <Typography>{selectedLogoName}</Typography>
                            </Button>
                            {uploadedLogo ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedLogo} onClick={(e) => {
                                onFileUpload(selectedLogo, 1)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedLogo ? <><Button target="blank" href={handlePriview(uploadedLogoName)}>
                                <Typography>{uploadedLogoName}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedLogoName, 1)
                                }} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton></> : ""}

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
                                id="uploadTeamBanner"
                                margin="dense"
                                name="banner"
                                onBlur={formik.handleBlur}
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.banner}
                                variant="outlined"
                            />
                            <Button onClick={() => { document.getElementById("uploadTeamBanner").click() }}>Upload Banner</Button>

                            <Button disabled>
                                <Typography>{selectedBannerName}</Typography>
                            </Button>
                            {uploadedBanner ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedBanner} onClick={(e) => {
                                onFileUpload(selectedBanner, 2)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedBanner ? <><Button target="blank" href={handlePriview(uploadedBannerName)}>
                                <Typography>{uploadedBannerName}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedBannerName, 2)
                                }} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton></> : ""}

                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button type="submit" variant="contained">Add</Button>
                </DialogActions>
            </form>
        </Dialog >
    );
};
