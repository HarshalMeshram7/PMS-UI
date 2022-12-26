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
    IconButton,
    CardActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,

} from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import LoadingBox from "src/components/common/loading-box";
import { PlayerListResults } from "src/components/player/player-list-results";
import { useFormik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import uploadFileToBlob, { deleteBlob, handlePriview, getFileName } from "src/utils/azureBlob";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import banner from '../../../public/static/images/background/register.jpg';
import { deleteTeam } from "src/services/teamRequest.js";
import { useAllClubs } from "src/adapters/clubAdapter";
import { getClubSportsByClubID } from "src/services/clubRequest";
import { useAllPlayers } from "src/adapters/playersAdapter";
import { useAllStaff } from "src/adapters/staffAdapter";
import { useAllCoach } from "src/adapters/coachAdapter";
import { getFullName, removeItemFromArray } from "src/utils/commonFunctions";
import TeamTable from "./table";

const TypeofPlayer = [
    {
        value: "1",
        label: "Professional"
    },
    {
        value: "2",
        label: "Non-Professional"
    },
    {
        value: "0",
        label: "Other"
    }
];

export const TeamDetailsDialog = ({ open, handleClose, team, mutate }) => {
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

    const [clubSports, setClubSports] = useState([])


    const [playersArrayTable, setPlayersArrayTable] = useState([])
    const [teamplayersTypes, setTeamplayersTypes] = useState([])

    const [coachArrayTable, setCoachArrayTable] = useState([])
    const [teamcoachesTypes, setteamcoachesTypes] = useState([])

    const [staffArrayTable, setStaffArrayTable] = useState([])
    const [teamstaffsTypes, setTeamstaffsTypes] = useState([])

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const { clubs } = useAllClubs()
    const { players } = useAllPlayers()
    const { staffs } = useAllStaff()
    const { coaches } = useAllCoach()


    useEffect(() => {
        if (team?.Logo !== "") {
            if (team?.Logo !== null) {
                if (team?.Logo !== undefined) {
                    setUploadedLogoName(getFileName(team?.Logo));
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

        if (team?.Banner !== "" || team?.Banner !== undefined) {
            if (team?.Banner !== null) {
                if (team?.Banner !== undefined) {
                    setUploadedBannerName(getFileName(team?.Banner));
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
    }, [team]);

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

    const onClubChange = (e) => {
        getClubSportsByClubID({ Id: e.target.value }).then((res) => {
            setClubSports(res)
        })
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            teamName: "Sultan 11",
            // address: "not in db",
            managerPhoneNo: "0000000000",
            managerEmail: "notindb@gmail.com",
            managerName: "not in db",
            logo: "",
            banner: "",
            accreditation: "not in db",
            facebook: "Face",
            twitter: "Twitt",
            instagram: "not in db",
            clubsportsID: "",
            club: "",
            teamplayerID: "",
            TypeofPlayer: "",
            teamstaffID: "",
            Typesofstaff: [],
            teamcoachID: "",
            Typesofcoach: [],
            // sportsList: [],
        },

        // validationSchema: Yup.object({
        //     teamName:
        //         Yup.string().max(30, "Not more than 30 characters").required("Federation Name is required"),

        //     // address: Yup.string().max(50, "Not more than 50 characters")
        //     // .required('Address required')
        //     // ,

        //     managerPhoneNo: Yup.string()
        //         .length(10)
        //         // .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, 'Phone number is not valid')
        //         .required("Phone number is required")
        //     ,
        //     managerEmail: Yup
        //         .string()
        //         .email("Must be a valid Email")
        //         .max(35, "Not more than 35 characters")
        //         .required("Email is required")
        //     ,
        //     managerName: Yup
        //         .string()
        //         .max(30, "Not more than 30 characters")
        //         .required("Contact Person Name is required"),

        //     accreditation: Yup
        //         .string()
        //         .max(30, "Not more than 30 characters"),
        //     accreditation: Yup
        //         .string()
        //         .max(30, "Not more than 30 characters"),
        //     facebook: Yup
        //         .string()
        //         .max(30, "Not more than 30 characters"),
        //     twitter: Yup
        //         .string()
        //         .max(30, "Not more than 30 characters"),
        //     instagram: Yup
        //         .string()
        //         .max(30, "Not more than 30 characters"),
        //     // sportsList: Yup
        //     //     .string()
        //     //     .max(100)
        //     //     // .required("Sport List is required")
        //     //     ,
        //     // password: Yup
        //     //     .string()
        //     //     .max(20, "Maximum 20 characters")
        //     //     .required('Password is required')
        //     //     .min(8, "Minimum 8 characters")
        //     //     .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/, " Must have uppercase, lowecase, special character and no space allowed")
        //     // ,
        //     // cnfpassword: Yup
        //     //     .string()
        //     //     .oneOf([Yup.ref('password'), null], 'Passwords must match')

        // }),


        onSubmit: async (data) => {
            setLoading(true);
            try {
                console.log({
                    ...data, teamplayersTypes, teamstaffsTypes, teamcoachesTypes, teamplayerID: "",
                    TypeofPlayer: "",
                    teamstaffID: "",
                    Typesofstaff: "",
                    teamcoachID: "",
                });
                // await updateAcademy(data);
                // handleClose();
                enqueueSnackbar("Team Updated Succesfully", { variant: "success" });
                // mutate();
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
            let finalData = { team: data }
            deleteTeam(finalData).then((response) => {
                if (response.status == "success") {
                    handleClose();
                    enqueueSnackbar("Team Deleted Succesfully", { variant: "success" });
                    mutate();
                    setLoading(false);
                }
                else {
                    handleClose();
                    enqueueSnackbar(`Error : ${response.message}`, { variant: "error" });
                    setLoading(false);
                }
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }


    const savePlayers = () => {
        let
            playerID = formik.values.teamplayerID.ID,
            playerName = formik.values.teamplayerID.FullName,
            playerTypeID = formik.values.TypeofPlayer.value,
            playerTypeName = formik.values.TypeofPlayer.label;

        //for UI
        let newTempNameArray = playersArrayTable;
        newTempNameArray.push({
            name: playerName,
            type: playerTypeName
        })

        // for payload
        let newTempMainIDArray = teamplayersTypes;
        newTempMainIDArray.push({
            playerID,
            playerTypeID
        })

        setTeamplayersTypes(newTempMainIDArray)
        setPlayersArrayTable(newTempNameArray)
        forceUpdate()

    };
    const saveStaffs = async () => {
        let
            staffID = formik.values.teamstaffID.ID,
            staffName = getFullName(formik.values.teamstaffID.FirstName, formik.values.teamstaffID.LastName),
            staffTypes = formik.values.Typesofstaff,
            newTempNameArray = [], newTempIDArray = [],
            newTempArray = staffArrayTable,
            newTempMainIDArray = teamstaffsTypes

        staffTypes?.map((item) => {
            newTempNameArray.push(item.label)
            newTempIDArray.push(item.value)
        })
        //for UI
        newTempArray.push({
            name: staffName,
            types: newTempNameArray
        })
        // for payload
        newTempMainIDArray.push({
            staffID,
            staffTypeIDs: newTempIDArray
        })
        setTeamstaffsTypes(newTempMainIDArray)
        setStaffArrayTable(newTempArray)
        forceUpdate()

    };
    const saveCoachs = () => {
        let
            coachID = formik.values.teamcoachID.ID,
            coachName = getFullName(formik.values.teamcoachID.FirstName, formik.values.teamcoachID.LastName),
            coachTypes = formik.values.Typesofcoach,
            newTempNameArray = [], newTempIDArray = [],
            newTempArray = coachArrayTable,
            newTempMainIDArray = teamcoachesTypes

        coachTypes?.map((item) => {
            newTempNameArray.push(item.label)
            newTempIDArray.push(item.value)
        })
        //for UI
        newTempArray.push({
            name: coachName,
            types: newTempNameArray
        })
        // for payload
        newTempMainIDArray.push({
            coachID: coachID,
            coachTypeIDs: newTempIDArray
        })
        setteamcoachesTypes(newTempMainIDArray)
        setCoachArrayTable(newTempArray)
        forceUpdate()
    };
    const handleRemove = (item, index, from) => {
        let selectName = {
            players: {
                tableArray: playersArrayTable,
                setTableArray: setPlayersArrayTable,
                payLoadArray: teamplayersTypes,
                setPayLoadArray: setTeamplayersTypes,
            },
            staffs: {
                tableArray: staffArrayTable,
                setTableArray: setStaffArrayTable,
                payLoadArray: teamstaffsTypes,
                setPayLoadArray: setTeamstaffsTypes,

            },
            Coaches: {
                tableArray: coachArrayTable,
                setTableArray: setCoachArrayTable,
                payLoadArray: teamcoachesTypes,
                setPayLoadArray: setteamcoachesTypes,

            },
        }

        //   for UI
        let
            tableArray = selectName[`${from}`].tableArray,
            setTableArray = selectName[`${from}`].setTableArray,
            payLoadArray = selectName[`${from}`].payLoadArray,
            setPayLoadArray = selectName[`${from}`].setPayLoadArray;

        setTableArray(removeItemFromArray(tableArray, index));
        setPayLoadArray(removeItemFromArray(payLoadArray, index));

        forceUpdate();

    }

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
            <DialogContent style={{ margin: 0, padding: 0 }} >
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        <div style={{
                            width: "100%",
                            height: "200px",
                            marginBottom: "-100px",
                            background: `url(${banner.src})center center`,
                        }}></div>

                        <Container maxWidth="lg">
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    {/* Profile */}
                                    <Card >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Avatar
                                                    src={team?.logo}
                                                    sx={{
                                                        height: 64,
                                                        mb: 2,
                                                        width: 64
                                                    }}
                                                />
                                                <Typography
                                                    color="textPrimary"
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    {team?.Team}
                                                </Typography>

                                            </Box>
                                        </CardContent>
                                        <Divider />

                                        <Grid container
                                            spacing={8} >

                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                xs={6}
                                            >
                                                <CardActions>
                                                    <TextField style={{ display: 'none' }}
                                                        error={Boolean(formik.touched.logo && formik.errors.logo)}
                                                        fullWidth
                                                        helperText={formik.touched.logo && formik.errors.logo}
                                                        label="Logo"
                                                        id="uploadTeamLogo"
                                                        margin="dense"
                                                        name="logo"
                                                        onBlur={formik.handleBlur}
                                                        onChange={onFileChnage}
                                                        type="file"
                                                        value={formik.values.logo}
                                                        variant="outlined"
                                                    />
                                                    <Button onClick={() => { document.getElementById("uploadTeamLogo").click() }}>Upload Logo</Button>

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

                                                </CardActions>
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                xs={6}
                                            >
                                                <CardActions>
                                                    <TextField style={{ display: 'none' }}
                                                        error={Boolean(formik.touched.banner && formik.errors.banner)}
                                                        fullWidth
                                                        helperText={formik.touched.banner && formik.errors.banner}
                                                        label="Banner"
                                                        id="uploadTeamBanner"
                                                        margin="dense"
                                                        name="banner"
                                                        onBlur={formik.handleBlur}
                                                        onChange={onFileChnage}
                                                        type="file"
                                                        value={formik.values.banner}
                                                        variant="outlined"
                                                    />
                                                    <Button onClick={() => { document.getElementById("uploadTeamBanner").click() }}>Upload Banner</Button>

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


                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                    {/* Profile */}
                                </Grid>
                                <Grid
                                    item
                                    lg={8}
                                    md={6}
                                    xs={12}
                                >
                                    {/* Details */}

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
                                                        error={Boolean(formik.touched.teamName && formik.errors.teamName)}
                                                        fullWidth
                                                        helperText={formik.touched.teamName && formik.errors.teamName}
                                                        label="Team Name"
                                                        margin="dense"
                                                        name="teamName"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="text"
                                                        value={formik.values.teamName}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <TextField
                                                        error={Boolean(formik.touched.managerName && formik.errors.managerName)}
                                                        fullWidth
                                                        helperText={formik.touched.managerName && formik.errors.managerName}
                                                        label="Manager's Name"
                                                        margin="dense"
                                                        name="managerName"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="text"
                                                        value={formik.values.managerName}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <TextField
                                                        error={Boolean(formik.touched.managerPhoneNo && formik.errors.managerPhoneNo)}
                                                        fullWidth
                                                        helperText={formik.touched.managerPhoneNo && formik.errors.managerPhoneNo}
                                                        label="Manager's Phone Number"
                                                        margin="dense"
                                                        name="managerPhoneNo"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="number"
                                                        value={formik.values.managerPhoneNo}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <TextField
                                                        error={Boolean(formik.touched.managerEmail && formik.errors.managerEmail)}
                                                        fullWidth
                                                        helperText={formik.touched.managerEmail && formik.errors.managerEmail}
                                                        label="Manager's Email"
                                                        margin="dense"
                                                        name="managerEmail"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="email"
                                                        value={formik.values.managerEmail}
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
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

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
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

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
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

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
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


                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Select Club</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.club}
                                                            label="Select Club"
                                                            name="club"
                                                            onChange={(e) => {
                                                                formik.handleChange(e)
                                                                onClubChange(e)
                                                            }}
                                                        >
                                                            {clubs?.map((option, key) => {
                                                                return (
                                                                    <MenuItem key={key}
                                                                        value={option.ID}>
                                                                        {option.name}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Select Club Sports</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.clubsportsID}
                                                            label="Select Club Sports"
                                                            name="clubsportsID"
                                                            onChange={formik.handleChange}
                                                        >
                                                            {clubSports?.map((option, key) => {
                                                                return (
                                                                    <MenuItem key={key}
                                                                        value={option.ID}>
                                                                        {option.Sports}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                                                                                    

                                            </Grid>
                                        </CardContent>

                                    </Card>

                                    {/* Details */}
                                </Grid>

                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                >
                                    <Card>
                                        <CardContent>
                                            <Grid container
                                                spacing={8} >
                                                {/* select team players */}
                                                {playersArrayTable?.length !== 0 && <TeamTable
                                                    array={playersArrayTable}
                                                    handleRemove={handleRemove}
                                                    type="players"
                                                    tableTitle="Players"
                                                ></TeamTable>}
                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Select Players</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.teamplayerID}
                                                            label="Select Players"
                                                            name="teamplayerID"
                                                            onChange={(e) => {
                                                                formik.handleChange(e)

                                                            }}
                                                        >
                                                            {players?.map((option, key) => {
                                                                return (
                                                                    <MenuItem key={key}
                                                                        value={option}>
                                                                        {option.FullName}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Type of Player</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.TypeofPlayer}
                                                            name="TypeofPlayer"
                                                            label="TypeofPlayer"
                                                            onChange={formik.handleChange}
                                                        >
                                                            {TypeofPlayer?.map((option, key) => (
                                                                <MenuItem key={key}
                                                                    value={option}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}>
                                                    <Button
                                                        onClick={savePlayers}
                                                        variant="contained">
                                                        Add Player
                                                    </Button>
                                                </Grid>

                                                {staffArrayTable?.length !== 0 && <TeamTable
                                                    array={staffArrayTable}
                                                    handleRemove={handleRemove}
                                                    type="staffs"
                                                    tableTitle="Staffs"
                                                ></TeamTable>}

                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Select Staff</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.teamstaffID}
                                                            label="Select Staff"
                                                            name="teamstaffID"
                                                            onChange={(e) => {
                                                                formik.handleChange(e)

                                                            }}
                                                        >
                                                            {staffs?.map((option, key) => {

                                                                return (
                                                                    <MenuItem key={key}
                                                                        value={option}>
                                                                        {getFullName(option.FirstName, option.LastName)}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>


                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Types of Staff</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.Typesofstaff}
                                                            name="Typesofstaff"
                                                            label="Typesofstaff"
                                                            onChange={formik.handleChange}
                                                            multiple
                                                        >
                                                            {TypeofPlayer?.map((option, key) => (
                                                                <MenuItem key={key}
                                                                    value={option}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}>
                                                    <Button
                                                        onClick={saveStaffs}
                                                        variant="contained">
                                                        Add Staff
                                                    </Button>
                                                </Grid>
                                                {coachArrayTable?.length !== 0 && <TeamTable
                                                    array={coachArrayTable}
                                                    handleRemove={handleRemove}
                                                    type="Coaches"
                                                    tableTitle="Coaches"
                                                ></TeamTable>}

                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Select Coach</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.teamcoachID}
                                                            label="Select Coach"
                                                            name="teamcoachID"
                                                            onChange={(e) => {
                                                                formik.handleChange(e)

                                                            }}
                                                        >
                                                            {coaches?.map((option, key) => {
                                                                return (
                                                                    <MenuItem key={key}
                                                                        value={option}>
                                                                        {getFullName(option.FirstName, option.LastName)}
                                                                    </MenuItem>
                                                                )
                                                            }
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>


                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}
                                                >
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-helper-label">Types of Coach</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={formik.values.Typesofcoach}
                                                            name="Typesofcoach"
                                                            label="Types of coach"
                                                            onChange={formik.handleChange}
                                                            multiple
                                                        >
                                                            {TypeofPlayer?.map((option, key) => (
                                                                <MenuItem key={key}
                                                                    value={option}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid
                                                    item
                                                    md={4}
                                                    xs={12}>
                                                    <Button
                                                        textAlign="right"
                                                        onClick={saveCoachs}
                                                        variant="contained">
                                                        Add Coach
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>

                                        <Divider />

                                        <CardActions>
                                            <Grid container
                                                spacing={8}
                                                style={{ textAlign: 'center' }} >
                                                <Grid
                                                    item
                                                    lg={6}
                                                    md={6}
                                                    xs={6}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        style={{ backgroundColor: 'red' }}
                                                        onClick={() => {
                                                            handleDelete(team.email)
                                                        }}>Delete</Button>
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={6}
                                                    md={6}
                                                    xs={6}
                                                >
                                                    <Button type="submit"
                                                        variant="contained">Save Details</Button>
                                                </Grid>

                                            </Grid>
                                        </CardActions>
                                    </Card>

                                </Grid>
                            </Grid>

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
