import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    styled,
} from "@mui/material"
import { COLORS } from "../../utils/constants"

const StyledValue = styled("span")({
    fontWeight: 600
})

const sx = {
    dialog: {
        '& .MuiDialog-paper': {
            minWidth: 500,
            padding: '24px 24px 12px 24px',
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
        gap: "16px",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.375,
        color: COLORS.DRAFT_GREY,
    },
    dialogActions: {
        marginTop: "16px",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}

// check if any section has realWeight = 0
const hasSectionNoRealWeight = (sections: Record<string, any> = []) => {
    return sections.some((section: Record<string, any>) => section.realWeight === 0)
}

const formatSections = (sections: Record<string, any>[] = []) => {
    if (hasSectionNoRealWeight(sections)) {
        const sectionWithNoRealWeight = sections.find((section: Record<string, any>) => section.realWeight === 0)
        return sectionWithNoRealWeight ? `de ${sectionWithNoRealWeight.sectionName}` : ""
    }

    return sections.map((section: Record<string, any>, index: number) => {
        const separator = index === sections.length - 1 ? '' : (sections.length > 2 ? ', ' : ' et ')
        return `${section.realWeight} kg de ${section.sectionName}${separator}`
    }).join("")
}

type Props = {
    onClose: () => void
    open: boolean
    onConfirm: () => void
    sections: Record<string, any>[]
}
const PEReprodConfirmationDialog = ({
    onClose,
    open,
    onConfirm,
    sections = [],
}: Props) => {
    return (
        <Dialog open={open} onClose={onClose} scroll="body" sx={sx.dialog}>
            <DialogContent sx={sx.dialogContent}>
                <Typography>
                    {hasSectionNoRealWeight(sections) ? "Vous avez choisi de ne pas reproduire ": "Vous avez choisi de reproduire "}
                    <StyledValue>{formatSections(sections)}</StyledValue>.
                </Typography>
                <Typography>Confirmez-vous cette action ?</Typography>
            </DialogContent>
            <DialogActions  sx={sx.dialogActions}>
                <Button onClick={onClose} color="primary">
                    Retour
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PEReprodConfirmationDialog
