import React from "react"
import { TableBody, TableRow, TableHead } from "@mui/material"
import { PETable, PETableCell_V2, PETableHeaderCell_V2 } from "./StyledPackagingExecutionPreviewComponents"
import { packagingNature } from "../../utils/utils"
import { getOrderedPackagings } from "../../utils/packagingExecutionUtils"
import PEReprodTableContainer from "./PEReprodTableContainer"

const styles = {
  borders: {
    left: {
      borderLeft: "1px solid #E6E6E6",
      borderBottom: "none",
    },
    right: { 
      borderRight: "1px solid #E6E6E6",
      borderBottom: "none",
    },
    bottomLeft: {
      borderLeft: "1px solid #E6E6E6",
      // borderBottom: "1px solid #E6E6E6",
      borderBottom: "none",
      borderRadius: "0 0 0 6px",
    },
    bottomRight: {
      borderRight: "1px solid #E6E6E6",
      // borderBottom: "1px solid #E6E6E6",
      borderBottom: "none",
      borderRadius: "0 0 6px 0",
      fontWeight: "500",
    },
    noBorder: {
      border: "none"
    },
    withBorderBottom: {
      borderBottom: "1px solid #E6E6E6",
    }
  },
}

type Props = {
  packagings?: Record<string, any>[]
  expectedPackagingNumber?: number
  totalRealizableNumber?: number
  setFieldValue?: (field: string, value: any) => void
  totalRealizedNumber?: number
  status: string
}
const PRReprodPackagingsField = ({
  status,
  packagings = [],
  expectedPackagingNumber = 0,
  totalRealizableNumber = 0,
  totalRealizedNumber = 0
}: Props) => {
  const isOneLine = status !== "IN_PROGRESS"

	return (
    <PEReprodTableContainer
      icon="packagingNumber.svg"
      title="Nombre de barquettes"
    >
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
            <PETableCell_V2 sx={{ ...styles.borders.left, ...(isOneLine ? styles.borders.withBorderBottom : {}) }}>
              Prévisionnelle/ Théorique
            </PETableCell_V2>
              {getOrderedPackagings(packagings).map((currentPackaging: Record<string, any>, index: number) => (
                <React.Fragment key={index}>
                  <PETableCell_V2 sx={{ ...styles.borders.noBorder, ...(isOneLine ? styles.borders.withBorderBottom : {}) }}>
                    {currentPackaging.forecastNumber} / {currentPackaging.theoreticalNumber || "-"}
                  </PETableCell_V2>
                </React.Fragment>
              ))}
            <PETableCell_V2 sx={{ ...styles.borders.right, ...(isOneLine ? styles.borders.withBorderBottom : {}) }}>
              {expectedPackagingNumber || "-"}
            </PETableCell_V2>
          </TableRow>
          {/* display only for PE in progress */}
          {status === "IN_PROGRESS" && (
            <>
              <TableRow>
                <PETableCell_V2 sx={styles.borders.bottomLeft}>
                  Réalisées
                </PETableCell_V2>
                  {packagings.map((currentPackaging: Record<string, any>, index: number) => (
                    <React.Fragment key={index}>
                      <PETableCell_V2 sx={styles.borders.noBorder}>
                        {currentPackaging.realizedNumber || "-"}
                      </PETableCell_V2>
                    </React.Fragment>
                  ))}
                <PETableCell_V2
                  sx={styles.borders.bottomRight}
                >
                  {totalRealizedNumber || "-"}
                </PETableCell_V2>
              </TableRow>
              <TableRow>
                <PETableCell_V2 sx={{ ...styles.borders.left, ...styles.borders.withBorderBottom }}>
                  Barquettes 
                  encore réalisables
                </PETableCell_V2>
                  {getOrderedPackagings(packagings).map((currentPackaging: Record<string, any>, index: number) => (
                    <React.Fragment key={index}>
                      <PETableCell_V2 sx={{ ...styles.borders.noBorder, ...styles.borders.withBorderBottom }}>
                        {currentPackaging.realizableNumber || "-"}
                      </PETableCell_V2>
                    </React.Fragment>
                  ))}
                <PETableCell_V2
                  sx={{ ...styles.borders.right, ...styles.borders.withBorderBottom }}
                >
                  {totalRealizableNumber || "-"}
                </PETableCell_V2>
              </TableRow>
            </>
          )}
        </TableBody>
      </PETable>
    </PEReprodTableContainer>
	)
}

export default PRReprodPackagingsField
