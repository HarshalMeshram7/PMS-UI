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
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAcademy } from "src/services/academyRequest";
import LoadingBox from "src/components/common/loading-box";
import { addUser } from "src/services/userRequests";

const userRole = [
  {
    value: "clubAdmin",
    label: "Club Admin",
  },
  {
    value: "federationAdmin",
    label: "Federation Admin",
  },
];

const federationClubAccess = [
  {
    value: "club1",
    label: "Club 1",
  },
  {
    value: "club2",
    label: "Club 2",
  },
  {
    value: "federation1",
    label: "Federation 1",
  },
  {
    value: "federation2",
    label: "Federation 2",
  },
];

export const AddUserAccessDialog = ({ open, handleClose ,user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [access, setAccess] = useState([]);

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
      userAccess: []
    
    },

    validationSchema: Yup.object({
      userName: Yup.string().max(100).required("User Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      cnfpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      firstName: Yup.string().max(100).required("First Name is required"),
      lastName: Yup.string().max(100).required("Last Name is required"),
      organization: Yup.string(),
      // .required('Required')
      email: Yup.string().email("Must be a valid Email").max(255).required("Email is required"),
      phone: Yup.string()
        .length(10)
        .matches(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/, "Phone number is not valid")
        .required("Phone number is required"),

      // userRole: Yup.string().max(100).required("Sport List is required"),
      // federationClubAccess: Yup.string().max(100).required("Federation / Club is required"),
    }),

    onSubmit: async (data) => {
      setLoading(true);

      try {
        console.log("**********");
        console.log(data);
        handleClose();
        enqueueSnackbar("User Added Succesfully", { variant: "success" });
        setLoading(false);
        
        // console.log("**********");
        //         console.log(data);
        //         await addUser(data).then((resp) => {
        //           console.log(resp);
        //             if (resp.status === "success") {
        //                 handleClose();
        //                 enqueueSnackbar("user Added Succesfully", { variant: "success" });
        //                 mutate();
        //                 setLoading(false);
        //             }
        //             if (resp.status === "failed") {
        //                 handleClose();
        //                 enqueueSnackbar("user Not Added", { variant: "failed" });
        //                 setLoading(false);
        //             }
        //         })
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const handleRoleChange = (e , value) =>{

    if(!e.target.value){
        setAccess([]);
    }
    if(e.target.value === 1 ){
        setAccess([{"ID":0,"name":"All Access"}]);
    }
    if(e.target.value === 2 || e.target.value === 3){
        setAccess(user?.federation_list);
    }
    
    if(e.target.value === 4 || e.target.value === 5){
        setAccess(user?.club_list);
    }
    
    if(e.target.value === 6 || e.target.value === 7){
        setAccess(user?.team_list);
    }
    
    if(e.target.value === 8){
        setAccess(user?.federation_list);
    }
    if(e.target.value === 9){
        setAccess(user?.federation_list);
    }
    if(e.target.value === 10){
        setAccess(user?.federation_list);
    }
    

 }



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
                label="First Name"
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
                error={Boolean(formik.touched.organization && formik.errors.organization)}
                fullWidth
                helperText={formik.touched.organization && formik.errors.organization}
                label="Organization"
                margin="dense"
                name="organization"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="organization"
                value={formik.values.organization}
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
            <Grid item md={6} xs={12}>
              {/* <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={userRole}
                                renderInput={(params) => <TextField {...params} label="User Role" />}
                            /> */}
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
                    <MenuItem key={key} value={item.ID}>
                      {item.Description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              {/* <Autocomplete
                multiple
                id="tags-outlined"
                options={federationClubAccess}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Federation / Club Access"
                    placeholder="Federation / Club Access"
                  />
                )}
              /> */}
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
                    <MenuItem key={key} value={item.ID}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
