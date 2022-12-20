import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBox = ({ children }) => {
  return (
    <Box
      sx={{
        // width: "100vw",
        // height: "100vh",
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        top:"50vh",
        left:"50vw",
        position: "absolute",
        zIndex: 2,
        background: "#ffffff80",
      }}
    >
      <CircularProgress />
      {children}
    </Box>
  );
};

export default LoadingBox;
