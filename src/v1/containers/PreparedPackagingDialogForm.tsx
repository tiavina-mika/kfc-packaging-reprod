import { useState } from "react"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormHelperText,
    IconButton,
    Alert,
    DialogTitle,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import WeightInput from "./WeightInput"
import { COLORS } from "../utils/constants"

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            width: 700,
            padding: '32px 24px',
            gap: '40px'
        },
    },
    title: {
        color: COLORS.primary,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 1.33,
        padding: "0px"
    },
    alert: {
        marginBottom: "40px"
    },
    description: {
        marginBottom: "40px"
    },
    column: {
        width: "100%",
    }
}

type Props = {
    onClose: () => void
    open: boolean
    onSubmit: (values: Record<string, any>) => void
    packagingExecution: Record<string, any> | null
}
const PreparedPackagingDialogForm = ({
    onClose,
    open,
    onSubmit,
    packagingExecution
}: Props) => {
    const [value, setValue] = useState<number>(0)
    const [error, setError] = useState<string>("")
    const [touched, setTouched] = useState<boolean>(false)

    const handleChange = (inputValue: number) => {
        setTouched(true)
        if (error) setError("")
        setValue(inputValue)
    }
    const handleConfirm = () => {
        if (!touched && value <= 0) {
            setError("Veuillez saisir le nombre de barquettes qui ont déjà été réalisées.")
            return
        }
        onSubmit({ weight: value })
        onClose()
    }

    const handleCancel = () => {
        setValue(0)
        setTouched(false)
        setError("")
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} sx={sx.dialog}>
            {/* dialog top */}
            <DialogTitle sx={sx.title}>
                {packagingExecution?.recipeName}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCancel}
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>
            {/* dialog content */}
            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                <Alert severity="info" sx={sx.alert}>
                    Choisissez la recette pour laquelle vous souhaitez faire une contre-pesée.
                </Alert>
                <DialogContentText sx={sx.description}>
                    Veuillez compter  le nombre total de barquettes déjà réalisées.
                </DialogContentText>
                <WeightInput
                    value={value}
                    onChange={handleChange}
                    label="Nombre de barquettes global"
                    valueLabel={3000}
                    subtitle="barquettes"
                    inputLabel="Nombre de barquettes réalisées"
                    hasError={!!error}
                    sxColumn={sx.column}
                    isTouched={touched}
                />
                {error && (
                    <FormHelperText error={!!error} sx={{ marginTop: "24px" }}>
                        {error}
                    </FormHelperText>
                )}
            </DialogContent>
            {/* dialog footer */}
            <DialogActions  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={handleCancel} color="primary">
                    Retour
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Valider
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PreparedPackagingDialogForm
