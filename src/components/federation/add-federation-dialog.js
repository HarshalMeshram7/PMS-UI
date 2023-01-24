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
  Typography,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";
import { parseWithOptions } from "date-fns/fp";
import { OnlinePredictionSharp } from "@mui/icons-material";
import { addFederation } from "src/services/federationRequest";
import DeleteIcon from '@mui/icons-material/Delete';
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";

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

export const AddFederationDialog = ({ open, handleClose, mutate }) => {
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







  const formik = useFormik({
    initialValues: {
      federation: "Federation1",
      address: "Address",
      phone: "8208793805",
      email: "@gmail.com",
      password: "Monish@1995",
      recoveryEMail: "@gmail.com",
      contactPersonName: "Person name",
      banner: "",
      accreditation: "accreditation",
      facebook: "fb",
      twitter: "tw",
      instagram: "ins",
      // sportsList: [],
      cnfpassword: "Monish@1995",
      logo: "",
      banner: ""
    },
    validationSchema: Yup.object({
      federation: Yup.string().max(30, "Not more than 30 characters").required("Federation Name is required"),

      address: Yup.string().max(50, "Not more than 50 characters").required('Address required'),

      phone: Yup.string()
        .length(10)
        // .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, "Phone number is not valid")
        .required("Phone number is required"),

      email: Yup.string().email("Must be a valid Email").max(35, "Not more than 35 characters").required("Email is required"),

      recoveryEMail: Yup
        .string()
        .email("Must be a valid Email")
        .max(35, "Not more than 35 characters")
        .required("Recovery Email is required"),

      contactPersonName: Yup.string().max(30, "Not more than 30 characters")
        .required("Contact Person Name is required"),

      accreditation: Yup.string().max(30, "Not more than 30 characters"),
      facebook: Yup.string().max(30, "Not more than 30 characters"),
      twitter: Yup.string().max(30, "Not more than 30 characters"),
      instagram: Yup.string().max(30, "Not more than 30 characters"),

      password: Yup.string().min(8, "Minimum 8 characters").max(20, "Maximum 20 characters")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/, " Must have uppercase, lowecase, special character and no space allowed")
        .required("Password is required"),
      cnfpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),

    onSubmit: async (data) => {
      setLoading(true);
      try {
        let finalData = { ...data, logo: handlePriview(uploadedLogoName), banner: handlePriview(uploadedBannerName) }
        await addFederation(finalData).then((resp) => {
          if (resp.status === "success") {
            handleClose();
            enqueueSnackbar("Federation Added Succesfully", { variant: "success" });
            mutate();
            setLoading(false);
          }
          if (resp.status === "failed") {
            handleClose();
            enqueueSnackbar("Federation Not Added", { variant: "failed" });
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
        <DialogTitle>Add New Federation</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Enter the required basic details of the Federation below.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.federation && formik.errors.federation)}
                fullWidth
                helperText={formik.touched.federation && formik.errors.federation}
                label="Federation Name"
                margin="dense"
                name="federation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.federation}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone Number"
                margin="dense"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="tel"
                value={formik.values.phone}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.contactPersonName && formik.errors.contactPersonName)}
                fullWidth
                helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
                label="Contact Person Name"
                margin="dense"
                name="contactPersonName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.contactPersonName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.recoveryEMail && formik.errors.recoveryEMail)}
                fullWidth
                helperText={formik.touched.recoveryEMail && formik.errors.recoveryEMail}
                label="Recovery Email"
                margin="dense"
                name="recoveryEMail"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.recoveryEMail}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
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
                                    {sportsList.map((option ,key ) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <MenuItem id={key} value={option.label}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
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

            <Grid item md={6} xs={12}>
              <TextField
                style={{ display: "none" }}
                error={Boolean(formik.touched.logo && formik.errors.logo)}
                fullWidth
                helperText={formik.touched.logo && formik.errors.logo}
                label="Logo"
                id="uploadFederationLogo"
                margin="dense"
                name="logo"
                onChange={onFileChnage}
                type="file"
                value={formik.values.logo}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("uploadFederationLogo").click();
                }}
              >
                Upload Logo
              </Button>
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

            <Grid item md={6} xs={12}>
              <TextField
                style={{ display: "none" }}
                error={Boolean(formik.touched.banner && formik.errors.banner)}
                fullWidth
                helperText={formik.touched.banner && formik.errors.banner}
                label="Banner"
                id="uploadFederationBanner"
                margin="dense"
                name="banner"
                onBlur={formik.handleBlur}
                onChange={onFileChnage}
                type="file"
                value={formik.values.banner}
                variant="outlined"
              />
              <Button
                onClick={() => {
                  document.getElementById("uploadFederationBanner").click();
                }}
              >
                Upload Banner
              </Button>

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
            <Grid />
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
