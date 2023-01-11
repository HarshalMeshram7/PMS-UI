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

export default function TournamentStep3({ formik }) {
    return (
        <>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Typography
                        color="inherit"
                        variant="h5"
                    >
                        Add Teams (Step 3)
                    </Typography>
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Available Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="AvailableGroup"
                            label="Available Group"
                            onChange={(e) => { formik.handleChange(e) }}
                        >
                            <MenuItem value={1}>Hard code Group 1</MenuItem>
                            <MenuItem value={2}>Hard code Group 2</MenuItem>
                            <MenuItem value={0}>Hard code Group 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid
                    item
                    md={4}
                    xs={12}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Available Teams</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            multiple
                            value={formik.values.AvailableGroupTeams}
                            name="AvailableGroupTeams"
                            label="Available Teams"
                            onChange={(e) => { formik.handleChange(e) }}
                        >
                            <MenuItem value={1}>Hard code team 1</MenuItem>
                            <MenuItem value={2}>Hard code team 2</MenuItem>
                            <MenuItem value={0}>Hard code team 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Button type="submit" variant="contained">Next (Step 3)</Button>
                </Grid>
            </Grid>
        </>
    )
}
