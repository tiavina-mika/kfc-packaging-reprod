import { useState } from 'react';
import Button from '@mui/material/Button';
import RecipeDialogForm from './containers/RecipeDialogForm';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import SectionsSelectionDialogForm from './containers/SectionsSelectionDialogForm';
import Recipes from './containers/Recipes';
import PreparedPackagingDialogForm from './containers/PreparedPackagingDialogForm';

const App = () => {
  const [isOpenRecipeDialog, setIsOpenRecipeDialog] = useState(false)
  const [selectedPackagingExecution, setSelectedPackagingExecution] = useState<Record<string, any> | null>(null)
  const [isOpenSectionsDialog, setIsOpenSectionsDialog] = useState(false)
  // const [selectedPackagingExecution, setSelectedPackagingExecution] = useState<Record<string, any> | null>(packagingExecutions[0])
  const [isOpenPreparedPackagingDialog, setIsOpenPreparedPackagingDialog] = useState(false)

  const toggleOpenRecipeDialog = () => setIsOpenRecipeDialog(!isOpenRecipeDialog)
  const toggleOpenPreparedPackagingDialog = () => setIsOpenPreparedPackagingDialog(!isOpenPreparedPackagingDialog)

  const handleSubmitRecipe = (values: Record<string, any>) => {
    setSelectedPackagingExecution(values.recipe)
    setIsOpenSectionsDialog(true)
  }

  const handleCloseSectionsDialog = () => {
		// setSelectedPackagingExecution(null)
    setIsOpenSectionsDialog(false)
    toggleOpenRecipeDialog()
	}

  const handleSubmitSections = (values: Record<string, any>) => {
    console.log('handleSubmitSections values', values)
    toggleOpenPreparedPackagingDialog()
    setIsOpenSectionsDialog(false)
  }

  const handleSubmitPreparedPackaging = (values: Record<string, any>) => {
    console.log('handleSubmitPreparedPackaging values', values)
    toggleOpenRecipeDialog()
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
        {/* table with list of recipe */}
        <Recipes />
      </Box>
      {/* modals */}
      {/* 1. recipe modal */}
      <RecipeDialogForm
        onClose={toggleOpenRecipeDialog}
        open={isOpenRecipeDialog}
        onSubmit={handleSubmitRecipe}
      />
      {/* 2. sections modal */}
      <SectionsSelectionDialogForm
        packagingExecution={selectedPackagingExecution}
        open={isOpenSectionsDialog}
        onClose={handleCloseSectionsDialog}
        onSubmit={handleSubmitSections}
      />
      {/* 3. prepared packaging form */}
      <PreparedPackagingDialogForm
        open={isOpenPreparedPackagingDialog}
        onClose={toggleOpenPreparedPackagingDialog}
        packagingExecution={selectedPackagingExecution}
        onSubmit={handleSubmitPreparedPackaging}
      />
    </Box>
  );
}

export default App
