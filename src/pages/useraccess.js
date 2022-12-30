import Head from "next/head";
import { Box, Container } from "@mui/material";
import { AddUserAccessDialog } from "src/components/user-access/add-useraccess-dialog";
import { UserAccessListToolbar } from "src/components/user-access/useraccess-list-toolbar";
import { UserAccessListResults } from "src/components/user-access/useraccess-list-result";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState } from "react";
import { useAllUser2 } from "src/adapters/usersAdapters";
import { UserAccessDetailsDialog } from "src/components/user-access/useraccess-details-dialog";
import { getUserDetails, deleteUser, getUserTypeList } from "src/services/userRequests";
import DeleteDialog from "src/components/common/deleteDialog";
import LoadingBox from "src/components/common/loading-box";

const Useraccess = () => {
  const [showAddUserAccessDialog, setShowAddUserAccessDialog] = useState(false);
  const [showUserAccessDetailsDialog, setShowUserAccessDetailsDialog] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [user, setUser] = useState({});
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOpenAddUserAccess = () => {
    try {
      setLoading(true);
      getUserTypeList().then((res) => {
        if (res?.status === "SUCCESS") {
          setUser(res.result);
        }

        setShowAddUserAccessDialog(true);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseAddUserAccess = () => setShowAddUserAccessDialog(false);

  const handleCloseUserAccessDetails = () => setShowUserAccessDetailsDialog(false);
  const handleOpenUserAccessDetails = (user) => {
    try {
      setLoading(true);
      getUserDetails({ id: user.ID }).then(async (res) => {
        if (res?.status === "SUCCESS") {
          let userAccessForTable = [];
          let userRole = {
            userFed: [],
            userClub: [],
            userTeam: [],
            userAcademy: [],
          };

          // for modeling userFederation from api for ui
          if (res.result?.userFederations?.length != 0) {
            let userFederations = res.result?.userFederations;
            let oldID = 0;
            userFederations?.map(async (item) => {
              let userTypeID = item.UserTypeID;
              if (oldID != userTypeID) {
                oldID = userTypeID;
                let tempData = {
                  userRole: item.Description,
                  userAccess: [],
                };
                let tempDataPayload = {
                  userRole: item.UserTypeID,
                  userAccess: [],
                };
                await res.result?.userFederations
                  ?.filter((a) => {
                    if (a.UserTypeID == userTypeID) {
                      return a;
                    }
                  })
                  .map((item) => {
                    tempData.userAccess.push(item.Federation);
                    tempDataPayload.userAccess.push(item.FederationID);
                  });

                userAccessForTable.push(tempData);
                userRole.userFed.push(tempDataPayload);
              }
            });
          }

          // for modeling userClub from api for ui

          if (res.result?.userClubs?.length != 0) {
            let userClubs = res.result?.userClubs;
            let oldID = 0;
            userClubs?.map(async (item) => {
              let userTypeID = item.UserTypeID;

              if (oldID != userTypeID) {
                oldID = userTypeID;
                let tempData = {
                  userRole: item.Description,
                  userAccess: [],
                };
                let tempDataPayload = {
                  userRole: item.UserTypeID,
                  userAccess: [],
                };
                await res.result?.userClubs
                  ?.filter((a) => {
                    if (a.UserTypeID == userTypeID) {
                      return a;
                    }
                  })
                  .map((item) => {
                    tempData.userAccess.push(item.Club);
                    tempDataPayload.userAccess.push(item.ClubID);
                  });
                userAccessForTable.push(tempData);
                userRole.userClub.push(tempDataPayload);
              }
            });
          }

          // for modeling userAcademy from api for ui
          if (res.result?.userAcademy?.length != 0) {
            let userAcademy = res.result?.userAcademy;
            let oldID = 0;
            userAcademy?.map(async (item) => {
              let userTypeID = item.UserTypeID;

              if (oldID != userTypeID) {
                oldID = userTypeID;
                let tempData = {
                  userRole: item.Description,
                  userAccess: [],
                };
                let tempDataPayload = {
                  userRole: item.UserTypeID,
                  userAccess: [],
                };
                await res.result?.userAcademy
                  ?.filter((a) => {
                    if (a.UserTypeID == userTypeID) {
                      return a;
                    }
                  })
                  .map((item) => {
                    tempData.userAccess.push(item.Academy);
                    tempDataPayload.userAccess.push(item.AcademyID);
                  });
                userAccessForTable.push(tempData);
                userRole.userTeam.push(tempDataPayload);
              }
            });
          }

          // for modeling userTeam from api for ui
          if (res.result?.userTeams?.length != 0) {
            let userTeams = res.result?.userTeams;
            let oldID = 0;
            userTeams?.map(async (item) => {
              let userTypeID = item.UserTypeID;

              if (oldID != userTypeID) {
                oldID = userTypeID;
                let tempData = {
                  userRole: item.Description,
                  userAccess: [],
                };
                let tempDataPayload = {
                  userRole: item.UserTypeID,
                  userAccess: [],
                };
                await res.result?.userTeams
                  ?.filter((a) => {
                    if (a.UserTypeID == userTypeID) {
                      return a;
                    }
                  })
                  .map((item) => {
                    tempData.userAccess.push(item.Team);
                    tempDataPayload.userAccess.push(item.ClubTeamID);
                  });
                userAccessForTable.push(tempData);
                userRole.userAcademy.push(tempDataPayload);
              }
            });
          }
          let Senduser = {
            ...res.result,
            fullName: user.FullName,
            userAccessForTable: userAccessForTable,
            userRole: userRole,
          };
          setUser(Senduser);
          setLoading(false);
          setShowUserAccessDetailsDialog(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = (id) => {
    try {
      deleteUser({ Id: id }).then((res) => {
        if (res?.status === "success") {
          setOpenDeleteDialogue(false);
          mutate();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDeleteDialogue = (user) => {
    setUser(user);
    setOpenDeleteDialogue(true);
  };

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteDialogue(false);
  };
  const handleSearch = (value) => {
    setParams((p) => ({ ...p, searchpattern: value }));
  };

  const { users, mutate } = useAllUser2({ ...params });

  return (
    <>
      <Head>
        <title>User Access | PMS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {loading && <LoadingBox />}
        <DeleteDialog
          handleDelete={handleDeleteUser}
          name={user.FullName}
          ID={user.ID}
          open={openDeleteDialogue}
          handleClose={handleCloseDeleteDialogue}
        />
        <AddUserAccessDialog
          users={users}
          user={user}
          open={showAddUserAccessDialog}
          handleClose={handleCloseAddUserAccess}
          mutate={mutate}
          />
        <UserAccessDetailsDialog
          mutate={mutate}
          user={user}
          open={showUserAccessDetailsDialog}
          handleClose={handleCloseUserAccessDetails}

        />
        <Container maxWidth={false}>
          <UserAccessListToolbar
            search={handleSearch}
            handleOpenAddUserAccess={handleOpenAddUserAccess}
            open={showAddUserAccessDialog}
          />
          <Box sx={{ mt: 3 }}>
            <UserAccessListResults
              userAccess={users || []}
              handleOpenUserAccessDetails={handleOpenUserAccessDetails}
              handleOpenDeleteDialogue={handleOpenDeleteDialogue}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Useraccess.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Useraccess;
