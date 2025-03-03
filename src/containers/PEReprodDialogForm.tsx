import { useEffect, useRef } from "react"
import { Form, Formik } from "formik"
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
    FormHelperText,
    Stack,
    DialogTitle,
} from "@mui/material"

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            width: 700,
            padding: '32px 24px',
            gap: '40px'
        },
    },
    dialogTitle: {
        color: '#262626',
        fontFamily: 'Roboto',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 1.33,
    },
    dialogContent: {
        p: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}

type Props = {
    onClose: () => void
    open: boolean
    onSubmit: (values: Record<string, any>) => void
    packagingExecution: Record<string, any> | null
}
const PEReprodDialogForm = ({
    onClose,
    open,
    onSubmit,
    packagingExecution,
}: Props) => {
    const formikRef = useRef(null)
    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    const handleConfirm = () => {
        (formikRef.current as any)?.submitForm()
    }

    const _handleSubmit = (values: Record<string, any>) => {
        onSubmit(values)
    }


    return (
        <Dialog open={open} onClose={onClose} scroll="body" sx={sx.dialog}>
            <DialogTitle>
                {packagingExecution?.uniqueCode} - {packagingExecution?.recipeName}
            </DialogTitle>
            <DialogContent sx={sx.dialogContent}>
                <DialogContentText>
                    Choisissez la section sur laquelle vous devez faire une contre-pesée.
                </DialogContentText>
                <Box ref={descriptionElementRef} tabIndex={-1}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{ packagings: packagingExecution?.packagings || [] }}
                        // validationSchema={schema}
                        onSubmit={_handleSubmit}
                    >
                        {({ errors }) => {
                            return (
                                <Form>
                                    <Stack spacing={1}>
                                        
                                        {errors?.packagings && typeof errors.packagings === 'string' && (
                                            <FormHelperText error>{errors.packagings}</FormHelperText>
                                        )}
                                    </Stack>
                                </Form>
                            )
                        }}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions  sx={sx.dialogActions}>
                <Button onClick={onClose} color="primary">
                    Retour
                </Button>
                <Button onClick={handleConfirm} color="primary" variant="contained">
                    Suivant
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PEReprodDialogForm
