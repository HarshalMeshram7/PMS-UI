import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

export default function PlayerFitnessTab({ formik }) {

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
                                    error={Boolean(formik.touched.FitnessPhysicalFitnessInfo && formik.errors.FitnessPhysicalFitnessInfo)}
                                    fullWidth
                                    helperText={formik.touched.FitnessPhysicalFitnessInfo && formik.errors.FitnessPhysicalFitnessInfo}
                                    label="Physical Fitness Infomation"
                                    margin="dense"
                                    name="FitnessPhysicalFitnessInfo"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.FitnessPhysicalFitnessInfo}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.FitnessLaboratoryInfo && formik.errors.FitnessLaboratoryInfo)}
                                    fullWidth
                                    helperText={formik.touched.FitnessLaboratoryInfo && formik.errors.FitnessLaboratoryInfo}
                                    label="Laboratory Information"
                                    margin="dense"
                                    name="FitnessLaboratoryInfo"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.FitnessLaboratoryInfo}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.FitnessPastMedication && formik.errors.FitnessPastMedication)}
                                    fullWidth
                                    helperText={formik.touched.FitnessPastMedication && formik.errors.FitnessPastMedication}
                                    label="Past Medication"
                                    margin="dense"
                                    name="FitnessPastMedication"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.FitnessPastMedication}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.FitnessCurrentMedication && formik.errors.FitnessCurrentMedication)}
                                    fullWidth
                                    helperText={formik.touched.FitnessCurrentMedication && formik.errors.FitnessCurrentMedication}
                                    label="Current Medication"
                                    margin="dense"
                                    name="FitnessCurrentMedication"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.FitnessCurrentMedication}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">FitnessPlayersInjuryID</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Player Injury"
                                        error={Boolean(formik.touched.FitnessPlayersInjuryID && formik.errors.FitnessPlayersInjuryID)}
                                        fullWidth
                                        helperText={formik.touched.FitnessPlayersInjuryID && formik.errors.FitnessPlayersInjuryID}
                                        margin="dense"
                                        name="FitnessPlayersInjuryID"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.FitnessPlayersInjuryID}
                                        variant="outlined"
                                    >
                                        <MenuItem value="1">No Injury</MenuItem>
                                        <MenuItem value="2">Knee Injury</MenuItem>
                                        <MenuItem value="3">Elbow Injury</MenuItem>
                                        <MenuItem value="4">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Diet Plan</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Diet Plan"
                                        error={Boolean(formik.touched.FitnessDietPlan && formik.errors.FitnessDietPlan)}
                                        fullWidth
                                        helperText={formik.touched.FitnessDietPlan && formik.errors.FitnessDietPlan}
                                        margin="dense"
                                        name="FitnessDietPlan"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.FitnessDietPlan}
                                        variant="outlined"
                                    >
                                        <MenuItem value="1">Breakfast</MenuItem>
                                        <MenuItem value="2">Lunch</MenuItem>
                                        <MenuItem value="3">Dinner</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Divider />

                        <DialogTitle
                            textAlign="center">
                            Fitness Test Advised
                        </DialogTitle>

                        <Grid container
                            spacing={3}>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.FitnessTestDetails && formik.errors.FitnessTestDetails)}
                                    fullWidth
                                    helperText={formik.touched.FitnessTestDetails && formik.errors.FitnessTestDetails}
                                    label="Test Details"
                                    margin="dense"
                                    name="FitnessTestDetails"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.FitnessTestDetails}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.FitnessTestConductedDate && formik.errors.FitnessTestConductedDate)}
                                    fullWidth
                                    helperText={formik.touched.FitnessTestConductedDate && formik.errors.FitnessTestConductedDate}
                                    label="Test Conducted Date"
                                    margin="dense"
                                    name="FitnessTestConductedDate"
                                    onBlur={formik.handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={formik.handleChange}
                                    type="date"
                                    value={formik.values.FitnessTestConductedDate}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.FitnessTestResult && formik.errors.FitnessTestResult)}
                                    fullWidth
                                    helperText={formik.touched.FitnessTestResult && formik.errors.FitnessTestResult}
                                    label="Test Result"
                                    margin="dense"
                                    name="FitnessTestResult"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.FitnessTestResult}
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
