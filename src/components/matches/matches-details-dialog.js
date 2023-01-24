import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Container,
  Tabs,
  Typography,
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableHead,
  TableRow,
  StyledTableCell,
  TableBody,
  StyledTableRow,
  Grid,
  TextField,
  Divider,
  Card,
  CardContent,
  Tab,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";

import LoadingBox from "src/components/common/loading-box";
import { PlayerListResults } from "src/components/player/player-list-results";

import { players } from "../../__mocks__/players.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { deleteAcademy } from "src/services/academyRequest.js";
import banner from "../../../public/static/images/background/register.jpg";
import FederationFinance from "../federation/federationfinance-component/federation-finance.js";
import FederationEcommerse from "../federation/federationfinance-component/federation-ecommerse.js";
import FederationOrganization from "../federation/federationfinance-component/federation-organization.js";
import PlayerDetailsTab from "../player/playersdetailtabs/players-personal-tab.js";
import PlayerPaymnetTab from "../player/playersdetailtabs/players-paymnet-tab.js";
import AcademyFinance from "../academy/academyfinance-component/academy-finance.js";
import PlayerContractType from "../player/playersdetailtabs/players-contract.js";
import PlayerFitnessTab from "../player/playersdetailtabs/player-fitness-tab.js";
import PlayerTrainingModuleTab from "../player/playersdetailtabs/player-trainingmodule-tab.js";
import PlayerTrainingManagementTab from "../player/playersdetailtabs/player-trainingmanagement-tab.js";
import PlayerStatisticTab from "../player/playersdetailtabs/player-statistic.js";
import PlayerCommunicationTab from "../player/playersdetailtabs/player-communication.js";
import PlayerProfileTab from "../player/playersdetailtabs/player-profile.js";
import PlayerTMSITMSTab from "../player/playersdetailtabs/player-TMSITMS-tab.js";
import { DataModel, initialValues } from "../player/PlayerDetailsData.js";
import { getFullName } from "src/utils/commonFunctions.js";
import { updatePlayers } from "src/services/playersRequest.js";

export const MatchesDetailsDialog = ({ open, handleClose ,player ,initValue, mutate}) => {

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [value, setValue] = useState("0");
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValue,
    validationSchema: Yup.object({}),

    onSubmit: async (data) => {
      setLoading(true);
      try {
        DataModel(data).then(async (DataModel) => {
          updatePlayers(DataModel).then((res)=>{
            handleClose();
            enqueueSnackbar("Player Updated Succesfully", { variant: "success" });
            setLoading(false);
            mutate();
          })
        })
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={!loading && handleClose}
      fullWidth
      maxWidth="xl"
      BackdropProps={{
        style: { backgroundColor: "#121212dd" },
      }}
    >
      {loading && <LoadingBox />}
      <DialogContent style={{ margin: 0, padding: 0 }}>
        {/* <form onSubmit={formik.handleSubmit}> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              marginBottom: "-100px",
              // background: `url(${club.Banner})center center`,
            }}
          ></div>

          
        </Box>
        {/* </form> */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
