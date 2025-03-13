import { Container, Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#000', color: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          <Link href="#" color="inherit" underline="none">
            Home
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="none">
            About
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="none">
            Contact
          </Link>
        </Typography>
        <Typography variant="body2" color="inherit" align="center" sx={{ mt: 1 }}>
          {'© '}
          {new Date().getFullYear()}
          {' Mika. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;