import { TableHead, TableBody, TableRow, Stack } from "@mui/material"
import { PETable, PETableHeaderCell_V2 } from "./StyledPackagingExecutionPreviewComponents"
import PEReprodSectionField from "./PEReprodSectionField"
import Typography from "@mui/material/Typography"
import { COLORS } from "../../utils/constants"
import { calculateGlobalPackagingForecastNumber, calculatePackagingForecastNumberBySection, calculatePackagingsForecastNumber } from "../../utils/packagingExecutionUtils"

type Props = {
	sections: Record<string, any>[]
	packagings: Record<string, any>[]
	packagingForecastNumber?: number
	setFieldValue: (field: string, value: any) => void
	setFieldTouched: (field: string) => void
	editable?: boolean
	touchedSections?: any
	errors: Record<string, any>
}
const PEReprodSectionsField = ({
	sections = [],
	packagings = [],
	errors,
	packagingForecastNumber,
	setFieldValue,
	setFieldTouched,
	touchedSections = []
}: Props) => {
	const handleChangeSectionRealWeight = (value: any, index: number) => {
		setFieldValue(`sections[${index}].realWeight`, value)

		const forecastNumber = calculatePackagingForecastNumberBySection(sections[index], value)
		setFieldValue(`sections[${index}].packagingForecastNumber`, forecastNumber)

		const section = { ...sections[index], realWeight: value, forecastWaste: forecastNumber }
		const copiedSections = [...sections]
		copiedSections[index] = section
		const globalPackagingForecastNumber = calculateGlobalPackagingForecastNumber(copiedSections)
		setFieldValue("packagingForecastNumber", globalPackagingForecastNumber)

		if (packagings.length === 1) {
			setFieldValue("packagings[0].forecastNumber", globalPackagingForecastNumber)
			return
		}
		const updatedPackagings = calculatePackagingsForecastNumber(packagings, globalPackagingForecastNumber)
		setFieldValue("packagings", updatedPackagings)
	}

	const formatCellValue = (value1: any = "", value2: any = "", unit = "", style = {}) => {
    if (!value1 && !value2) {
      return "-"
    }
    if (value1 && value2) {
        return (
            <Stack gap={1} direction="row" alignItems="center">
                {value1} / {value2} <span style={style}>{unit}</span>
            </Stack>
        )
    }
    return (
        <Stack gap={1} direction="row" alignItems="center">
            {value1 || value2} <span style={style}>{unit}</span>
        </Stack>
    )
	}


	return (
    <Stack spacing={2} sx={{width:"100%"}}>
      <Stack spacing={1} direction={"row"}>
        <img src="/img/packagingExecutions/distributionBySections.svg" alt="Packaging Icon" />
        <Typography variant="h6" sx={{fontSize:"14px", lineHeight:"22px", color: COLORS.BLACK800}}>
          Répartition par sections
        </Typography>
      </Stack>
			<Typography sx={{fontSize:"16px", lineHeight:"24px", color:"#7C7C7C"}}>
				Saisissez les quantités réelles des sections à barquetter
			</Typography>
      <PETable>
        <TableHead>
          <TableRow>
            <PETableHeaderCell_V2 align="left">
              Élements à barquetter
            </PETableHeaderCell_V2>
            <PETableHeaderCell_V2 align="left">
							Quantité pesée / Théorique
              {/* Quantité produite / estimée */}
            </PETableHeaderCell_V2>
            <PETableHeaderCell_V2 align="left">
							À reproduire en operculé
            </PETableHeaderCell_V2>
            <PETableHeaderCell_V2 align="left">
							À reproduire en réemployable et jetable
            </PETableHeaderCell_V2>
            {/* <PETableHeaderCell_V2 align="left">
              Restes
            </PETableHeaderCell_V2> */}
          </TableRow>
        </TableHead>
        <TableBody>

				{sections.map((currentSection, index) => (
					<PEReprodSectionField
						key={index}
						// editable={editable}
						section={currentSection}
						sectionIndex={index}
						setFieldTouched={setFieldTouched} 
						onChangeSectionRealWeight={handleChangeSectionRealWeight}
						formatCellValue={formatCellValue}
						errors={errors}
					/>
				))}

				{/* <TableRow>
					<PETotalTableCell_V2>
						Total
					</PETotalTableCell_V2>
					<PETotalTableCell_V2>
						{formatCellValue(
							roundNumber(sections.reduce((acc, section) => acc + (section.initialProductionWeight), 0), 1),
							roundNumber(sections.reduce((acc, section) => acc + (section.totalTheoreticalWeight), 0), 1),
							"kg"
						)}
					</PETotalTableCell_V2>
					<PETotalTableCell_V2>
						{formatCellValue(
            renderKiloToGrams(sections.reduce((acc, section) => acc + (section.recipeSectionWeight), 0)),
						null,
            "g"
						)}
					</PETotalTableCell_V2>
					<PETotalTableCell_V2>
						{formatCellValue(
            renderKiloToGrams(sections.reduce((acc, section) => acc + (section.realWeight || 0), 0)),
						null,
            "g"
						)}
					</PETotalTableCell_V2>
					<PETotalTableCell_V2>
						{formatCellValue(
            roundNumber(sections.reduce((acc, section) => acc + (section.forecastWaste || 0), 0), 1),
						null,
            "kg"
						)}
					</PETotalTableCell_V2>
				</TableRow> */}
        </TableBody>
      </PETable>
    </Stack>)
}


export default PEReprodSectionsField
