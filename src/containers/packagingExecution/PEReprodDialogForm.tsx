import { useEffect, useRef } from "react"
import { Form, Formik } from "formik"
import CloseIcon from '@mui/icons-material/Close'
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Box,
    FormHelperText,
    Stack,
    DialogTitle,
    Alert,
    IconButton,
} from "@mui/material"
import PRReprodPackagingsField from "./PRReprodPackagingsField"
import PEReprodSectionsField from "./PEReprodSectionsField"
import { formatPEReprodWeightsInitialValues } from "../../utils/packagingExecutionUtils"

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            minWidth: 700,
            padding: '32px 24px',
            gap: '40px'
        },
    },
    dialogTitle: {
        color: '#262626',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 1.33,
        p: 0
    },
    dialogContent: {
        p: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: "32px",
        marginTop: "32px"
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "32px"
    },
}

type Props = {
    onClose: () => void
    open: boolean
    onSubmit: (values: Record<string, any>) => void
    packagingExecution: Record<string, any> | null
    proposedWeightsBySections: Record<string, any>
}
const PEReprodDialogForm = ({
    onClose,
    open,
    onSubmit,
    packagingExecution,
    proposedWeightsBySections
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

    if (!packagingExecution) return null

    return (
        <Dialog open={open} onClose={onClose} scroll="body" sx={sx.dialog}>
            <DialogTitle sx={sx.dialogTitle}>
                {packagingExecution?.uniqueCode} - {packagingExecution?.recipeName}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: 'absolute', top: 8, right: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={sx.dialogContent}>
                <Alert severity="warning">
                    La quantité restante est insuffisante pour produire le nombre requis de barquettes <b>operculées</b>. Vous devez relancer une production afin d'atteindre la quantité théorique.
                </Alert>
                <Box ref={descriptionElementRef} tabIndex={-1}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={formatPEReprodWeightsInitialValues(packagingExecution, proposedWeightsBySections, packagingExecution.tempRealNumber)}
                        // validationSchema={schema}
                        onSubmit={_handleSubmit}
                    >
                        {({ errors, values, setFieldValue, setFieldTouched, touched }) => {
                            return (
                                <Form>
                                    <Stack spacing={4}>
                                        <Stack spacing={1}>
                                            <PRReprodPackagingsField
                                                packagings={values.packagings}
                                                expectedPackagingNumber={values.expectedPackagingNumber}
                                                totalRealizableNumber={values.totalRealizableNumber}
                                                setFieldValue={setFieldValue}
                                                totalRealizedNumber={values.totalRealizedNumber}
                                                status={packagingExecution.status}
                                            />
                                            {errors?.packagings && typeof errors.packagings === 'string' && (
                                                <FormHelperText error>{errors.packagings}</FormHelperText>
                                            )}
                                        </Stack>
                                        <Stack spacing={1}>
                                            <PEReprodSectionsField
                                                sections={values.sections}
                                                packagings={values.packagings}
                                                packagingForecastNumber={values.packagingForecastNumber}
                                                touchedSections={touched.sections}
                                                setFieldValue={setFieldValue}
                                                setFieldTouched={setFieldTouched}
                                                errors={errors}
                                            />
                                        </Stack>
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
