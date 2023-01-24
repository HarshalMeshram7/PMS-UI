import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

export default function PlayerStatisticTab( {formik} ) {

    return (
        <>
            {/* <form onSubmit={formik.handleSubmit}> */}
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
                                <TextField
                                    error={Boolean(formik.touched.StaticMatchesPlayed && formik.errors.StaticMatchesPlayed)}
                                    fullWidth
                                    helperText={formik.touched.StaticMatchesPlayed && formik.errors.StaticMatchesPlayed}
                                    label="Matches Played"
                                    margin="dense"
                                    name="StaticMatchesPlayed"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.StaticMatchesPlayed}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.StaticPointScore && formik.errors.StaticPointScore)}
                                    fullWidth
                                    helperText={formik.touched.StaticPointScore && formik.errors.StaticPointScore}
                                    label="Point Score"
                                    margin="dense"
                                    name="StaticPointScore"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.StaticPointScore}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.StaticPenaltyScore && formik.errors.StaticPenaltyScore)}
                                    fullWidth
                                    helperText={formik.touched.StaticPenaltyScore && formik.errors.StaticPenaltyScore}
                                    label="Penalty Score"
                                    margin="dense"
                                    name="StaticPenaltyScore"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.StaticPenaltyScore}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.StaticVoilations && formik.errors.StaticVoilations)}
                                    fullWidth
                                    helperText={formik.touched.StaticVoilations && formik.errors.StaticVoilations}
                                    label="Voilations"
                                    margin="dense"
                                    name="StaticVoilations"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.StaticVoilations}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.StaticDisqualification && formik.errors.StaticDisqualification)}
                                    fullWidth
                                    helperText={formik.touched.StaticDisqualification && formik.errors.StaticDisqualification}
                                    label="Disqualification"
                                    margin="dense"
                                    name="StaticDisqualification"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.StaticDisqualification}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>

                        <Grid item md={12} xs={12} textAlign="center">
                            <Button sx={{ marginTop: 2 }} onClick={formik.handleSubmit} variant="outlined" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            {/* </form> */}
        </>
    );
}
