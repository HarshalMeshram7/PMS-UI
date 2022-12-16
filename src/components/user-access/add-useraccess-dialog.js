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
  Grid,
  Select,
  MenuItem,
  Box,
  formik,
  Card,
  Divider,
  Container,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBox from "src/components/common/loading-box";
import { addUser } from "src/services/userRequests";

const gender = [
  {
    value: "1",
    label: "Male",
  },
  {
    value: "2",
    label: "Female",
  },
  {
    value: "0",
    label: "Other",
  },
];

export const AddUserAccessDialog = ({ open, handleClose, user, mutate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [access, setAccess] = useState([]);
  const [finalAccessForTable, setFinalAccessForTable] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const [finalroles, setFinalroles] = useState({
    userFed: {
      userRole: "",
      userAccess: [],
    },
    userClub: {
      userRole: "",
      userAccess: [],
    },
    userTeam: {
      userRole: "",
      userAccess: [],
    },
    userAcademy: {
      userRole: "",
      userAccess: [],
    },
  });

  let userRoles = finalroles;

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      cnfpassword: "",
      firstName: "",
      lastName: "",
      organization: "",
      email: "",
      phone: "",
      userRole: [],
      userAccess: [],
      address: "",
      gender: [],
      DateOfBirth: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string().max(100).required("User Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      cnfpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      firstName: Yup.string().max(100).required("First Name is required"),
      lastName: Yup.string().max(100).required("Last Name is required"),
      organization: Yup.string(),
      email: Yup.string().email("Must be a valid Email").max(255).required("Email is required"),
      phone: Yup.string()
        .length(10)
        .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, "Phone number is not valid")
        .required("Phone number is required"),
    }),

    onSubmit: async (data) => {
      setLoading(true);
      try {
        let finalData = { ...data, userRoles: finalroles, userRole: "", userAccess: "" };
        await addUser(finalData).then((resp) => {
          if (resp.status === "success") {
            handleClose();
            enqueueSnackbar("user Added Succesfully", { variant: "success" });
            mutate();
            setLoading(false);
          }
          if (resp.status === "failed") {
            handleClose();
            enqueueSnackbar("user Not Added", { variant: "failed" });
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const handleRoleChange = (e, value) => {
    let AccessID = e.target.value?.AccessID;

    if (!e.target.value) {
      setAccess([]);
    }
    if (AccessID === 0) {
      setAccess([{ ID: 0, name: "All Access" }]);
    }
    if (AccessID === 1) {
      setAccess(user?.federation_list);
    }
    if (AccessID === 2) {
      setAccess(user?.club_list);
    }
    if (AccessID === 3) {
      setAccess(user?.academy_list);
    }
    if (AccessID === 4) {
      setAccess(user?.team_list);
    }
    if (AccessID === 5) {
      setAccess(user?.federation_list); // player
    }
    if (AccessID === 6) {
      setAccess(user?.federation_list); //report admin
    }
    if (AccessID === 7) {
      setAccess(user?.federation_list); //controller
    }
  };

  const handleAddRole = async () => {
    let AccessID = formik.values.userRole.AccessID,
      ID = formik.values.userRole.ID,
      Description = formik.values.userRole.Description;

    // for UI
    let newNameArray = [];
    let newIDArray = [];
    formik.values.userAccess?.map((item) => {
      if (item.name == null || item.name == undefined) {
      } else {
        newNameArray.push(item.name);
        newIDArray.push(item.ID);
      }
    });
    let newValue = finalAccessForTable;
    newValue.push({
      userRole: Description,
      userAccess: newNameArray,
    });
    setFinalAccessForTable(newValue);
    forceUpdate();

    // for final payload
    if (AccessID == 1 || AccessID == 5 || AccessID == 6 || AccessID == 7) {
      userRoles.userFed.userRole = ID;
      userRoles.userFed.userAccess = newIDArray;
      setFinalroles(userRoles);
    }
    if (AccessID == 2) {
      userRoles.userClub.userRole = ID;
      userRoles.userClub.userAccess = newIDArray;
      setFinalroles(userRoles);
    }
    if (AccessID == 3) {
      userRoles.userAcademy.userRole = ID;
      userRoles.userAcademy.userAccess = newIDArray;
      setFinalroles(userRoles);
    }
    if (AccessID == 4) {
      userRoles.userTeam.userRole = ID;
      userRoles.userTeam.userAccess = newIDArray;
      setFinalroles(userRoles);
    }
    formik.values.userRole = [];
    formik.values.userAccess = [];
  };

  const handleRoleRemove = (row, index) => {
    let newValue = finalAccessForTable;
    newValue.splice(index, 1);
    setFinalAccessForTable(newValue);
    forceUpdate();
  };

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
        <DialogTitle>Add New User</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Enter the required basic details of the User below.
          </DialogContentText>

          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.userName && formik.errors.userName)}
                fullWidth
                helperText={formik.touched.userName && formik.errors.userName}
                label="User Name"
                margin="dense"
                name="userName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.userName}
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
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address"
                margin="dense"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.address}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.gender}
                  name="gender"
                  label="Gender"
                  onChange={formik.handleChange}
                >
                  {gender?.map((option, key) => (
                    <MenuItem key={key} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

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
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                margin="dense"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="dense"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.lastName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.DateOfBirth && formik.errors.DateOfBirth)}
                fullWidth
                helperText={formik.touched.DateOfBirth && formik.errors.DateOfBirth}
                label="Date Of Birth"
                InputLabelProps={{ shrink: true }}
                margin="dense"
                name="DateOfBirth"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                value={formik.values.DateOfBirth}
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
          </Grid>
        </DialogContent>

        <Divider></Divider>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              {finalAccessForTable.length !== 0 && (
                <Table aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Roles</TableCell>
                      <TableCell>Access</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {finalAccessForTable?.map((row, rowkey) => {
                      return (
                        <TableRow key={rowkey}>
                          <TableCell>{row.userRole}</TableCell>
                          <TableCell>
                            {row.userAccess?.map((item, key) => {
                              return (
                                <p style={{ display: "inline" }} key={key}>
                                  {item},
                                </p>
                              );
                            })}
                          </TableCell>
                          <TableCell
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleRoleRemove(row, rowkey);
                            }}
                            align="right"
                          >
                            X
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="userRole">User Role</InputLabel>
                <Select
                  labelId="userRole"
                  id="userRole"
                  value={formik.values.userRole}
                  name="userRole"
                  label="userRole"
                  onChange={(e, value) => {
                    handleRoleChange(e, value);
                    formik.handleChange(e);
                  }}
                >
                  {user?.userTypes_list?.map((item, key) => (
                    <MenuItem key={key} value={item}>
                      {item.Description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="userAccess">User Access</InputLabel>
                <Select
                  multiple
                  labelId="userAccess"
                  id="userAccess"
                  value={formik.values.userAccess}
                  name="userAccess"
                  label="userAccess"
                  onChange={(e, value) => {
                    formik.handleChange(e);
                  }}
                >
                  {access?.map((item, key) => (
                    <MenuItem key={key} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <Button onClick={handleAddRole} variant="contained">
                Save Role
              </Button>
            </Grid>
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
