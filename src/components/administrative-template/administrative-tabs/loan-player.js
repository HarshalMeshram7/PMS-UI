import React ,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";


export default function AdministrativeLoanPlayerTab({sports}) {


    //   logo upload
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedAgreementName, setSelectedAgreementName] = useState("");

  const [uploadedAgreement, setUploadedAgreement] = useState(false);
  const [uploadedAgreementName, setUploadedAgreementName] = useState("");
  //  banner banner
  const [selectedOrgClub, setSelectedOrgClub] = useState(null);
  const [selectedOrgClubName, setSelectedOrgClubName] = useState("");

  const [uploadedOrgClub, setUploadedOrgClub] = useState(false);
  const [uploadedOrgClubName, setUploadedOrgClubName] = useState("");

  const onFileChnage = (e) => {
    if (e.target.name == "Agreement") {
      setUploadedAgreement(false)
      setSelectedAgreement(e.target.files[0])
      setSelectedAgreementName(e.target.files[0].name)
    }

    if (e.target.name == "banner") {
      setUploadedOrgClub(false)
      setSelectedOrgClub(e.target.files[0])
      setSelectedOrgClubName(e.target.files[0].name)
    }
  }
  const onFileUpload = async (file, id) => {
    setLoading(true)

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(file).then(() => {

      if (id == 1) {
        // prepare UI for results
        setUploadedAgreement(true);
        setUploadedAgreementName(selectedAgreementName);
        //   reseting selected files
        setSelectedAgreement(null);
        setSelectedAgreementName("");
      }

      if (id == 2) {
        // prepare UI for results
        setUploadedOrgClub(true);
        setUploadedOrgClubName(selectedOrgClubName);
        //   reseting selected files
        setSelectedOrgClub(null);
        setSelectedOrgClubName("");
      }

    });


    setLoading(false)
  };

  const onDeleteFile = (fileName, id) => {
    deleteBlob(fileName)
      .then(() => {

        if (id == 1) {
          setSelectedAgreement(null);
          setUploadedAgreementName("");
          setUploadedAgreement(false);
        }

        if (id == 2) {
          setSelectedOrgClub(null);
          setUploadedOrgClubName("");
          setUploadedOrgClub(false);
        }

      })


  }



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            Sports: sports ,
            DocumentAgreementOrgClub: "",
            AgreementWithPlayer: "",

        },

        validationSchema: Yup.object({}),

        onSubmit: async (data) => {
            try {
              let finalData = {...data,AgreementWithPlayer:handlePriview(selectedAgreementName),DocumentAgreementOrgClub:handlePriview(selectedOrgClubName)}
                console.log(finalData);
            } catch (error) {
                console.log(error);
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
                            sx={{ marginBottom: 2 }}
                        >
                            {/* <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.DocumentAgreementOrgClub && formik.errors.DocumentAgreementOrgClub)}
                                    fullWidth
                                    helperText={formik.touched.DocumentAgreementOrgClub && formik.errors.DocumentAgreementOrgClub}
                                    label="Documentation / Agreement Organization Club"
                                    margin="dense"
                                    name="DocumentAgreementOrgClub"
                                    onBlur={formik.handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={formik.handleChange}
                                    type="file"
                                    value={formik.values.DocumentAgreementOrgClub}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.AgreementWithPlayer && formik.errors.AgreementWithPlayer)}
                                    fullWidth
                                    helperText={formik.touched.AgreementWithPlayer && formik.errors.AgreementWithPlayer}
                                    label="Agreement With Player"
                                    margin="dense"
                                    name="AgreementWithPlayer"
                                    InputLabelProps={{ shrink: true }}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="file"
                                    value={formik.values.AgreementWithPlayer}
                                    variant="outlined"
                                />
                            </Grid> */}


                            <Grid item md={6} xs={12}>
                                <Typography>Documentation / Agreement Organization Club</Typography>
              <TextField
                style={{ display: "none" }}
                id="uploadDocumentAgreementOrgClub"
                margin="dense"
                name="DocumentAgreementOrgClub"
                onChange={onFileChnage}
                type="file"
                value={formik.values.DocumentAgreementOrgClub}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("uploadDocumentAgreementOrgClub").click();
                }}
              >
                Upload Logo
              </Button>
              <Button disabled>
                <Typography>{selectedAgreementName}</Typography>
              </Button>
              {uploadedAgreement ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedAgreement} onClick={(e) => {
                onFileUpload(selectedAgreement, 1)
              }} >Upload</Button>}
              <br></br>
              {uploadedAgreement ? <><Button target="blank" href={handlePriview(uploadedAgreementName)}>
                <Typography>{uploadedAgreementName}</Typography>
              </Button>
                <IconButton onClick={() => {
                  onDeleteFile(uploadedAgreementName, 1)
                }} aria-label="delete" size="large">
                  <DeleteIcon />
                </IconButton></> : ""}

            </Grid>

            <Grid item md={6} xs={12}>
            <Typography>Agreement With Player</Typography>
              <TextField
                style={{ display: "none" }}
                id="uploadOrgClub"
                name="OrgClub"
                onChange={onFileChnage}
                type="file"
                value={formik.values.OrgClub}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("uploadOrgClub").click();
                }}
              >
                Upload Banner
              </Button>

              <Button disabled>
                <Typography>{selectedOrgClubName}</Typography>
              </Button>
              {uploadedOrgClub ? <Button disabled variant="contained">Uploaded &#10004; </Button> : <Button variant="contained" disabled={!selectedOrgClub} onClick={(e) => {
                onFileUpload(selectedOrgClub, 2)
              }} >Upload</Button>}
              <br></br>
              {uploadedOrgClub ? <><Button target="blank" href={handlePriview(uploadedOrgClubName)}>
                <Typography>{uploadedOrgClubName}</Typography>
              </Button>
                <IconButton onClick={() => {
                  onDeleteFile(uploadedOrgClubName, 2)
                }} aria-label="delete" size="large">
                  <DeleteIcon />
                </IconButton></> : ""}

            </Grid>

                        </Grid>
                       
                        <Grid item md={12} xs={12} textAlign="center">
                            <Button sx={{ marginTop: 2 }} type="submit" variant="outlined" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
