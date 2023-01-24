import React ,{useState} from "react";
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
import { Divider, IconButton, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";
import DeleteIcon from '@material-ui/icons/Delete';

export default function AdministrativeAcademyPlayerTab() {
  //   logo upload
  const [selectedDocument1, setSelectedDocument1] = useState(null);
  const [selectedDocument1Name, setSelectedDocument1Name] = useState("");

  const [uploadedDocument1, setUploadedDocument1] = useState(false);
  const [uploadedDocument1Name, setUploadedDocument1Name] = useState("");

  //   logo upload
  const [selectedDocument2, setSelectedDocument2] = useState(null);
  const [selectedDocument2Name, setSelectedDocument2Name] = useState("");

  const [uploadedDocument2, setUploadedDocument2] = useState(false);
  const [uploadedDocument2Name, setUploadedDocument2Name] = useState("");

  //   logo upload
  const [selectedDocument3, setSelectedDocument3] = useState(null);
  const [selectedDocument3Name, setSelectedDocument3Name] = useState("");

  const [uploadedDocument3, setUploadedDocument3] = useState(false);
  const [uploadedDocument3Name, setUploadedDocument3Name] = useState("");

  const onFileChnage = (e) => {
    if (e.target.name == "Agreement") {
      setUploadedDocument1(false);
      setSelectedDocument1(e.target.files[0]);
      setSelectedDocument1Name(e.target.files[0].name);
    }
    if (e.target.name == "Agreement") {
      setUploadedDocument2(false);
      setSelectedDocument2(e.target.files[0]);
      setSelectedDocument2Name(e.target.files[0].name);
    }
    if (e.target.name == "Agreement") {
      setUploadedDocument3(false);
      setSelectedDocument3(e.target.files[0]);
      setSelectedDocument3Name(e.target.files[0].name);
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
        setUploadedDocument3Name(selectedDocument3Name);
        //   reseting selected files
        setSelectedDocument3(null);
        setSelectedDocument3Name("");
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
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Sports: "Soccer - Academy Player",
      Documentation: "",
      Mandate: "",
      AccountInformation: "",
    },

    validationSchema: Yup.object({}),

    onSubmit: async (data) => {
      try {
        let finalData = {...data,Documentation: handlePriview(selectedDocument1Name),
        Mandate: handlePriview(selectedDocument2Name),
        AccountInformation: handlePriview(selectedDocument3Name)}
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
                                    error={Boolean(formik.touched.Documentation && formik.errors.Documentation)}
                                    fullWidth
                                    helperText={formik.touched.Documentation && formik.errors.Documentation}
                                    label="Documentation"
                                    margin="dense"
                                    name="Documentation"
                                    onBlur={formik.handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={formik.handleChange}
                                    type="file"
                                    value={formik.values.Documentation}
                                    variant="outlined"
                                />
                            </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>Documentation</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="Documentation"
                  name="Documentation"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.Documentation}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("Documentation").click();
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

              {/* <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.AccountInformation && formik.errors.AccountInformation)}
                                    fullWidth
                                    helperText={formik.touched.AccountInformation && formik.errors.AccountInformation}
                                    label="Account Information"
                                    margin="dense"
                                    name="AccountInformation"
                                    InputLabelProps={{ shrink: true }}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="file"
                                    value={formik.values.AccountInformation}
                                    variant="outlined"
                                />
                            </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>Account Information</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="AccountInformation"
                  name="AccountInformation"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.AccountInformation}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("AccountInformation").click();
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

              {/* <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.Mandate && formik.errors.Mandate)}
                                    fullWidth
                                    helperText={formik.touched.Mandate && formik.errors.Mandate}
                                    label="Mandate"
                                    margin="dense"
                                    name="Mandate"
                                    InputLabelProps={{ shrink: true }}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="file"
                                    value={formik.values.Mandate}
                                    variant="outlined"
                                />
                            </Grid> */}

              <Grid item md={6} xs={12}>
                <Typography>Mandate</Typography>
                <TextField
                  style={{ display: "none" }}
                  id="Mandate"
                  name="Mandate"
                  onChange={onFileChnage}
                  type="file"
                  value={formik.values.Mandate}
                  variant="outlined"
                />
                <Button
                  onClick={() => {
                    document.getElementById("Mandate").click();
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
