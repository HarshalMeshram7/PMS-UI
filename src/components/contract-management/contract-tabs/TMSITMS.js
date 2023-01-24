import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { IconButton, Typography } from "@mui/material";

export default function TMS_ITMSTab() {

    const [loading, setLoading] = useState();

    //  Document upload
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedDocumentName, setSelectedDocumentName] = useState("");

    const [uploadedDocument, setUploadedDocument] = useState(false);
    const [uploadedDocumentName, setUploadedDocumentName] = useState("");

    //MOU upload
    const [selectedMOU, setSelectedMOU] = useState(null);
    const [selectedMOUName, setSelectedMOUName] = useState("");

    const [uploadedMOU, setUploadedMOU] = useState(false);
    const [uploadedMOUName, setUploadedMOUName] = useState("");

    //  Agreement upload
    const [selectedAgreement, setSelectedAgreement] = useState(null);
    const [selectedAgreementName, setSelectedAgreementName] = useState("");

    const [uploadedAgreement, setUploadedAgreement] = useState(false);
    const [uploadedAgreementName, setUploadedAgreementName] = useState("");


    const onFileChnage = (e) => {

        if (e.target.name == "document") {
            setUploadedDocument(false)
            setSelectedDocument(e.target.files[0])
            setSelectedDocumentName(e.target.files[0].name)
        }

        if (e.target.name == "mou") {
            setUploadedMOU(false)
            setSelectedMOU(e.target.files[0])
            setSelectedMOUName(e.target.files[0].name)
        }

        if (e.target.name == "agreement") {
            setUploadedAgreement(false)
            setSelectedAgreement(e.target.files[0])
            setSelectedAgreementName(e.target.files[0].name)
        }
    }

    const onFileUpload = async (file, id) => {
        setLoading(true)

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(file).then(() => {

            if (id == 2) {
                // prepare UI for results
                setUploadedDocument(true);
                setUploadedDocumentName(selectedDocumentName);
                //   reseting selected files
                setSelectedDocument(null);
                setSelectedDocumentName("");
            }

            if (id == 3) {
                // prepare UI for results
                setUploadedAgreement(true);
                setUploadedAgreementName(selectedAgreementName);
                //   reseting selected files
                setSelectedAgreement(null);
                setSelectedAgreementName("");
            }

            if (id == 4) {
                // prepare UI for results
                setUploadedMOU(true);
                setUploadedMOUName(selectedMOUName);
                //   reseting selected files
                setSelectedMOU(null);
                setSelectedMOUName("");
            }
        });
        setLoading(false)
    };

    const onDeleteFile = (fileName, id) => {
        deleteBlob(fileName)
            .then(() => {

                if (id == 2) {
                    setSelectedDocument(null);
                    setUploadedDocumentName("");
                    setUploadedDocument(false);
                }

                if (id == 3) {
                    setSelectedAgreement(null);
                    setUploadedAgreementName("");
                    setUploadedAgreement(false);
                }

                if (id == 4) {
                    setSelectedMOU(null);
                    setUploadedMOUName("");
                    setUploadedMOU(false);
                }

            })
    };



    const formik = useFormik({
        initialValues: {
            TransferredToWhichClub: "",
            PeriodOfTransfer: "",
            document: "",
            mou: "",
            agreement: "",
            PaymentDetails: "",

        },
        validationSchema: Yup.object({}),

        onSubmit: async (data) => {
            try {
                let finalData = {
                    ...data, mou: handlePriview(uploadedMOUName), document: handlePriview(uploadedDocumentName),
                    agreement: handlePriview(uploadedAgreementName)
                }
                console.log(finalData);
                handleClose();
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>

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
                                    error={Boolean(formik.touched.TransferredToWhichClub && formik.errors.TransferredToWhichClub)}
                                    fullWidth
                                    helperText={formik.touched.TransferredToWhichClub && formik.errors.TransferredToWhichClub}
                                    label="Transferred To Which Club"
                                    margin="dense"
                                    name="TransferredToWhichClub"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.TransferredToWhichClub}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.PeriodOfTransfer && formik.errors.PeriodOfTransfer)}
                                    fullWidth
                                    helperText={formik.touched.PeriodOfTransfer && formik.errors.PeriodOfTransfer}
                                    label="Period Of Transfer"
                                    margin="dense"
                                    name="PeriodOfTransfer"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.PeriodOfTransfer}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.PaymentDetails && formik.errors.PaymentDetails)}
                                    fullWidth
                                    helperText={formik.touched.PaymentDetails && formik.errors.PaymentDetails}
                                    label="Payment Details"
                                    margin="dense"
                                    name="PaymentDetails"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.PaymentDetails}
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
                                    error={Boolean(formik.touched.document && formik.errors.document)}
                                    fullWidth
                                    id="uploadContractTMSITMSDocument"
                                    helperText={formik.touched.document && formik.errors.document}
                                    label="Document"
                                    margin="dense"
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
                                        document.getElementById("uploadContractTMSITMSDocument").click();
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

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    style={{ display: "none" }}
                                    error={Boolean(formik.touched.mou && formik.errors.mou)}
                                    fullWidth
                                    helperText={formik.touched.mou && formik.errors.mou}
                                    label="MOU"
                                    margin="dense"
                                    name="mou"
                                    id="uploadContractTMSITMSMOU"
                                    onBlur={formik.handleBlur}
                                    onChange={onFileChnage}
                                    type="file"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.mou}
                                    variant="outlined"
                                />

                                <Button
                                    onClick={() => {
                                        document.getElementById("uploadContractTMSITMSMOU").click();
                                    }}
                                >
                                    Upload MOU
                                </Button>

                                <Button disabled>
                                    <Typography>{selectedMOUName}</Typography>
                                </Button>
                                {uploadedMOU ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedMOU} onClick={(e) => {
                                    onFileUpload(selectedMOU, 4)
                                }} >Upload</Button>}

                                <br></br>

                                {uploadedMOU ? <><Button target="blank" href={handlePriview(uploadedMOUName)}>
                                    <Typography>{uploadedMOUName}</Typography>
                                </Button>
                                    <IconButton onClick={() => {
                                        onDeleteFile(uploadedMOUName, 4)
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
                                    style={{ display: "none" }}
                                    error={Boolean(formik.touched.agreement && formik.errors.agreement)}
                                    fullWidth
                                    helperText={formik.touched.agreement && formik.errors.agreement}
                                    label="Agreement"
                                    margin="dense"
                                    name="agreement"                                    
                                    id="uploadContractTMSITMSAgreement"
                                    onBlur={formik.handleBlur}
                                    onChange={onFileChnage}
                                    type="file"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.agreement}
                                    variant="outlined"
                                />

                                <Button
                                    onClick={() => {
                                        document.getElementById("uploadContractTMSITMSAgreement").click();
                                    }}
                                >
                                    Upload Agreement
                                </Button>

                                <Button disabled>
                                    <Typography>{selectedAgreementName}</Typography>
                                </Button>
                                {uploadedAgreement ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedAgreement} onClick={(e) => {
                                    onFileUpload(selectedAgreement, 3)
                                }} >Upload</Button>}

                                <br></br>

                                {uploadedAgreement ? <><Button target="blank" href={handlePriview(uploadedAgreementName)}>
                                    <Typography>{uploadedAgreementName}</Typography>
                                </Button>
                                    <IconButton onClick={() => {
                                        onDeleteFile(uploadedAgreementName, 3)
                                    }} aria-label="delete" size="large">
                                        <DeleteIcon />
                                    </IconButton></> : ""}

                            </Grid>

                            <Grid item md={12} xs={12} textAlign="center">
                                <Button type="submit" variant="outlined" color="primary">
                                    Save
                                </Button>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </form>
        </>
    );
}
