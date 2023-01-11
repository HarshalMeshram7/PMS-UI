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

export default function TournamentStep1({ formik, sportsList, handleStep1 }) {
    return (
        <>
            <Grid
                container
                spacing={3}
            >

                {/* Typography */}
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Typography
                        color="inherit"
                        variant="h5"
                    >
                        Sports Division (Step 1)
                    </Typography>
                </Grid>

                {/* Sports List */}
                <Grid
                    item
                    md={4}
                    xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Sports</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={formik.values.SportID}
                            label="Sports"
                            name="SportID"
                            onChange={formik.handleChange}
                            required
                        >
                            {sportsList?.map((item, key) => (
                                <MenuItem key={key} value={item.ID}>
                                    {item.Sports}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.MinPlayers && formik.errors.MinPlayers)}
                        fullWidth
                        helperText={formik.touched.MinPlayers && formik.errors.MinPlayers}
                        label="Minimum Players"
                        margin="dense"
                        name="MinPlayers"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.MinPlayers}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.MaxPlayers && formik.errors.MaxPlayers)}
                        fullWidth
                        helperText={formik.touched.MaxPlayers && formik.errors.MaxPlayers}
                        label="Maximum Players"
                        margin="dense"
                        name="MaxPlayers"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.MaxPlayers}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.InternationalPlayers && formik.errors.InternationalPlayers)}
                        fullWidth
                        helperText={formik.touched.InternationalPlayers && formik.errors.InternationalPlayers}
                        label="International Players"
                        margin="dense"
                        name="InternationalPlayers"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.InternationalPlayers}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.NationalPlayers && formik.errors.NationalPlayers)}
                        fullWidth
                        helperText={formik.touched.NationalPlayers && formik.errors.NationalPlayers}
                        label="National Players"
                        margin="dense"
                        name="NationalPlayers"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.NationalPlayers}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.LocalPlayers && formik.errors.LocalPlayers)}
                        fullWidth
                        helperText={formik.touched.LocalPlayers && formik.errors.LocalPlayers}
                        label="Local Players"
                        margin="dense"
                        name="LocalPlayers"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.LocalPlayers}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.AcademyPlayers && formik.errors.AcademyPlayers)}
                        fullWidth
                        helperText={formik.touched.AcademyPlayers && formik.errors.AcademyPlayers}
                        label="Academy Players"
                        margin="dense"
                        name="AcademyPlayers"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.AcademyPlayers}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.DivisonDescription && formik.errors.DivisonDescription)}
                        fullWidth
                        helperText={formik.touched.DivisonDescription && formik.errors.DivisonDescription}
                        label="Division Description"
                        margin="dense"
                        name="DivisonDescription"
                        type="text"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.DivisonDescription}
                    />
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="Gender"
                            label="Gender"
                            onChange={(e) => { formik.handleChange(e) }}
                        >
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                            <MenuItem value={0}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <TextField
                        error={Boolean(formik.touched.NoOfTeams && formik.errors.NoOfTeams)}
                        fullWidth
                        helperText={formik.touched.NoOfTeams && formik.errors.NoOfTeams}
                        label="Number Of Teams"
                        margin="dense"
                        name="NoOfTeams"
                        type="number"
                        variant="outlined"
                        onChange={(e) => { formik.handleChange(e) }}
                        onBlur={formik.handleBlur}
                        value={formik.values.NoOfTeams}
                    />
                </Grid>

                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Button type="submit" onClick={handleStep1} variant="contained">Next (Step 1)</Button>
                </Grid>
            </Grid>
        </>
    )
}
