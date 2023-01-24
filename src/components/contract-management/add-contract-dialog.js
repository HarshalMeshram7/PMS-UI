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
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";

import DeleteIcon from '@mui/icons-material/Delete';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { IconButton, Typography } from "@mui/material";

const sportsList = [
    {
        value: "football",
        label: "Football"
    },
    {
        value: "cricket",
        label: "Cricket"
    },
    {
        value: "tennis",
        label: "Tennis"
    }
];

export const AddContractDialog = ({ open, handleClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState();

    //   Photo upload
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedPhotoName, setSelectedPhotoName] = useState("");

    const [uploadedPhoto, setUploadedPhoto] = useState(false);
    const [uploadedPhotoName, setUploadedPhotoName] = useState("");

    //  Document upload
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedDocumentName, setSelectedDocumentName] = useState("");

    const [uploadedDocument, setUploadedDocument] = useState(false);
    const [uploadedDocumentName, setUploadedDocumentName] = useState("");

    const onFileChnage = (e) => {
        if (e.target.name == "photo") {
            setUploadedPhoto(false)
            setSelectedPhoto(e.target.files[0])
            setSelectedPhotoName(e.target.files[0].name)
        }

        if (e.target.name == "document") {
            setUploadedDocument(false)
            setSelectedDocument(e.target.files[0])
            setSelectedDocumentName(e.target.files[0].name)
        }
    }

    const onFileUpload = async (file, id) => {
        setLoading(true)

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(file).then(() => {

            if (id == 1) {
                // prepare UI for results
                setUploadedPhoto(true);
                setUploadedPhotoName(selectedPhotoName);
                //   reseting selected files
                setSelectedPhoto(null);
                setSelectedPhotoName("");
            }

            if (id == 2) {
                // prepare UI for results
                setUploadedDocument(true);
                setUploadedDocumentName(selectedDocumentName);
                //   reseting selected files
                setSelectedDocument(null);
                setSelectedDocumentName("");
            }
        });
        setLoading(false)
    };

    const onDeleteFile = (fileName, id) => {
        deleteBlob(fileName)
            .then(() => {

                if (id == 1) {
                    setSelectedPhoto(null);
                    setUploadedPhotoName("");
                    setUploadedPhoto(false);
                }

                if (id == 2) {
                    setSelectedDocument(null);
                    setUploadedDocumentName("");
                    setUploadedDocument(false);
                }
            })
    }


    const formik = useFormik({
        initialValues: {
            FirstName: "",
            LastName: "",
            AcademyClub: "",
            TypeOfPlayer: "",
            Gender: "",
            DateOfBirth: "",
            Address: "",
            Phone: "",
            EducationQualification: "",
            document: "",
            photo: "",
            PlayerTeam: "",
            Email: "",
            BasePrice: "",
            PlayingPosition: "",
            TMSITMSApplicable: ""
        },
        validationSchema: Yup.object({
            FirstName: Yup
                .string()
                .max(100)
                .required("Player's First Name is required"),
            LastName: Yup
                .string()
                .max(100)
                .required("Player's Last Name is required"),
            AcademyClub: Yup
                .string()
            // .required('Required')
            ,
            TypeOfPlayer: Yup
                .string()
            // .required('Required')
            ,
            Address: Yup
                .string()
            // .required('Required')
            ,

            Phone: Yup.string()
                .length(10)
                .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Phone number is not valid')
                .required("Phone number is required"),
            EducationQualification: Yup
                .string()
                .max(255)
            // .required("Email is required")
            ,
            document: Yup
                .string()
                .max(255)
            // .required("Email is required")
            ,
            photo: Yup
                .string()
                .max(255)
            // .required("Email is required")
            ,
            PlayerTeam: Yup
                .string()
                .max(255)
            // .required("Email is required")
            ,
            Email: Yup
                .string()
                .email("Must be a valid Email")
                .max(255)
                .required("Email is required"),

            BasePrice: Yup
                .string()
                .max(100),
            PlayingPosition: Yup
                .string()
                .max(100),
            TMSITMSApplicable: Yup
                .string()
                .max(100),

        }),

        onSubmit: async (data) => {
            setLoading(true);

            try {
                let finalData = { ...data, photo: handlePriview(uploadedPhotoName), document: handlePriview(uploadedDocumentName) }
                console.log(finalData);
                // await addAcademy(data);
                handleClose();
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
                <DialogTitle>Add New Contract</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: 2 }}>
                        Enter the required basic details of the Contract below.
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
                                error={Boolean(formik.touched.AcademyClub && formik.errors.AcademyClub)}
                                fullWidth
                                helperText={formik.touched.AcademyClub && formik.errors.AcademyClub}
                                label="Academy / Club"
                                margin="dense"
                                name="AcademyClub"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.AcademyClub}
                                variant="outlined"
                            />
                        </Grid>


                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.TypeOfPlayer && formik.errors.TypeOfPlayer)}
                                fullWidth
                                helperText={formik.touched.TypeOfPlayer && formik.errors.TypeOfPlayer}
                                label="Type Of Player"
                                margin="dense"
                                name="TypeOfPlayer"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.TypeOfPlayer}
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
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
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
                                label="Date Of Birth"
                                margin="dense"
                                InputLabelProps={{ shrink: true }}
                                name="DateOfBirth"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values.DateOfBirth}
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
                                error={Boolean(formik.touched.Phone && formik.errors.Phone)}
                                fullWidth
                                helperText={formik.touched.Phone && formik.errors.Phone}
                                label="Phone Number"
                                margin="dense"
                                name="Phone"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.Phone}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.EducationQualification && formik.errors.EducationQualification)}
                                fullWidth
                                helperText={formik.touched.EducationQualification && formik.errors.EducationQualification}
                                label="Educational Qualification"
                                margin="dense"
                                name="EducationQualification"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.EducationQualification}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PlayerTeam && formik.errors.PlayerTeam)}
                                fullWidth
                                helperText={formik.touched.PlayerTeam && formik.errors.PlayerTeam}
                                label="Player Team"
                                margin="dense"
                                name="PlayerTeam"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PlayerTeam}
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
                                error={Boolean(formik.touched.BasePrice && formik.errors.BasePrice)}
                                fullWidth
                                helperText={formik.touched.BasePrice && formik.errors.BasePrice}
                                label="Base Price"
                                margin="dense"
                                name="BasePrice"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.BasePrice}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PlayingPosition && formik.errors.PlayingPosition)}
                                fullWidth
                                helperText={formik.touched.PlayingPosition && formik.errors.PlayingPosition}
                                label="Playing Position"
                                margin="dense"
                                name="PlayingPosition"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PlayingPosition}
                                variant="outlined"
                            />
                        </Grid>

                        {/* <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Sports List</InputLabel>
                                <Select
                                    multiple
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formik.values.sportsList}
                                    label="Sports List"
                                    name="sportsList"
                                    onChange={formik.handleChange}
                                >
                                    {sportsList?.map((option, key) => (
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
                                error={Boolean(formik.touched.TMSITMSApplicable && formik.errors.TMSITMSApplicable)}
                                fullWidth
                                helperText={formik.touched.TMSITMSApplicable && formik.errors.TMSITMSApplicable}
                                label=" TMS / ITMS Applicable"
                                margin="dense"
                                name="TMSITMSApplicable"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.TMSITMSApplicable}
                                variant="outlined"
                            />
                        </Grid>


                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                style={{ display: "none" }}
                                error={Boolean(formik.touched.photo && formik.errors.photo)}
                                fullWidth
                                helperText={formik.touched.photo && formik.errors.photo}
                                label="Photo"
                                margin="dense"
                                id="uploadContractPhoto"
                                name="photo"
                                InputLabelProps={{ shrink: true }}
                                onBlur={formik.handleBlur}
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.photo}
                                variant="outlined"
                            />

                            <Button
                                onClick={() => {
                                    document.getElementById("uploadContractPhoto").click();
                                }}
                            >
                                Upload Photo
                            </Button>

                            <Button disabled>
                                <Typography>{selectedPhotoName}</Typography>
                            </Button>
                            {uploadedPhoto ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedPhoto} onClick={(e) => {
                                onFileUpload(selectedPhoto, 1)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedPhoto ? <><Button target="blank" href={handlePriview(uploadedPhotoName)}>
                                <Typography>{uploadedPhotoName}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedPhotoName, 1)
                                }} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton></> : ""}

                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.document && formik.errors.document)}
                                fullWidth
                                helperText={formik.touched.document && formik.errors.document}
                                label="Document"
                                margin="dense"
                                id="uploadContractDocument"
                                style={{ display: "none" }}
                                InputLabelProps={{ shrink: true }}
                                name="document"
                                onBlur={formik.handleBlur}
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.document}
                                variant="outlined"
                            />
                            <Button
                                onClick={() => {
                                    document.getElementById("uploadContractDocument").click();
                                }}
                            >
                                Upload Document
                            </Button>

                            <Button disabled>
                                <Typography>{selectedDocumentName}</Typography>
                            </Button>
                            {uploadedDocument ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedDocument} onClick={(e) => {
                                onFileUpload(selectedDocument, 2)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedDocument ? <><Button target="blank" href={handlePriview(uploadedDocumentName)}>
                                <Typography>{uploadedDocumentName}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedDocumentName, 2)
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
        </Dialog>
    );
};
