import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  Select,
  DialogTitle,
  InputLabel,
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";

export default function AdministrativeProfessionalTab({ sports }) {
  //   Document1 upload
  const [selectedDocument1, setSelectedDocument1] = useState(null);
  const [selectedDocument1Name, setSelectedDocument1Name] = useState("");

  const [uploadedDocument1, setUploadedDocument1] = useState(false);
  const [uploadedDocument1Name, setUploadedDocument1Name] = useState("");
  //  Document Document2
  const [selectedDocument2, setSelectedDocument2] = useState(null);
  const [selectedDocument2Name, setSelectedDocument2Name] = useState("");

  const [uploadedDocument2, setUploadedDocument2] = useState(false);
  const [uploadedDocument2Name, setUploadedDocument2Name] = useState("");
  //  Document Document3
  const [selectedDocument3, setSelectedDocument3] = useState(null);
  const [selectedDocument3Name, setSelectedDocument3Name] = useState("");

  const [uploadedDocument3, setUploadedDocument3] = useState(false);
  const [uploadedDocument3Name, setUploadedDocument3Name] = useState("");
  //  Document Document4
  const [selectedDocument4, setSelectedDocument4] = useState(null);
  const [selectedDocument4Name, setSelectedDocument4Name] = useState("");

  const [uploadedDocument4, setUploadedDocument4] = useState(false);
  const [uploadedDocument4Name, setUploadedDocument4Name] = useState("");

  const onFileChnage = (e) => {
    if (e.target.name == "DocumentationAgreement") {
      setUploadedDocument1(false);
      setSelectedDocument1(e.target.files[0]);
      setSelectedDocument1Name(e.target.files[0].name);
    }

    if (e.target.name == "FinancialAgreement") {
      setUploadedDocument2(false);
      setSelectedDocument2(e.target.files[0]);
      setSelectedDocument2Name(e.target.files[0].name);
    }
    if (e.target.name == "TMSITMS") {
      setUploadedDocument3(false);
      setSelectedDocument3(e.target.files[0]);
      setSelectedDocument3Name(e.target.files[0].name);
    }
    if (e.target.name == "NonDocNonAgreement") {
      setUploadedDocument4(false);
      setSelectedDocument4(e.target.files[0]);
      setSelectedDocument4Name(e.target.files[0].name);
    }
  };
  const onFileUpload = async (file, id) => {
    setLoading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(file).then(() => {
      if (id == 1) {
        // prepare UI for results
        setUploadedDocument1(true);
        setUploadedDocument1Name(selectedDocument1Name);
        //   reseting selected files
        setSelectedDocument1(null);
        setSelectedDocument1Name("");
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
        setUploadedDocument3Name(selectedDocument2Name);
        //   reseting selected files
        setSelectedDocument3(null);
        setSelectedDocument3Name("");
      }
      if (id == 4) {
        // prepare UI for results
        setUploadedDocument4(true);
        setUploadedDocument4Name(selectedDocument2Name);
        //   reseting selected files
        setSelectedDocument4(null);
        setSelectedDocument4Name("");
      }
    });

    setLoading(false);
  };

  const onDeleteFile = (fileName, id) => {
    deleteBlob(fileName).then(() => {
      if (id == 1) {
        setSelectedDocument1(null);
        setUploadedDocument1Name("");
        setUploadedDocument1(false);
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
      if (id == 4) {
        setSelectedDocument4(null);
        setUploadedDocument4Name("");
        setUploadedDocument4(false);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Sports: sports,
      DocumentationAgreement: null,
      FinancialAgreement: null,
      TMSITMS: null,
      NonDocNonAgreement: null,
    },

    validationSchema: Yup.object({}),

    onSubmit: async (data) => {
      try {
        let finalData = {...data,DocumentationAgreement: handlePriview(selectedDocument1Name),
          FinancialAgreement: handlePriview(selectedDocument2Name),
          TMSITMS: handlePriview(selectedDocument3Name),
          NonDocNonAgreement: handlePriview(selectedDocument4Name) }
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
            <Grid container spacing={3} sx={{ marginBottom: 2 }}>
              {/* <Grid  
                    item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.DocumentationAgreement && formik.errors.DocumentationAgreement)}
                                    fullWidth
                                    helperText={formik.touched.DocumentationAgreement && formik.errors.DocumentationAgreement}
                                    label="Documentation / Agreement"
                                    margin="dense"
                                    name="DocumentationAgreement"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="file"
                                    InputLabelProps={{ shrink: true }}
                                    value={formik.values.DocumentationAgreement}
                                    variant="outlined"
                                />
                            </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>Documentation Agreement</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="DocumentationAgreement"
                  name="DocumentationAgreement"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.DocumentationAgreement}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("DocumentationAgreement").click();
                  }}
                >
                  Upload Document
                </Button>
                <Button disabled>
                  <Typography>{selectedDocument1Name}</Typography>
                </Button>
                {uploadedDocument1 ? (
                  <Button disabled variant="contained">
                    Uploaded &#10004;{" "}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!selectedDocument1}
                    onClick={(e) => {
                      onFileUpload(selectedDocument1, 1);
                    }}
                  >
                    Upload
                  </Button>
                )}
                <br></br>
                {uploadedDocument1 ? (
                  <>
                    <Button target="blank" href={handlePriview(uploadedDocument1Name)}>
                      <Typography>{uploadedDocument1Name}</Typography>
                    </Button>
                    <IconButton
                      onClick={() => {
                        onDeleteFile(uploadedDocument1Name, 1);
                      }}
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
              </Grid>

              {/* <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.FinancialAgreement && formik.errors.FinancialAgreement
                  )}
                  fullWidth
                  helperText={formik.touched.FinancialAgreement && formik.errors.FinancialAgreement}
                  label="Financial Agreement"
                  margin="dense"
                  name="FinancialAgreement"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.FinancialAgreement}
                  variant="outlined"
                />
              </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>Financial Agreement</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="FinancialAgreement"
                  name="FinancialAgreement"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.FinancialAgreement}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("FinancialAgreement").click();
                  }}
                >
                  Upload Document
                </Button>
                <Button disabled>
                  <Typography>{selectedDocument2Name}</Typography>
                </Button>
                {uploadedDocument2 ? (
                  <Button disabled variant="contained">
                    Uploaded &#10004;{" "}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!selectedDocument2}
                    onClick={(e) => {
                      onFileUpload(selectedDocument2, 2);
                    }}
                  >
                    Upload
                  </Button>
                )}
                <br></br>
                {uploadedDocument2 ? (
                  <>
                    <Button target="blank" href={handlePriview(uploadedDocument2Name)}>
                      <Typography>{uploadedDocument2Name}</Typography>
                    </Button>
                    <IconButton
                      onClick={() => {
                        onDeleteFile(uploadedDocument2Name, 2);
                      }}
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
              </Grid>

              {/* <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.TMSITMS && formik.errors.TMSITMS)}
                  fullWidth
                  helperText={formik.touched.TMSITMS && formik.errors.TMSITMS}
                  label="TMS / ITMS"
                  margin="dense"
                  name="TMSITMS"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.TMSITMS}
                  variant="outlined"
                />
              </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>TMS / ITMS</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="TMSITMS"
                  name="TMSITMS"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.TMSITMS}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("TMSITMS").click();
                  }}
                >
                  Upload Document
                </Button>
                <Button disabled>
                  <Typography>{selectedDocument3Name}</Typography>
                </Button>
                {uploadedDocument3 ? (
                  <Button disabled variant="contained">
                    Uploaded &#10004;{" "}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!selectedDocument3}
                    onClick={(e) => {
                      onFileUpload(selectedDocument3, 3);
                    }}
                  >
                    Upload
                  </Button>
                )}
                <br></br>
                {uploadedDocument3 ? (
                  <>
                    <Button target="blank" href={handlePriview(uploadedDocument3Name)}>
                      <Typography>{uploadedDocument3Name}</Typography>
                    </Button>
                    <IconButton
                      onClick={() => {
                        onDeleteFile(uploadedDocument3Name, 3);
                      }}
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
              </Grid>


            </Grid>
            <Divider />

            <DialogTitle textAlign="center">Non Professional</DialogTitle>

            <Grid container spacing={3}>
              {/* <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(
                    formik.touched.NonDocNonAgreement && formik.errors.NonDocNonAgreement
                  )}
                  fullWidth
                  helperText={formik.touched.NonDocNonAgreement && formik.errors.NonDocNonAgreement}
                  label="Documentation / Agreement"
                  margin="dense"
                  name="NonDocNonAgreement"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.NonDocNonAgreement}
                  variant="outlined"
                />
              </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>Documentation / Agreement</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="NonDocNonAgreement"
                  name="NonDocNonAgreement"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.NonDocNonAgreement}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("NonDocNonAgreement").click();
                  }}
                >
                  Upload Document
                </Button>
                <Button disabled>
                  <Typography>{selectedDocument4Name}</Typography>
                </Button>
                {uploadedDocument4 ? (
                  <Button disabled variant="contained">
                    Uploaded &#10004;{" "}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!selectedDocument4}
                    onClick={(e) => {
                      onFileUpload(selectedDocument4, 4);
                    }}
                  >
                    Upload
                  </Button>
                )}
                <br></br>
                {uploadedDocument4 ? (
                  <>
                    <Button target="blank" href={handlePriview(uploadedDocument4Name)}>
                      <Typography>{uploadedDocument4Name}</Typography>
                    </Button>
                    <IconButton
                      onClick={() => {
                        onDeleteFile(uploadedDocument4Name, 4);
                      }}
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  ""
                )}
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
