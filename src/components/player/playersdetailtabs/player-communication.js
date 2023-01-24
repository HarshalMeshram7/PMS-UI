import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Grid, TextField, Button, Card, CardContent, MenuItem, FormControl,
    Select, DialogTitle, InputLabel
} from "@mui/material";
import { Divider, Typography } from "@material-ui/core";
import { Male } from "@mui/icons-material";

export default function PlayerCommunicationTab( {formik} ) {
    

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
                                    error={Boolean(formik.touched.CommunicationCoaches && formik.errors.CommunicationCoaches)}
                                    fullWidth
                                    helperText={formik.touched.CommunicationCoaches && formik.errors.CommunicationCoaches}
                                    label="Coaches"
                                    margin="dense"
                                    name="CommunicationCoaches"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.CommunicationCoaches}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.CommunicationTeamMember && formik.errors.CommunicationTeamMember)}
                                    fullWidth
                                    helperText={formik.touched.CommunicationTeamMember && formik.errors.CommunicationTeamMember}
                                    label="Team Member"
                                    margin="dense"
                                    name="CommunicationTeamMember"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.CommunicationTeamMember}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.CommunicationGroupMessaging && formik.errors.CommunicationGroupMessaging)}
                                    fullWidth
                                    helperText={formik.touched.CommunicationGroupMessaging && formik.errors.CommunicationGroupMessaging}
                                    label="Group Messaging"
                                    margin="dense"
                                    name="CommunicationGroupMessaging"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.CommunicationGroupMessaging}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.CommunicationLiveChat && formik.errors.CommunicationLiveChat)}
                                    fullWidth
                                    helperText={formik.touched.CommunicationLiveChat && formik.errors.CommunicationLiveChat}
                                    label="Live Chat"
                                    margin="dense"
                                    name="CommunicationLiveChat"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.CommunicationLiveChat}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.CommunicationNotificationRemainder && formik.errors.CommunicationNotificationRemainder)}
                                    fullWidth
                                    helperText={formik.touched.CommunicationNotificationRemainder && formik.errors.CommunicationNotificationRemainder}
                                    label="Notification Remainder"
                                    margin="dense"
                                    name="CommunicationNotificationRemainder"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.CommunicationNotificationRemainder}
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
