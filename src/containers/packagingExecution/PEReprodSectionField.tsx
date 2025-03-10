import { ChangeEvent, KeyboardEvent, WheelEvent } from "react"
import { TableRow, Stack, FormHelperText } from "@mui/material"
import { PETableCell_V2, PETextField } from "./StyledPackagingExecutionPreviewComponents"
import { convertKilosIntoGrams, roundNumber } from "../../utils/utils"
import { COLORS } from "../../utils/constants"

const styles = {
	borders: {
		left: { borderLeft: "1px solid #E6E6E6" },
		right: { borderRight: "1px solid #E6E6E6", color: "unset" }
  },
}

type Props = {
	section: Record<string, any>
	index: number
	setFieldTouched: (field: string) => void
	onChangeSectionRealWeight: (value: any) => void
	formatCellValue: (value1: any, value2: any, unit: string, style?: Record<string, any>) => any
	onChangeFocusedFieldIndex: (index: number | null) => void,
	errors: Record<string, any>
}
const PEReprodSectionField = ({
	section,
	index,
	setFieldTouched,
	onChangeSectionRealWeight,
	formatCellValue,
	onChangeFocusedFieldIndex,
	errors
}: Props) => {
	const _renderKiloToGrams = (value: number) => {
		return roundNumber(convertKilosIntoGrams(value), 0)
	}

	const handleChangeRealWeight = (e: ChangeEvent<HTMLInputElement>) => {
			if (!setFieldTouched) return
			setFieldTouched(`sections[${index}].realWeight`);
			onChangeSectionRealWeight(e.target.value)
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
			<PETableCell_V2 sx={styles.borders.left}>
				{section.sectionName || "-"}
			</PETableCell_V2>
			<PETableCell_V2>
				{formatCellValue(
					roundNumber((section.counterWeighing.weight || 0), 1),
					roundNumber((section.totalTheoreticalWeight || 0), 1),
					"kg",
					{color: COLORS.DRAFT_GREY}
				)}
			</PETableCell_V2>
			<PETableCell_V2>
				<Stack direction="row" alignItems="center" gap={1}>
					{formatCellValue(
						_renderKiloToGrams(section.cappedPackagingWeight) || 0,
						// _renderKiloToGrams(section.recipeSectionWeight) || 0,
						null,
						"g",
						{color: COLORS.DRAFT_GREY}
					)}
				</Stack>
			</PETableCell_V2>
			<PETableCell_V2>
					<Stack direction="row" alignItems="center" gap={1}>
						<PETextField
							name={`sections[${index}].realWeight`}
							value={section.realWeight === "" ? "" : _renderKiloToGrams(section.realWeight)}
							variant="outlined"
							onChange={handleChangeRealWeight}
							type="number"
							onWheel={handleOnWheel}
							onKeyDown={handleOnKeyDown}
              onFocus={() => onChangeFocusedFieldIndex(index)}
              onBlur={() => onChangeFocusedFieldIndex(null)}
						/>
						<span style={{color:COLORS.DRAFT_GREY}}> g</span>
					</Stack>
			{/* <FormikErrorMessage name={`sections[${index}].realWeight`} /> */}
			{(errors as any)?.sections?.[index]?.realWeight && (
				<FormHelperText error>
					{(errors as any).sections[index].realWeight}
				</FormHelperText>
			)}
			</PETableCell_V2>
			{/* <PETableCell_V2 
				sx={{ ...styles.borders.right, color: COLORS.BLACK800 }}
			>
				{formatCellValue(
					roundNumber(section.forecastWaste || 0, 1),
					null,
					"kg",
				)}
			</PETableCell_V2> */}
		</TableRow>
	)
}

export default PEReprodSectionField