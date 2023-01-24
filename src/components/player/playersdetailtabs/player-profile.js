import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl, FormGroup,
    FormControlLabel, Switch, FormLabel, Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

export default function PlayerProfileTab() {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {

        },
        validationSchema: Yup.object({}),

        onSubmit: async (data) => {
            try {
                let finalData = {
                    ...data,
                    sharepicvideo: sharepicvideo,
                    sharematchhighlight: sharematchhighlight,
                    allowmembershare: allowmembershare,
                    academicstats: academicstats,
                    playerstats: playerstats,
                }
                console.log(finalData);
            } catch (error) {
                console.log(error);
            }
        },
    });

    const [sharepicvideo, setSharepicvideo] = React.useState(false);
    const [sharematchhighlight, setSharematchhighlight] = React.useState(false);
    const [allowmembershare, setAllowmembershare] = React.useState(false);
    const [academicstats, setAcademicstats] = React.useState(false);
    const [playerstats, setPlayerstats] = React.useState(false);

    const handleChange = (event) => {
        if (event.target.name == "sharepicvideo") {
            setSharepicvideo(event.target.checked,);
        }
        if (event.target.name == "sharematchhighlight") {
            setSharematchhighlight(event.target.checked,);
        }
        if (event.target.name == "allowmembershare") {
            setAllowmembershare(event.target.checked,);
        }
        if (event.target.name == "academicstats") {
            setAcademicstats(event.target.checked,);
        }
        if (event.target.name == "playerstats") {
            setPlayerstats(event.target.checked,);
        }
    };

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
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography>Share Match Picture / Video : </Typography>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl component="fieldset" variant="standard">
                                    {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={sharepicvideo} onChange={handleChange} name="sharepicvideo" />}
                                        // label="Share Match Picture / Video"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {/* <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography>Share Match Highlight : </Typography>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={sharematchhighlight} onChange={handleChange} name="sharematchhighlight" />}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid> */}

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography>Allow MemberTo Share : </Typography>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl component="fieldset" variant="standard">
                                    {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={allowmembershare} onChange={handleChange} name="allowmembershare" />}
                                        // label="Allow MemberTo Share"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography>Academic Stats : </Typography>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl component="fieldset" variant="standard">
                                    {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={academicstats} onChange={handleChange} name="academicstats" />}
                                        // label="Academic Stats "
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {/* <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography>Player Stats : </Typography>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={playerstats} onChange={handleChange} name="playerstats" />}
                                        
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid> */}
                        </Grid>

                        {/* <Grid item md={12} xs={12} textAlign="center">
                            <Button sx={{ marginTop: 2 }} type="submit" variant="outlined" color="primary">
                                Save
                            </Button>
                        </Grid> */}
                    </CardContent>
                </Card>
            </form>
        </>
    );
}
