import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

export default function PlayerTrainingManagementTab( {formik} ) {
    

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
                                    error={Boolean(formik.touched.ManagementPlan && formik.errors.ManagementPlan)}
                                    fullWidth
                                    helperText={formik.touched.ManagementPlan && formik.errors.ManagementPlan}
                                    label="Plan Management"
                                    margin="dense"
                                    name="ManagementPlan"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.ManagementPlan}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.ManagementGoalSetting && formik.errors.ManagementGoalSetting)}
                                    fullWidth
                                    helperText={formik.touched.ManagementGoalSetting && formik.errors.ManagementGoalSetting}
                                    label="Goal Setting"
                                    margin="dense"
                                    name="ManagementGoalSetting"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.ManagementGoalSetting}
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
