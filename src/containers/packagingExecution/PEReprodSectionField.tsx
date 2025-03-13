import { ChangeEvent, KeyboardEvent, WheelEvent } from "react"
import { TableRow, Stack, FormHelperText, Typography } from "@mui/material"
import { PETableCell_V2, PETextField } from "./StyledPackagingExecutionPreviewComponents"
import { convertKilosIntoGrams, roundNumber } from "../../utils/utils"
import { COLORS } from "../../utils/constants"
import PECellValue from "./PECellValue"

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
    },
  },
}

type Props = {
	section: Record<string, any>
	sectionIndex: number
	setFieldTouched: (field: string) => void
	onChangeSectionRealWeight: (value: any, sectionIndex: number) => void
	errors: Record<string, any>
	isLastItem?: boolean
}
const PEReprodSectionField = ({
	section,
	sectionIndex,
	setFieldTouched,
	onChangeSectionRealWeight,
	errors,
	isLastItem = false
}: Props) => {
	const _renderKiloToGrams = (value: number) => {
		return roundNumber(convertKilosIntoGrams(value), 0)
	}

	const handleChangeRealWeight = (e: ChangeEvent<HTMLInputElement>) => {
			if (!setFieldTouched) return
			setFieldTouched(`sections[${sectionIndex}].realWeight`);
			onChangeSectionRealWeight(e.target.value, sectionIndex)
	}

	const handleOnWheel = (e: WheelEvent<HTMLInputElement>) => {
		(e.target as HTMLInputElement).blur()
	}

	const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleOnWheel(e as any)
		}
	}

	return (
		<TableRow>
			<PETableCell_V2 sx={{ ...styles.borders.left, ...(isLastItem ? styles.borders.withBorderBottom : {}) }}>
				{section.sectionName || "-"}
			</PETableCell_V2>
			<PETableCell_V2 sx={isLastItem ? styles.borders.withBorderBottom : styles.borders.noBorder }>
				<PECellValue
					value1={roundNumber((section.counterWeighing?.weight || 0), 1)}
					value2={roundNumber((section.totalTheoreticalWeight || 0), 1)}
					unit="kg"
					style={{ color: COLORS.DRAFT_GREY }}
				/>
			</PETableCell_V2>
			<PETableCell_V2 sx={isLastItem ? styles.borders.withBorderBottom : styles.borders.noBorder }>
				<Stack direction="row" alignItems="center" gap={1}>
					<PECellValue
						value1={_renderKiloToGrams(section.cappedPackagingWeight) || 0}
						unit="g"
						style={{ color: COLORS.DRAFT_GREY }}
					/>
				</Stack>
			</PETableCell_V2>
			<PETableCell_V2 sx={{ ...styles.borders.right, ...(isLastItem ? styles.borders.withBorderBottom : {}) }}>
				<Stack direction="row" alignItems="center" gap={1}>
					<PETextField
						name={`sections[${+sectionIndex}].realWeight`}
						value={section.realWeight}
						variant="outlined"
						onChange={handleChangeRealWeight}
						type="number"
						onWheel={handleOnWheel}
						onKeyDown={handleOnKeyDown}
					/>
					<Typography sx={{ color:COLORS.DRAFT_GREY }}> kg</Typography>
				</Stack>
			{(errors as any)?.sections?.[sectionIndex]?.realWeight && (
				<FormHelperText error>
					{(errors as any).sections[sectionIndex].realWeight}
				</FormHelperText>
			)}
			</PETableCell_V2>
		</TableRow>
	)
}

export default PEReprodSectionField