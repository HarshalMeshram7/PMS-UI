import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
  IconButton
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useEffect, useState } from 'react';
import { Close } from "@mui/icons-material";


export const MatchesListToolbar = (props) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (props.params?.search) {
      setSearchText(props.params?.search);
    }
  }, [props.params?.search]);

  const handleClear = () => {
    setSearchText("");
    props.search && props.search("");
  };

  const handleSubmitSearch = () => {
    if (searchText.length > 0) {
      props.search && props.search(searchText);
    } else {
      props.search && props.search("");
    }
  };

return(
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Matches
      </Typography>
      <Box sx={{ m: 1 }}>
        {/* <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={ props.handleOpenAddPlayer }
        >
          Add Matches
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          {/* <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Matches"
              variant="outlined"
            />
          </Box> */}
          <Box sx={{ maxWidth: 500 }}>
              <TextField
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitSearch();
                  }
                }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                fullWidth
                size="small"
                onSubmit={handleSubmitSearch}
                InputProps={{
                  sx: { px: 0 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSubmitSearch}>
                        <SvgIcon color="action"
                          fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: searchText?.length > 0 && (
                    <InputAdornment position="start">
                      <IconButton onClick={handleClear}>
                        <SvgIcon color="action"
                          fontSize="small">
                          <Close />
                        </SvgIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
                variant="outlined"
                color="info"
              />
            </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
}
