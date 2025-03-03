import React from "react"
import { TableBody, TableRow, TableHead, Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { PETable, PETableCell_V2, PETableHeaderCell_V2 } from "./StyledPackagingExecutionPreviewComponents"
import { packagingNature } from "../../utils/utils"
import { COLORS } from "../../utils/constants"

const styles = {
  borders: {
    left: { borderLeft: "1px solid #E6E6E6" },
    right: { borderRight: "1px solid #E6E6E6" },
    bottomLeft: {
      borderLeft: "1px solid #E6E6E6",
      borderBottom: "1px solid #E6E6E6",
      borderRadius: "0 0 0 6px",
    },
    bottomRight: {
      borderRight: "1px solid #E6E6E6",
      borderBottom: "1px solid #E6E6E6",
      borderRadius: "0 0 6px 0",
      fontWeight: "500",
    },
  }
}

type Props = {
  packagings?: Record<string, any>[]
  expectedPackagingNumber?: number
  packagingForecastNumber?: number
  setFieldValue?: (field: string, value: any) => void
}
const PRReprodPackagingsField = ({ packagings = [], expectedPackagingNumber = 0, packagingForecastNumber = 0, setFieldValue }: Props) => {
	return (
    <Stack spacing={2} sx={{width:"100%"}}>
      <Stack spacing={1} direction={"row"}>
        <img src="/img/packagingExecutions/packagingNumber.svg" alt="Packaging Icon" />
        <Typography variant="h6" sx={{fontSize: "14px", lineHeight: "22px", color: COLORS.BLACK800}}>
          Nombre de barquettes
        </Typography>
      </Stack>
      <PETable>
        <TableHead>
          <TableRow>
            <PETableHeaderCell_V2>
              Estimation
            </PETableHeaderCell_V2>
              {packagings.map((currentPackaging: Record<string, any>, index: number) => (
                <React.Fragment key={index}>
                  <PETableHeaderCell_V2>
                    {packagingNature.find((nature) => nature.value === currentPackaging.type)?.label}
                  </PETableHeaderCell_V2>
                </React.Fragment>
              ))}
            <PETableHeaderCell_V2>
              Total
            </PETableHeaderCell_V2>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <PETableCell_V2 sx={ styles.borders.left }>
              Théorique
            </PETableCell_V2>
              {packagings.map((currentPackaging: Record<string, any>, index: number) => (
                <React.Fragment key={index}>
                  <PETableCell_V2>
                    {currentPackaging.theoreticalNumber || "-"}
                  </PETableCell_V2>
                </React.Fragment>
              ))}
            <PETableCell_V2 sx={styles.borders.right}>
              {expectedPackagingNumber || "-"}
            </PETableCell_V2>
          </TableRow>
          <TableRow>
            <PETableCell_V2 sx={styles.borders.bottomLeft}>
              Prévisionnelle
            </PETableCell_V2>
              {packagings.map((currentPackaging: Record<string, any>, index: number) => (
                <React.Fragment key={index}>
                  <PETableCell_V2>
                    {currentPackaging.forecastNumber || "-"}
                  </PETableCell_V2>
                </React.Fragment>
              ))}
            <PETableCell_V2
              sx={{ ...styles.borders.bottomRight, color: COLORS.PRIMARY_COLOR, }}
            >
              {packagingForecastNumber || "-"}
            </PETableCell_V2>
          </TableRow>
        </TableBody>
      </PETable>
    </Stack>
	)
}

export default PRReprodPackagingsField
