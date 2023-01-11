import React from 'react'
import {
    Button,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Grid,
    Select,
    MenuItem,
} from "@mui/material";

export default function TournamentStep2({ formik, teams }) {
    return (
        <>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={12}
                    xs={12}>
                    <Typography
                        color="inherit"
                        variant="h5"
                    >
                        Create Groups (Step 2)
                    </Typography>
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Select teams for tournament</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={formik.values.teamList}
                            name="teamList"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            multiple
                            label="Team List"
                        >{teams?.map((item, key) => (
                            <MenuItem key={key} value={item.name}>{item.name}</MenuItem>)
                        )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.NOG && formik.errors.NOG)}
                        fullWidth
                        helperText={formik.touched.NOG && formik.errors.NOG}
                        label="Select Number of Groups"
                        margin="dense"
                        name="NOG"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.NOG}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.NOTIG && formik.errors.NOTIG)}
                        fullWidth
                        helperText={formik.touched.NOTIG && formik.errors.NOTIG}
                        label="Select MAX Number of Teams in a Group"
                        margin="dense"
                        name="NOTIG"
                        type="number"
                        variant="outlined"
                        value={formik.values.NOTIG}
                        onChange={(e) => {
                            if (formik.values.teamList.length > (formik.values.NOG * e.target.value)) {
                                formik.touched.NOTIG = true;
                                formik.errors.NOTIG = "Please choose greater number"
                            } else {
                                formik.touched.NOTIG = false;
                                formik.errors.NOTIG = ""
                            }
                            formik.handleChange(e)
                        }}
                        onBlur={formik.handleBlur}
                    />
                </Grid>

                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Button type="submit" variant="contained">Next (Step 2)</Button>
                </Grid>

            </Grid>
        </>
    )
}
