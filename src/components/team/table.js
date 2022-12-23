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

export default function TeamTable({ array, handleRemove, type , tableTitle }) {
    return (
        <Grid item md={12} xs={12}>
            <Typography
                        color="textPrimary"
                        // variant="body1"
                      >
                        {tableTitle}
                      </Typography>
            {array?.length !== 0 && (
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array?.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {item.type && <p style={{ display: "inline" }} >
                                            {item.type}
                                        </p>}

                                        {item.types && item.types?.map((item2, key) => {
                                            return (
                                                <p style={{ display: "inline" }} key={key}>
                                                    {item2},
                                                </p>
                                            );
                                        })}
                                    </TableCell>
                                    <TableCell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            handleRemove(item, index, `${type}`);
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
