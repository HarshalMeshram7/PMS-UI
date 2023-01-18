import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';

export const TournamentCard = ({ product, handleOpenTournamentDetails, handleOpenTournamentFixtures,
  ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Product"
          src={product.Logo}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {product.name}
      </Typography>

    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
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

          <Button
            id={product.name}
            onClick={() => { handleOpenTournamentFixtures() }}>Fixtures
          </Button>

          <Button
            id={product.name}
            onClick={() => { handleOpenTournamentDetails(product) }}>Details
          </Button>

        </Grid>
      </Grid>
    </Box>
  </Card>
);

TournamentCard.propTypes = {
  product: PropTypes.object.isRequired
};
