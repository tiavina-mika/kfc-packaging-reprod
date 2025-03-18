import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material"
import { COLORS } from "../../utils/constants";

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

const formatSections = (sections: Record<string, any> = []) => {
    return sections.map((section: Record<string, any>, index: number) => {
        const isLast = index === sections.length - 1;
        return `${section.sectionName} (${section.realWeight} kg)${isLast ? '' : ' et '}`;
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
                <Typography>Avez-vous choisi de <b>{formatSections(sections)}</b>.</Typography>
                <Typography>Confirmez-vous cette action?</Typography>
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
