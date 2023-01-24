import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

export default function PlayerTrainingModuleTab( {formik} ) {

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
                                    error={Boolean(formik.touched.TrainingShortTerm && formik.errors.TrainingShortTerm)}
                                    fullWidth
                                    helperText={formik.touched.TrainingShortTerm && formik.errors.TrainingShortTerm}
                                    label="Short Term Training"
                                    margin="dense"
                                    name="TrainingShortTerm"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.TrainingShortTerm}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.TrainingLongTerm && formik.errors.TrainingLongTerm)}
                                    fullWidth
                                    helperText={formik.touched.TrainingLongTerm && formik.errors.TrainingLongTerm}
                                    label="Long Term Training"
                                    margin="dense"
                                    name="TrainingLongTerm"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.TrainingLongTerm}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.TrainingSpecial && formik.errors.TrainingSpecial)}
                                    fullWidth
                                    helperText={formik.touched.TrainingSpecial && formik.errors.TrainingSpecial}
                                    label="Special Training"
                                    margin="dense"
                                    name="TrainingSpecial"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.TrainingSpecial}
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
