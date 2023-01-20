
import { useState, useReducer } from "react";
import {
    Button,
    Typography,
    CardContent,
    List,

    Card,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
    Box,
    Autocomplete,
    TextField
} from "@mui/material";
import { useFormik } from "formik";



export default function TournamentStep3({ handleStep3,
    tournamentSportsDivisionGroupsTeams, GroupTeams
}) {
    const [teams, setTeams] = useState([])
    const [group, setGroup] = useState()

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);


    if (tournamentSportsDivisionGroupsTeams) {
        const { TSDGroups, TSDTeams } = tournamentSportsDivisionGroupsTeams;
    }

    const { groupsTeamsForTable, setGroupsTeamsForTable, groupsTeamsID, setGroupsTeamsID
    } = GroupTeams;

    const handleAddGroupTeam = async () => {

        let groupID = group.ID,
            groupName = group.Description,
            newTempNameArray = [],
            newTempIDArray = [],
            newTempArray = groupsTeamsForTable,
            newTempMainIDArray = groupsTeamsID;

        teams?.map((item) => {
            newTempNameArray.push(item.Description);
            newTempIDArray.push(item.ID);
        });
        //for UI
        newTempArray.push({
            group: groupName,
            teams: newTempNameArray,
        });
        // for payload
        newTempMainIDArray.push({
            GroupID: groupID,
            TeamsID: newTempIDArray,
        });

        setGroupsTeamsID(newTempMainIDArray);
        setGroupsTeamsForTable(newTempArray);
        console.log({ newTempMainIDArray });
        console.log({ newTempArray });

        forceUpdate();

    };

    return (
        <>
            {/* Creating Groups */}
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
                md={3}
                xs={12}
            >
                {/* <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> */}

                {groupsTeamsForTable?.length > 0 && groupsTeamsForTable?.map((item, key) => (

                    <Card key={key} variant="outlined">
                        <CardContent style={{ paddingBottom: 50 }} >
                            <List component="h3" subheader={item.group} >
                                {item?.teams?.map((item2, key) => (

                                    <ListItem key={key} disablePadding  >
                                        <ListItemButton>
                                            <ListItemText primary={item2} />
                                        </ListItemButton>
                                    </ListItem>))}
                                < Divider />
                                <Box >
                                    <Grid
                                        container
                                        sx={{ justifyContent: 'space-between' }}
                                    >
                                        <Grid
                                            item
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                        </Grid>
                                        <Grid
                                            item
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Button>X</Button>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </List>
                        </CardContent>

                    </Card>))}
                {/* </Box> */}
            </Grid>

         
                <Grid item md={12} xs={12}>
                    <Autocomplete
                        id="tags-outlined"
                        options={TSDGroups || []}
                        getOptionLabel={(option) => option.Description}
                        filterSelectedOptions
                        onChange={(e, value) => { setGroup(value) }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Group"
                                placeholder="Select Group"
                            />
                        )}
                    />
                </Grid>

                <Grid item md={12} xs={12}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={TSDTeams || []}
                        getOptionLabel={(option) => option.Description}
                        filterSelectedOptions
                        onChange={(e, value) => { setTeams(value) }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Teams"
                                placeholder="Select Team"
                            />
                        )}
                    />
                </Grid>

                <Grid item md={12} xs={12}>
                    <Button onClick={handleAddGroupTeam} variant="contained">
                        Add Teams
                    </Button>
                </Grid>
           

            <Grid
                item
                md={4}
                xs={12}
            >
                <Button  onClick={() => { handleStep3(groupsTeamsID) }} variant="contained">Next (Step 3)</Button>
            </Grid>

        </>
    )
}
