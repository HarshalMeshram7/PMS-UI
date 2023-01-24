import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button, Card, CardContent } from "@mui/material";

import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { IconButton, Typography } from "@mui/material";

export default function PlayerTMSITMSTab({ formik }) {

    const [loading, setLoading] = useState();


    //  Document Upload
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedDocumentName, setSelectedDocumentName] = useState("");

    const [uploadedDocument, setUploadedDocument] = useState(false);
    const [uploadedDocumentName, setUploadedDocumentName] = useState("");
    //  Document2 Upload
    const [selectedDocument2, setSelectedDocument2] = useState(null);
    const [selectedDocument2Name, setSelectedDocument2Name] = useState("");

    const [uploadedDocument2, setUploadedDocument2] = useState(false);
    const [uploadedDocument2Name, setUploadedDocument2Name] = useState("");
    //  Document3 Upload
    const [selectedDocument3, setSelectedDocument3] = useState(null);
    const [selectedDocument3Name, setSelectedDocument3Name] = useState("");

    const [uploadedDocument3, setUploadedDocument3] = useState(false);
    const [uploadedDocument3Name, setUploadedDocument3Name] = useState("");

    const onFileChnage = (e) => {

        if (e.target.name == "documentation") {
            setUploadedDocument(false)
            setSelectedDocument(e.target.files[0])
            setSelectedDocumentName(e.target.files[0].name)
        }
        if (e.target.name == "MOU") {
            setUploadedDocument2(false)
            setSelectedDocument2(e.target.files[0])
            setSelectedDocument2Name(e.target.files[0].name)
        }
        if (e.target.name == "Agreement") {
            setUploadedDocument3(false)
            setSelectedDocument3(e.target.files[0])
            setSelectedDocument3Name(e.target.files[0].name)
        }
    }

    const onFileUpload = async (file, id) => {
        setLoading(true)

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(file).then(() => {


            if (id == 1) {
                // prepare UI for results
                setUploadedDocument(true);
                setUploadedDocumentName(selectedDocumentName);
                //   reseting selected files
                setSelectedDocument(null);
                setSelectedDocumentName("");
            }
            if (id == 2) {
                // prepare UI for results
                setUploadedDocument2(true);
                setUploadedDocument2Name(selectedDocument2Name);
                //   reseting selected files
                setSelectedDocument2(null);
                setSelectedDocument2Name("");
            }
            if (id == 3) {
                // prepare UI for results
                setUploadedDocument3(true);
                setUploadedDocument3Name(selectedDocument3Name);
                //   reseting selected files
                setSelectedDocument3(null);
                setSelectedDocument3Name("");
            }

        });

        setLoading(false)
    };

    const onDeleteFile = (fileName, id) => {
        deleteBlob(fileName)
            .then(() => {

                if (id == 1) {
                    setSelectedDocument(null);
                    setUploadedDocumentName("");
                    setUploadedDocument(false);
                }
                if (id == 2) {
                    setSelectedDocument2(null);
                    setUploadedDocument2Name("");
                    setUploadedDocument2(false);
                }
                if (id == 3) {
                    setSelectedDocument3(null);
                    setUploadedDocument3Name("");
                    setUploadedDocument3(false);
                }

            })

    }



    // const formik = useFormik({
    //     initialValues: {
    //         TransferredToWhichClub: "",
    //         PeriodOfTransfer: "",
    //         documentation: "",
    //         MOU: null,
    //         Agreement: null,
    //         PaymentDetails: "",

    //     },
    //     validationSchema: Yup.object({}),

    //     onSubmit: async (data) => {
    //         try {
    //             let finalData = { ...data, document: handlePriview(uploadedDocumentName) }
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
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.TMS_ITMSTransferredToWhichClub && formik.errors.TMS_ITMSTransferredToWhichClub)}
                                fullWidth
                                helperText={formik.touched.TMS_ITMSTransferredToWhichClub && formik.errors.TMS_ITMSTransferredToWhichClub}
                                label="Transferred To Which Club"
                                margin="dense"
                                name="TMS_ITMSTransferredToWhichClub"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.TMS_ITMSTransferredToWhichClub}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.TMS_ITMSTransferFromDate && formik.errors.TMS_ITMSTransferFromDate)}
                                fullWidth
                                helperText={formik.touched.TMS_ITMSTransferFromDate && formik.errors.TMS_ITMSTransferFromDate}
                                label="Transfer From Date"
                                margin="dense"
                                name="TMS_ITMSTransferFromDate"
                                onBlur={formik.handleBlur}
                                InputLabelProps={{ shrink: true }}
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values.TMS_ITMSTransferFromDate}
                                variant="outlined"
                            />
                        </Grid>
                        
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.TMS_ITMSTransferToDate && formik.errors.TMS_ITMSTransferToDate)}
                                fullWidth
                                helperText={formik.touched.TMS_ITMSTransferToDate && formik.errors.TMS_ITMSTransferToDate}
                                label="Transfer To Date"
                                margin="dense"
                                name="TMS_ITMSTransferToDate"
                                InputLabelProps={{ shrink: true }}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="date"
                                value={formik.values.TMS_ITMSTransferToDate}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.TMS_ITMSPaymentDetails && formik.errors.TMS_ITMSPaymentDetails)}
                                fullWidth
                                helperText={formik.touched.TMS_ITMSPaymentDetails && formik.errors.TMS_ITMSPaymentDetails}
                                label="Payment Details"
                                margin="dense"
                                name="TMS_ITMSPaymentDetails"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.TMS_ITMSPaymentDetails}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            
                            <Typography>MOU</Typography>
                            <TextField
                                style={{ display: "none" }}
                                error={Boolean(formik.touched.MOU && formik.errors.MOU)}
                                fullWidth
                                helperText={formik.touched.MOU && formik.errors.MOU}
                                label="MOU"
                                id="MOU"
                                margin="dense"
                                InputLabelProps={{ shrink: true }}
                                name="MOU"
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.MOU}
                                variant="outlined"
                            />
                            <Button
                                onClick={() => {
                                    document.getElementById("MOU").click();
                                }}
                            >
                                Upload Document
                            </Button>

                            <Button disabled>
                                <Typography>{selectedDocument2Name}</Typography>
                            </Button>
                            {uploadedDocument2 ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedDocument2} onClick={(e) => {
                                onFileUpload(selectedDocument2, 2)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedDocument2 ? <><Button target="blank" href={handlePriview(uploadedDocument2Name)}>
                                <Typography>{uploadedDocument2Name}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedDocument2Name, 2)
                                }} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton></> : ""}
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography>Agreement</Typography>
                            <TextField
                                style={{ display: "none" }}
                                error={Boolean(formik.touched.Agreement && formik.errors.Agreement)}
                                fullWidth
                                helperText={formik.touched.Agreement && formik.errors.Agreement}
                                label="Agreement"
                                id="Agreement"
                                margin="dense"
                                InputLabelProps={{ shrink: true }}
                                name="Agreement"
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.Agreement}
                                variant="outlined"
                            />
                            <Button
                                onClick={() => {
                                    document.getElementById("Agreement").click();
                                }}
                            >
                                Upload Document
                            </Button>

                            <Button disabled>
                                <Typography>{selectedDocument3Name}</Typography>
                            </Button>
                            {uploadedDocument3 ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedDocument3} onClick={(e) => {
                                onFileUpload(selectedDocument3, 3)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedDocument3 ? <><Button target="blank" href={handlePriview(uploadedDocument3Name)}>
                                <Typography>{uploadedDocument3Name}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedDocument3Name, 3)
                                }} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton></> : ""}
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography>Documentation</Typography>
                            <TextField
                                style={{ display: "none" }}
                                error={Boolean(formik.touched.documentation && formik.errors.documentation)}
                                fullWidth
                                helperText={formik.touched.documentation && formik.errors.documentation}
                                label="Documentation"
                                id="uploadPlayerTMSITMSDocument"
                                margin="dense"
                                InputLabelProps={{ shrink: true }}
                                name="documentation"
                                onBlur={formik.handleBlur}
                                onChange={onFileChnage}
                                type="file"
                                value={formik.values.documentation}
                                variant="outlined"
                            />
                            <Button
                                onClick={() => {
                                    document.getElementById("uploadPlayerTMSITMSDocument").click();
                                }}
                            >
                                Upload Document
                            </Button>

                            <Button disabled>
                                <Typography>{selectedDocumentName}</Typography>
                            </Button>
                            {uploadedDocument ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedDocument} onClick={(e) => {
                                onFileUpload(selectedDocument, 1)
                            }} >Upload</Button>}
                            <br></br>
                            {uploadedDocument ? <><Button target="blank" href={handlePriview(uploadedDocumentName)}>
                                <Typography>{uploadedDocumentName}</Typography>
                            </Button>
                                <IconButton onClick={() => {
                                    onDeleteFile(uploadedDocumentName, 1)
                                }} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton></> : ""}

                        </Grid>


                        <Grid item md={12} xs={12} textAlign="center">
                            <Button onClick={formik.handleSubmit} variant="outlined" color="primary">
                                Save
                            </Button>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
            {/* </form> */}
        </>
    );
}
