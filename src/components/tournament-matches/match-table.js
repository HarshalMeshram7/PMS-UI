import React from 'react'
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"

export default function MatchTable({ array, handleRemove, title }) {
    return (
        <Grid item md={12} xs={12}>
            <Typography
                color="textPrimary"
            // variant="body1"
            >
                {title}
            </Typography>
            {array?.length !== 0 && (
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sports</TableCell>
                            <TableCell>Divison</TableCell>
                            <TableCell>Group</TableCell>
                            <TableCell>Team1</TableCell>
                            <TableCell>VS</TableCell>
                            <TableCell>Team2</TableCell>
                            <TableCell>Match Date/Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Stadium</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array?.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.Sports}</TableCell>
                                    <TableCell>{item.Divison}</TableCell>
                                    <TableCell>{item.GroupName}</TableCell>
                                    <TableCell>{item.Team1}</TableCell>
                                    <TableCell align="center" >VS</TableCell>
                                    <TableCell>{item.Team2}</TableCell>
                                    <TableCell>{item.MatchStartDateTime}</TableCell>
                                    <TableCell>{item.Duration}</TableCell>
                                    <TableCell>{item.Stadium}</TableCell>
                                    <TableCell>{item.Result}</TableCell>
                                    <TableCell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            handleRemove(item)
                                        }}
                                        align="right"
                                    >
                                        X
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </Grid>
    )
}
