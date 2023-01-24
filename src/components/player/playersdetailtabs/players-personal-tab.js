import React from "react";
// import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

import DeleteIcon from '@mui/icons-material/Delete';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { IconButton, } from "@mui/material";

export default function PlayerDetailsTab({ formik }) {

    const [loading, setLoading] = useState();

    //   Photo upload
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedPhotoName, setSelectedPhotoName] = useState("");

    const [uploadedPhoto, setUploadedPhoto] = useState(false);
    const [uploadedPhotoName, setUploadedPhotoName] = useState("");

    //  Document banner
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



    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: {
    //         FirstName: "",
    //         LastName: "",
    //         AcademyClub: "",
    //         TypeOfPlayer: "",
    //         Gender: "",
    //         DateOfBirth: "",
    //         Address: "",
    //         Phone: "",
    //         EducationQualification: "",
    //         document: "",
    //         photo: "",
    //         PlayerTeam: "",
    //         Facebook: "",
    //         Twitter: "",
    //         LinkedIn: "",
    //         Email: "",
    //         BasePrice: "",
    //         PlayingPosition: "",
    //         TMSITMSApplicable: "",
    //         ParentName: "",
    //         ParentAddress: "",
    //         ParentEmail: "",
    //         ParentPhone: "",
    //     },
    //     validationSchema: Yup.object({}),

    //     onSubmit: async (data) => {
    //         try {
    //             let finalData = { ...data, photo: handlePriview(uploadedPhotoName), document: handlePriview(uploadedDocumentName) }
    //             console.log(finalData);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     },
    // });

    return (
        <>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Card>
                <CardContent>

                    <Grid
                        container
                        spacing={3}
                        sx={{ marginBottom: 2 }}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalFirstName && formik.errors.PersonalFirstName)}
                                fullWidth
                                helperText={formik.touched.PersonalFirstName && formik.errors.PersonalFirstName}
                                label="First Name"
                                margin="dense"
                                name="PersonalFirstName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalFirstName}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalLastName && formik.errors.PersonalLastName)}
                                fullWidth
                                helperText={formik.touched.PersonalLastName && formik.errors.PersonalLastName}
                                label="Last Name"
                                margin="dense"
                                name="PersonalLastName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalLastName}
                                variant="outlined"
                            />
                        </Grid>

                        {/* <Grid
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
                            </Grid> */}

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type Of Player</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Type Of Player"
                                    error={Boolean(formik.touched.PersonalTypeOfPlayerID && formik.errors.PersonalTypeOfPlayerID)}
                                    fullWidth
                                    helperText={formik.touched.PersonalTypeOfPlayerID && formik.errors.PersonalTypeOfPlayerID}
                                    margin="dense"
                                    name="PersonalTypeOfPlayerID"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.PersonalTypeOfPlayerID}
                                    variant="outlined"
                                >
                                    <MenuItem value="1">Professional</MenuItem>
                                    <MenuItem value="1">Non Professional</MenuItem>
                                    <MenuItem value="3">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Gender"
                                    error={Boolean(formik.touched.PersonalGender && formik.errors.PersonalGender)}
                                    fullWidth
                                    helperText={formik.touched.PersonalGender && formik.errors.PersonalGender}
                                    margin="dense"
                                    name="PersonalGender"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.PersonalGender}
                                    variant="outlined"
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
                                error={Boolean(formik.touched.PersonalDateOfBirth && formik.errors.PersonalDateOfBirth)}
                                fullWidth
                                helperText={formik.touched.PersonalDateOfBirth && formik.errors.PersonalDateOfBirth}
                                label="Date Of Birth"
                                margin="dense"
                                name="PersonalDateOfBirth"
                                InputLabelProps={{ shrink: true }}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values.PersonalDateOfBirth}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.Address1 && formik.errors.Address1)}
                                fullWidth
                                helperText={formik.touched.Address1 && formik.errors.Address1}
                                label="Address"
                                margin="dense"
                                name="Address1"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.Address1}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalPhone && formik.errors.PersonalPhone)}
                                fullWidth
                                helperText={formik.touched.PersonalPhone && formik.errors.PersonalPhone}
                                label="Phone Number"
                                margin="dense"
                                name="PersonalPhone"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.PersonalPhone}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalEducationQualification && formik.errors.PersonalEducationQualification)}
                                fullWidth
                                helperText={formik.touched.PersonalEducationQualification && formik.errors.PersonalEducationQualification}
                                label="Educational Qualification"
                                margin="dense"
                                name="PersonalEducationQualification"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalEducationQualification}
                                variant="outlined"
                            />
                        </Grid>

                        {/* <Grid
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
                            </Grid> */}

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalEmail && formik.errors.PersonalEmail)}
                                fullWidth
                                helperText={formik.touched.PersonalEmail && formik.errors.PersonalEmail}
                                label="Email"
                                margin="dense"
                                name="PersonalEmail"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.PersonalEmail}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalFacebook && formik.errors.PersonalFacebook)}
                                fullWidth
                                helperText={formik.touched.PersonalFacebook && formik.errors.PersonalFacebook}
                                label="Facebook"
                                margin="dense"
                                name="PersonalFacebook"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalFacebook}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalTwitter && formik.errors.PersonalTwitter)}
                                fullWidth
                                helperText={formik.touched.PersonalTwitter && formik.errors.PersonalTwitter}
                                label="Twitter"
                                margin="dense"
                                name="PersonalTwitter"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalTwitter}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalLinkedIn && formik.errors.PersonalLinked)}
                                fullWidth
                                helperText={formik.touched.PersonalLinkedIn && formik.errors.PersonalLinked}
                                label="LinkedIn"
                                margin="dense"
                                name="PersonalLinkedIn"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalLinkedIn}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalBasePrice && formik.errors.PersonalBasePrice)}
                                fullWidth
                                helperText={formik.touched.PersonalBasePrice && formik.errors.PersonalBasePrice}
                                label="Base Price"
                                margin="dense"
                                name="PersonalBasePrice"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.PersonalBasePrice}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalPlayingPosition && formik.errors.PersonalPlayingPosition)}
                                fullWidth
                                helperText={formik.touched.PersonalPlayingPosition && formik.errors.PersonalPlayingPosition}
                                label="Playing Position"
                                margin="dense"
                                name="PersonalPlayingPosition"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalPlayingPosition}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.PersonalTMSITMSApplicable && formik.errors.PersonalTMSITMSApplicable)}
                                fullWidth
                                helperText={formik.touched.PersonalTMSITMSApplicable && formik.errors.PersonalTMSITMSApplicable}
                                label=" TMS / ITMS Applicable"
                                margin="dense"
                                name="PersonalTMSITMSApplicable"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.PersonalTMSITMSApplicable}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        ></Grid>


                        {/* <Grid
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
                                    name="photo"
                                    InputLabelProps={{ shrink: true }}
                                    onBlur={formik.handleBlur}
                                    onChange={onFileChnage}
                                    id="uploadPlayerPersonalDetailPhoto"
                                    type="file"
                                    value={formik.values.photo}
                                    variant="outlined"
                                />

                                <Button
                                    onClick={() => {
                                        document.getElementById("uploadPlayerPersonalDetailPhoto").click();
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
                            </Grid> */}


                        {/* <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField

                                    style={{ display: "none" }}
                                    error={Boolean(formik.touched.documents && formik.errors.documents)}
                                    fullWidth
                                    helperText={formik.touched.documents && formik.errors.documents}
                                    label="Documents"
                                    margin="dense"
                                    name="documents"
                                    id="uploadPlayerPersonalDetailDocument"
                                    InputLabelProps={{ shrink: true }}
                                    onBlur={formik.handleBlur}
                                    onChange={onFileChnage}
                                    type="file"
                                    value={formik.values.documents}
                                    variant="outlined"
                                />
                                
                                <Button
                                    onClick={() => {
                                        document.getElementById("uploadPlayerPersonalDetailDocument").click();
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
                            </Grid> */}

                    </Grid>
                    <Divider />

                    <DialogTitle
                        textAlign="center">
                        Parents Details (Optional)
                    </DialogTitle>

                    <Grid container
                        spacing={3}>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.familyinfoName && formik.errors.familyinfoName)}
                                fullWidth
                                helperText={formik.touched.familyinfoName && formik.errors.familyinfoName}
                                label="Parents Name"
                                margin="dense"
                                name="familyinfoName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.familyinfoName}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.familyinfoCity && formik.errors.familyinfoCity)}
                                fullWidth
                                helperText={formik.touched.familyinfoCity && formik.errors.familyinfoCity}
                                label="Parents Address"
                                margin="dense"
                                name="familyinfoCity"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.familyinfoCity}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.familyinfoEmail && formik.errors.familyinfoEmail)}
                                fullWidth
                                helperText={formik.touched.familyinfoEmail && formik.errors.familyinfoEmail}
                                label="Parents Email"
                                margin="dense"
                                name="familyinfoEmail"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                value={formik.values.familyinfoEmail}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.familyinfoMobileNo && formik.errors.familyinfoMobileNo)}
                                fullWidth
                                helperText={formik.touched.familyinfoMobileNo && formik.errors.familyinfoMobileNo}
                                label="Parents Phone Number"
                                margin="dense"
                                name="familyinfoMobileNo"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.familyinfoMobileNo}
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>
                    <Grid item md={12} xs={12} textAlign="center">
                        <Button sx={{ marginTop: 2 }} onClick={formik.handleSubmit} variant="outlined" color="primary">
                            Save
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
            {/* </form> */}
        </>
    );
}
