import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Divider,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingBox from "src/components/common/loading-box";
import { PlayerListResults } from "src/components/player/player-list-results";
import { players } from "../../__mocks__/players.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { deleteAcademy } from "src/services/academyRequest.js";
import banner from "../../../public/static/images/background/register.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import { deleteClub, updateClub } from "src/services/clubRequest.js";
import { getAllFederations } from "src/services/federationRequest";


export const ClubDetailsDialog = ({ open, handleClose, club, mutate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = {
    avatar: club.Logo,
    city: club.Address,
    country: "USA",
    jobTitle: "Senior Developer",
    name: club.Club,
    timezone: "GTM-7",
  };
  const [loading, setLoading] = useState();
  const [federationList, setFederationList] = useState(null);

  

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


  useEffect(() => {
    if (club?.Logo !== "") {
      if (club?.Logo !== null) {
        if (club?.Logo !== undefined) {
          setUploadedLogoName(getFileName(club?.Logo));
          setUploadedLogo(true);
        } else {
          setUploadedLogoName("");
          setUploadedLogo(false);
        }
      } else {
        setUploadedLogoName("");
        setUploadedLogo(false);
      }
    } else {
      setUploadedLogoName("");
      setUploadedLogo(false);
    }

    if (club?.Banner !== "" || club?.Banner !== undefined) {
      if (club?.Banner !== null) {
        if (club?.Banner !== undefined) {
          setUploadedBannerName(getFileName(club?.Banner));
          setUploadedBanner(true);
        } else {
          setUploadedBannerName("");
          setUploadedBanner(false);
        }
      } else {
        setUploadedBannerName("");
        setUploadedBanner(false);
      }
    } else {
      setUploadedBannerName("");
      setUploadedBanner(false);
    }
  }, [club]);

  const onFileChnage = (e) => {
    if (e.target.name == "logo") {
      setUploadedLogo(false);
      setSelectedLogo(e.target.files[0]);
      setSelectedLogoName(e.target.files[0].name);
    }

    if (e.target.name == "banner") {
      setUploadedBanner(false);
      setSelectedBanner(e.target.files[0]);
      setSelectedBannerName(e.target.files[0].name);
    }
  };
  const onFileUpload = async (file, id) => {
    setLoading(true);

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

    setLoading(false);
  };

  const onDeleteFile = (fileName, id) => {
    deleteBlob(fileName).then(() => {
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
    });
  };

  useEffect(() => {
    getAllFederations().then((res) => {
      setFederationList(res);
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:club.ID,
      club: club.Club,
      federationID: club.FederationID,
      address: club.Address || "",
      phone: club.Phone || "",
      ContactPersonName: club.ContactPersonName || "",
      logo: "",
      banner: "",
      accrediation: club.Accreditation,
      facebook: club.Facebook || "",
      twitter: club.Twitter || "",
      instagram: club.Instagram || "",
      sportsList: [],
      recoveryEMail:"",
      
    },
    validationSchema: Yup.object({
      club: Yup.string()
        .max(30, "Not more than 30 characters")
        .required("Club Name is required"),

      address: Yup.string().max(50, "Not more than 50 characters").required("Address required"),

      phone: Yup.string()
        .length(10)
        // .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Phone number is not valid')
        .required("Phone number is required"),
        ContactPersonName: Yup.string()
        .max(30, "Person Name is required")
        .required("Person Name is required"),
        accrediation: Yup.string().max(30, "Not more than 30 characters"),
      facebook: Yup.string().max(30, "Not more than 30 characters"),
      twitter: Yup.string().max(30, "Not more than 30 characters"),
      instagram: Yup.string().max(30, "Not more than 30 characters"),
    }),

    onSubmit: async (data) => {
      setLoading(true);
      try {
        let finalData = {
          ...data,
          logo: handlePriview(uploadedLogoName),
          banner: handlePriview(uploadedBannerName),
        };
        console.log(finalData);
        await updateClub(finalData);
        handleClose();
        enqueueSnackbar("Club Updated Succesfully", { variant: "success" });
        mutate();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const handleDelete = (data) => {
    setLoading(true);
    try {
      deleteClub(data).then((response) => {
        if (response.status == "success") {
          handleClose();
          enqueueSnackbar("Club Deleted Succesfully", { variant: "success" });
          mutate();
          setLoading(false);
        } else {
          handleClose();
          enqueueSnackbar(`Error : ${response.message}`, { variant: "error" });
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading && handleClose}
      fullWidth
      maxWidth="xl"
      BackdropProps={{
        style: { backgroundColor: "#121212dd" },
      }}
    >
      {loading && <LoadingBox />}
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                marginBottom: "-100px",
                background: `url(${club.Banner})center center`,
              }}
            ></div>

            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  {/* Profile */}
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          src={user.avatar}
                          sx={{
                            height: 64,
                            mb: 2,
                            width: 64,
                          }}
                        />
                        <Typography color="textPrimary" gutterBottom variant="h5">
                          {user.name}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {club.email}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {`${user.city}`}
                        </Typography>
                        {/* <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {user.timezone}
                                                </Typography> */}
                      </Box>
                    </CardContent>
                    <Divider />

                    <Grid container spacing={8}>
                      <Grid item lg={6} md={6} xs={12}>
                        {/* <CardActions> */}
                        <TextField
                          style={{ display: "none" }}
                          error={Boolean(formik.touched.logo && formik.errors.logo)}
                          fullWidth
                          helperText={formik.touched.logo && formik.errors.logo}
                          label="Logo"
                          id="uploadClubLogo"
                          margin="dense"
                          name="logo"
                          onChange={onFileChnage}
                          type="file"
                          value={formik.values.logo}
                          variant="outlined"
                        />
                        <Button
                          onClick={() => {
                            document.getElementById("uploadClubLogo").click();
                          }}
                        >
                          Change Logo
                        </Button>
                        <Button disabled>
                          <Typography>{selectedLogoName}</Typography>
                        </Button>
                        {uploadedLogo ? (
                          <Button disabled variant="contained">
                            Uploaded &#10004;{" "}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disabled={!selectedLogo}
                            onClick={(e) => {
                              onFileUpload(selectedLogo, 1);
                            }}
                          >
                            Upload
                          </Button>
                        )}
                        {uploadedLogo ? (
                          <>
                            <Button target="blank" href={handlePriview(uploadedLogoName)}>
                              <Typography>{uploadedLogoName}</Typography>
                            </Button>
                            <IconButton
                              onClick={() => {
                                onDeleteFile(uploadedLogoName, 1);
                              }}
                              aria-label="delete"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          ""
                        )}
                        {/* </CardActions> */}
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        {/* <CardActions> */}
                        <TextField
                          style={{ display: "none" }}
                          error={Boolean(formik.touched.banner && formik.errors.banner)}
                          fullWidth
                          helperText={formik.touched.banner && formik.errors.banner}
                          label="Banner"
                          id="uploadClubBanner"
                          margin="dense"
                          name="banner"
                          onChange={onFileChnage}
                          type="file"
                          value={formik.values.banner}
                          variant="outlined"
                        />
                        <Button
                          onClick={() => {
                            document.getElementById("uploadClubBanner").click();
                          }}
                        >
                          Change Banner
                        </Button>
                        <Button disabled>
                          <Typography>{selectedBannerName}</Typography>
                        </Button>
                        {uploadedBanner ? (
                          <Button disabled variant="contained">
                            Uploaded &#10004;{" "}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disabled={!selectedBanner}
                            onClick={(e) => {
                              onFileUpload(selectedBanner, 2);
                            }}
                          >
                            Upload
                          </Button>
                        )}
                        <br></br>
                        {uploadedBanner ? (
                          <>
                            <Button target="blank" href={handlePriview(uploadedBannerName)}>
                              <Typography>{uploadedBannerName}</Typography>
                            </Button>
                            <IconButton
                              onClick={() => {
                                onDeleteFile(uploadedBannerName, 2);
                              }}
                              aria-label="delete"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          ""
                        )}

                        {/* </CardActions> */}
                      </Grid>
                    </Grid>
                  </Card>
                  {/* Profile */}
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  {/* Details */}

                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(formik.touched.club && formik.errors.club)}
                            fullWidth
                            helperText={formik.touched.club && formik.errors.club}
                            label="Name"
                            margin="dense"
                            name="club"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.club}
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
                            label="Person Name"
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
                            error={Boolean(
                              formik.touched.accrediation && formik.errors.accrediation
                            )}
                            fullWidth
                            helperText={formik.touched.accrediation && formik.errors.accrediation}
                            label="Accrediation"
                            margin="dense"
                            name="accrediation"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.accrediation}
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

                        <Grid item md={6} xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Sports List
                            </InputLabel>
                            <Select
                              multiple
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={formik.values.sportsList}
                              label="Sports List"
                              name="sportsList"
                              onChange={formik.handleChange}
                            >
                              <MenuItem value="Football">Football</MenuItem>
                              <MenuItem value="Cricket">Cricket</MenuItem>
                              <MenuItem value="Tennis">Tennis</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Federation List
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={formik.values.federationID}
                              label="Federation"
                              name="federationID"
                              onChange={formik.handleChange}
                            >
                              {federationList?.map((item , key)=>(
                                <MenuItem key={key} value={item.ID}>{item.name}</MenuItem>
                              ))
                              }
                              
                              </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />

                    <CardActions>
                      <Grid container spacing={8} style={{ textAlign: "center" }}>
                        <Grid item lg={6} md={6} xs={6}>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              handleDelete(club.email);
                            }}
                          >
                            Delete
                          </Button>
                        </Grid>
                        <Grid item lg={6} md={6} xs={6}>
                          <Button type="submit" variant="contained">
                            Save Details
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>

                  {/* Details */}
                </Grid>
              </Grid>
              {/* Teams List */}
              <Typography>Clubs - Teams </Typography>
              <Box sx={{ mt: 3 }}>
                <PlayerListResults players={players} />
              </Box>
            </Container>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
