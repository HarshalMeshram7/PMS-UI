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

export default function DescriptionTable({ array, handleRemove ,title}) {
    return (
        <Grid item md={12} xs={12}>
            <Typography
                        color="textPrimary"
                        // variant="body1"
                      >{title}
                      </Typography>
            {array?.length !== 0 && (
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr.No</TableCell>                            
                            <TableCell>Description</TableCell>                            
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array?.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{item.Description}</TableCell>
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
