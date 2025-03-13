import { useState } from 'react';
import Button from '@mui/material/Button';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import PEReprodPackagingsDialogForm from './containers/packagingExecution/PEReprodDialogForm';
import { packagingExecution, proposedWeightsBySections } from './utils/data';
import Footer from './containers/Footer';

const App = () => {
  const [isOpenPackagingsDialog, setIsOpenPackagingsDialog] = useState<boolean>(false)

  const toggleOpenRecipeDialog = () => setIsOpenPackagingsDialog(!isOpenPackagingsDialog)

  const handleSubmitReprod = (values: Record<string, any>) => {
    console.log('handleSubmitReprod', values)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: "column", flexGrow: 1 }}>
      <CssBaseline />
      {/* app bar */}
      <AppBar position="static" component="nav" sx={{ bgcolor: '#000' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ width: '140px' }}>
            <img alt="foodcheri" src="/logo.svg" />
          </Box>
        </Toolbar>
      </AppBar>
      {/* page title */}
      <Typography
        variant="h6"
        sx={{ ml: 4, mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        Ouvrir la série des modales de contre-pesée
      </Typography>
      {/* content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: "column",  alignItems: 'center', gap: '16px', p: 6, mt: 1 }}>
        <Button onClick={toggleOpenRecipeDialog} variant="contained">Faire une contre-pesée/reprod</Button>
      </Box>

      {/* 2. sections modal */}
      <PEReprodPackagingsDialogForm
        packagingExecution={packagingExecution}
        open={isOpenPackagingsDialog}
        onClose={toggleOpenRecipeDialog}
        onSubmit={handleSubmitReprod}
        proposedWeightsBySections={proposedWeightsBySections}
      />
      <Footer />
    </Box>
  );
}

export default App
