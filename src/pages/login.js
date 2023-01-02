import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useState } from "react";
import { getLoginUser, login, loginNew } from "src/services/authRequests";
import loginBackground from "../../public/static/images/background/login.jpg";
import LoadingModal from "src/components/common/loading-modal";
import LoadingBox from "src/components/common/loading-box";
import useStorage from "src/hooks/useStorage";
const Login = () => {
  const router = useRouter();
  const {
    setFedFilter,
    setAcademyFilter,
    setClubFilter,
    setClubTeamFilter,
    fedFilter,
    academyFilter,
    clubFilter,
    clubTeamFilter,
  } = useStorage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const { mutateUser, isLoading, isValidating } = useAuth({
  //   redirectTo: "/",
  //   redirectIfFound: true,
  // });

  const formik = useFormik({
    initialValues: {
      email: "Federation@pixonix.tech",
      password: "m",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      setError("");
      try {
        await loginNew({ userName: email, password: password }).then(async (res) => {
          if (res.status === "success") {
            const { Id } = res?.result;
            await getLoginUser({ id: Id }).then((response) => {
              const { filterByAcademyID, filterByClubsID, filterByFederationsID, filterByTeamsID } =
                response?.result;
              setFedFilter(filterByAcademyID);
              setAcademyFilter(filterByClubsID);
              setClubFilter(filterByFederationsID);
              setClubTeamFilter(filterByTeamsID);
              router.push("/")
            });
          } else {
            if (res.status === "FAILED") {
              setError(res.message);
            }
          }
        });
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        setLoading(false);
        setError("Login Failed !");
        console.log(error);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | PMS</title>
      </Head>
      {loading && <LoadingModal />}
      <Box
        component="main"
        style={{
          background: `url("${loginBackground.src}")center center,linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
        }}
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container
          maxWidth="sm"
          style={{
            paddingBottom: "20px",
            background: "white",
            borderRadius: "20px",
          }}
        >
          <NextLink href="/register" passHref>
            <Button
              style={{ float: "right" }}
              component="a"
              endIcon={<ArrowForwardIcon fontSize="small" />}
            >
              Register
            </Button>
          </NextLink>

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Login
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}></Grid>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography style={{ color: "red" }}>{error}</Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Register
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
