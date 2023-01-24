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
  Typography,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";
import DeleteIcon from "@mui/icons-material/Delete";
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { addPlayers } from "src/services/playersRequest";

const sportsList = [
  {
    value: "football",
    label: "Football",
  },
  {
    value: "cricket",
    label: "Cricket",
  },
  {
    value: "tennis",
    label: "Tennis",
  },
];

const Gender = [
  {
    value: "Male",
    label: "Male"
  },
  {
    value: "Female",
    label: "Female"
  },
  {
    value: "Other",
    label: "Other"
  }
];

const TMSITMSApplicable = [
  {
    value: 1,
    label: "Yes"
  },
  {
    value: 0,
    label: "No"
  },

];


const TypeOfPlayerID = [
  {
    value: 1,
    label: "Professional"
  },
  {
    value: 2,
    label: "Non-Professional"
  },
  {
    value: 0,
    label: "Loan-Player"
  }
];


export const AddMatchesDialog = ({ open, handleClose, mutate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();

  //   photo upload
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoName, setSelectedPhotoName] = useState("");

  const [uploadedPhoto, setUploadedPhoto] = useState(false);
  const [uploadedPhotoName, setUploadedPhotoName] = useState("");
  //  Document banner
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [selectedDocumentsName, setSelectedDocumentsName] = useState("");

  const [uploadedDocuments, setUploadedDocuments] = useState(false);
  const [uploadedDocumentsName, setUploadedDocumentsName] = useState("");

  //   educational document
  const [selectedEduDocument, setSelectedEduDocument] = useState(null);
  const [selectedEduDocumentName, setSelectedEduDocumentName] = useState("");

  const [uploadedEduDocument, setUploadedEduDocument] = useState(false);
  const [uploadedEduDocumentName, setUploadedEduDocumentName] = useState("");

  const onFileChnage = (e) => {
    if (e.target.name == "photo") {
      setUploadedPhoto(false);
      setSelectedPhoto(e.target.files[0]);
      setSelectedPhotoName(e.target.files[0].name);
    }

    if (e.target.name == "documents") {
      setUploadedDocuments(false);
      setSelectedDocuments(e.target.files[0]);
      setSelectedDocumentsName(e.target.files[0].name);
    }
    if (e.target.name == "edudocuments") {
      setUploadedEduDocument(false);
      setSelectedEduDocument(e.target.files[0]);
      setSelectedEduDocumentName(e.target.files[0].name);
    }
  };
  const onFileUpload = async (file, id) => {
    setLoading(true);

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
        setUploadedDocuments(true);
        setUploadedDocumentsName(selectedDocumentsName);
        //   reseting selected files
        setSelectedDocuments(null);
        setSelectedDocumentsName("");
      }
      if (id == 3) {
        // prepare UI for results
        setUploadedEduDocument(true);
        setUploadedEduDocumentName(selectedEduDocumentName);
        //   reseting selected files
        setSelectedEduDocument(null);
        setSelectedEduDocumentName("");
      }
    });

    setLoading(false);
  };

  const onDeleteFile = (fileName, id) => {
    deleteBlob(fileName).then(() => {
      if (id == 1) {
        setSelectedPhoto(null);
        setUploadedPhotoName("");
        setUploadedPhoto(false);
      }

      if (id == 2) {
        setSelectedDocuments(null);
        setUploadedDocumentsName("");
        setUploadedDocuments(false);
      }
      if (id == 3) {
        setSelectedEduDocument(null);
        setUploadedEduDocumentName("");
        setUploadedEduDocument(false);
      }
    });
  };


  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Gender: "",
      DateOfBirth: "",
      Phone: "",
      Email: "",
      TypeOfPlayerID: "",
      EducationQualification: "",
      edudocuments: "",
      photo: "",
      BasePrice: "",
      PlayingPosition: "",
      documents: "",



      TMSITMSApplicable: "",


      Password: "",
      RecoveryEMail: "",
      LongDescription: "",
      Facebook: "",
      Twitter: "",
      Linkedin: "",




      AcademyClub: "",
      Address: "",
      PlayerTeam: "",
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().max(100).required("Player's First Name is required"),
      LastName: Yup.string().max(100).required("Player's Last Name is required"),
      AcademyClub: Yup.string(),
      // .required('Required')
      // ,
      // TypeOfPlayerID: Yup
      //     .string()
      // .required('Required')
      Address: Yup.string(),
      // .required('Required')
      Phone: Yup.string()
        .length(10)
        .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, "Phone number is not valid")
        .required("Phone number is required"),
      EducationQualification: Yup.string().max(255),
      // .required("Email is required")
      // Documentss: Yup
      //     .string()
      //     .max(255)
      // .required("Email is required")
      // ,
      // Photo: Yup
      //     .string()
      //     .max(255)
      // .required("Email is required")
      // ,
      PlayerTeam: Yup.string().max(255),
      // .required("Email is required")
      Email: Yup.string().email("Must be a valid Email").max(255).required("Email is required"),

      BasePrice: Yup.string().max(100),
      PlayingPosition: Yup.string().max(100),
      // TMSITMSApplicable: Yup.string().max(100),
    }),
    onSubmit: async (data) => {
      setLoading(true);

      try {
        let finalData = {
          ...data,
          photo: handlePriview(uploadedPhotoName),
          documents: handlePriview(uploadedDocumentsName),
          edudocuments: handlePriview(uploadedEduDocumentName),
        };
        console.log(finalData);

        await addPlayers(finalData);
        handleClose();
        enqueueSnackbar("Player Added Succesfully", { variant: "success" });
        mutate();
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
        <DialogTitle>Add New Matches</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Enter the basic required details of the Matches below.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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
                  {Gender?.map((option, key) => (
                    <MenuItem key={key}
                      value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Type Of Player</InputLabel>
                <Select
                  labelId="TypeOfPlayerID"
                  id="TypeOfPlayerID"
                  value={formik.values.TypeOfPlayerID}
                  name="TypeOfPlayerID"
                  label="Type Of Player"
                  onChange={formik.handleChange}
                >
                  {TypeOfPlayerID?.map((option, key) => (
                    <MenuItem key={key}
                      value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">TMSITMSApplicable</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.TMSITMSApplicable}
                  name="TMSITMSApplicable"
                  label="TMSITMSApplicable"
                  onChange={formik.handleChange}
                >
                  {TMSITMSApplicable?.map((option, key) => (
                    <MenuItem key={key}
                      value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item md={6} xs={12}>

              <TextField
                style={{ display: "none" }}
                error={Boolean(formik.touched.edudocuments && formik.errors.edudocuments)}
                fullWidth
                helperText={formik.touched.edudocuments && formik.errors.edudocuments}
                label="edudocuments"
                id="edudocuments"
                margin="dense"
                name="edudocuments"
                onChange={onFileChnage}
                type="file"
                value={formik.values.edudocuments}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("edudocuments").click();
                }}
              >
                Upload Documents
              </Button>

              <Button disabled>
                <Typography>{selectedEduDocumentName}</Typography>
              </Button>
              {uploadedEduDocument ? (
                <Button disabled variant="contained">
                  Uploaded &#10004;{" "}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={!selectedEduDocument}
                  onClick={(e) => {
                    onFileUpload(selectedEduDocument, 3);
                  }}
                >
                  Upload
                </Button>
              )}
              <br></br>
              {uploadedEduDocument ? (
                <>
                  <Button target="blank" href={handlePriview(uploadedEduDocumentName)}>
                    <Typography>{uploadedEduDocumentName}</Typography>
                  </Button>
                  <IconButton
                    onClick={() => {
                      onDeleteFile(uploadedEduDocumentName, 3);
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



            <Grid item md={6} xs={12}>
              <TextField
                style={{ display: "none" }}
                error={Boolean(formik.touched.photo && formik.errors.photo)}
                fullWidth
                helperText={formik.touched.photo && formik.errors.photo}
                label="Photo"
                id="uploadphoto"
                margin="dense"
                name="photo"
                onChange={onFileChnage}
                type="file"
                value={formik.values.photo}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("uploadphoto").click();
                }}
              >
                Upload Photo
              </Button>
              <Button disabled>
                <Typography>{selectedPhotoName}</Typography>
              </Button>
              {uploadedPhoto ? (
                <Button disabled variant="contained">
                  Uploaded &#10004;{" "}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={!selectedPhoto}
                  onClick={(e) => {
                    onFileUpload(selectedPhoto, 1);
                  }}
                >
                  Upload
                </Button>
              )}
              <br></br>
              {uploadedPhoto ? (
                <>
                  <Button target="blank" href={handlePriview(uploadedPhotoName)}>
                    <Typography>{uploadedPhotoName}</Typography>
                  </Button>
                  <IconButton
                    onClick={() => {
                      onDeleteFile(uploadedPhotoName, 1);
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

            <Grid item md={6} xs={12}>
              <TextField
                style={{ display: "none" }}
                error={Boolean(formik.touched.documents && formik.errors.documents)}
                fullWidth
                helperText={formik.touched.documents && formik.errors.documents}
                label="Documents"
                id="uploadDocuments"
                margin="dense"
                name="documents"
                onBlur={formik.handleBlur}
                onChange={onFileChnage}
                type="file"
                value={formik.values.documents}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("uploadDocuments").click();
                }}
              >
                Upload Documents
              </Button>

              <Button disabled>
                <Typography>{selectedDocumentsName}</Typography>
              </Button>
              {uploadedDocuments ? (
                <Button disabled variant="contained">
                  Uploaded &#10004;{" "}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={!selectedDocuments}
                  onClick={(e) => {
                    onFileUpload(selectedDocuments, 2);
                  }}
                >
                  Upload
                </Button>
              )}
              <br></br>
              {uploadedDocuments ? (
                <>
                  <Button target="blank" href={handlePriview(uploadedDocumentsName)}>
                    <Typography>{uploadedDocumentsName}</Typography>
                  </Button>
                  <IconButton
                    onClick={() => {
                      onDeleteFile(uploadedDocumentsName, 2);
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
                            <TextField style={{ display: 'none' }}
                                error={Boolean(formik.touched.logo && formik.errors.logo)}
                                fullWidth
                                helperText={formik.touched.logo && formik.errors.logo}
                                label="Logo"
                                id="uploadLogo"
                                margin="dense"
                                name="logo"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="file"
                                value={formik.values.logo}
                                variant="outlined"
                            />
                            <Button onClick={() => { document.getElementById("uploadLogo").click() }}>Upload Logo</Button>
                        </Grid> */}

            {/* <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField style={{ display: 'none' }}
                                error={Boolean(formik.touched.banner && formik.errors.banner)}
                                fullWidth
                                helperText={formik.touched.banner && formik.errors.banner}
                                label="Banner"
                                id="uploadBanner"
                                margin="dense"
                                name="banner"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="file"
                                value={formik.values.banner}
                                variant="outlined"
                            />
                            <Button onClick={() => { document.getElementById("uploadBanner").click() }}>Upload Banner</Button>
                        </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
