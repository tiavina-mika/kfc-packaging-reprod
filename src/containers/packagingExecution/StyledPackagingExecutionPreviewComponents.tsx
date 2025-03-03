/* eslint-disable react-refresh/only-export-components */
import { Table, TableCell, styled, TextField } from "@mui/material"
import { COLORS } from "../../utils/constants"

export const PETable = styled(Table)({
  tableLayout: "fixed",
  width: "100%",
  border: "0px solid #E6E6E6",
  borderRadius: "8px 8px 6px 6px", 
  overflow: "hidden",
  borderCollapse: "separate",
})

export const PETableHeaderCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "align" 
})(({ align }) => ({
  fontSize: 20,
  padding: "16px 14px",
  textAlign: align || "center",
  backgroundColor: COLORS.HEADER_BLUE,
  color: COLORS.LABEL_GREY
}))

export const PETableHeaderCell_V2 = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "align" 
})(({ align }: any) => ({
  fontSize: "16px",
  lineHeight: "24px",
  padding: "16px",
  fontWeight: 500,
  textAlign: align || "left",
  backgroundColor: COLORS.HEADER_BLUE,
  color: COLORS.LABEL_GREY
}))

type PETableCellProps = {
  disabled: boolean,
  fontWeight: string | number,
  width: string,
  align: string,
  color: string,
  backgroundColor: string
}
export const PETableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "disabled" && prop !== "fontWeight" && prop !== "width" && prop !== "align" && prop !== "color" && prop !== "backgroundColor"
})<PETableCellProps>(({disabled, fontWeight, width, align, color, backgroundColor }) => ({
  padding: "14px 16px",
  textAlign: align || "center",
  fontSize: "20px",
  fontWeight: fontWeight || "unset",
  width: width || "auto",
  color: color ? color : disabled ? COLORS.PRODUCTION_STEPS_DISABLE_TEXT : "unset",
  backgroundColor: backgroundColor || "unset"
}))

export const PETableCell_V2 = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "disabled" && prop !== "fontWeight" && prop !== "width" && prop !== "align" && prop !== "color" && prop !== "backgroundColor"
})(({disabled, fontWeight, width, align, color, backgroundColor }: any) => ({
  padding: "16px",
  textAlign: align || "left",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: fontWeight || "unset",
  width: width || "auto",
  color: color ? color : disabled ? COLORS.PRODUCTION_STEPS_DISABLE_TEXT : COLORS.BLACK800,
  backgroundColor: backgroundColor || "unset",
}))

export const PETotalTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "align"
})(({ align }) => ({
  padding: "14px 16px",
  fontSize: "20px",
  fontWeight: 700,
  textAlign: align || "center",
  backgroundColor: COLORS.BACKGROUND_GREY
}))

export const PETotalTableCell_V2 = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "align"
})(({ align }: any) => ({
  padding: "16px",
  fontSize: "16px",
  lineHeight:"24px",
  fontWeight: 500,
  textAlign: align || "left",
  backgroundColor: COLORS.BACKGROUND_GREY,
  color: COLORS.BLACK800,
  border: "none"
}))

export const PETableDivider = styled(TableCell)({
  padding: "0px",
  borderColor: "transparent",
  width: "24px"
})

export const PECommentHeaderCell = styled(TableCell)({
  fontSize: 20,
  padding: "16px 14px",
  textAlign: "center",
  backgroundColor: COLORS.BACKGROUND_GREY,
  color: COLORS.LABEL_GREY
})

export const PETextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
      justifyContent: "center",
      borderRadius: "8px",
      "& fieldset": {
          border: "1px solid #E6E6E6"
      },
      "&:hover fieldset": {
          borderColor: "#CCCCCC",
      },
      "&.Mui-focused fieldset": {
          borderColor: "#2196F3",
      },
  },
  "& .MuiInputBase-input": {
      textAlign: "center", // Center text
      fontSize: "16px",
      lineHeight: "24px",
      padding:"8px 16px",
      color: COLORS.BLACK800
  },
})