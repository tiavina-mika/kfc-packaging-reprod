import { TableHead, TableBody, TableRow, Stack } from "@mui/material"
import { PETable, PETableHeaderCell_V2 } from "./StyledPackagingExecutionPreviewComponents"
import PEReprodSectionField from "./PEReprodSectionField"
import { calculateGlobalPackagingForecastNumber, calculatePackagingForecastNumberBySection, calculatePackagingsForecastNumber } from "../../utils/packagingExecutionUtils"
import PEReprodTableContainer from "./PEReprodTableContainer"

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
	setFieldValue,
	setFieldTouched,
}: Props) => {
	const handleChangeSectionRealWeight = (value: any, index: number) => {
		// 1. Update the realWeight of the section
		setFieldValue(`sections[${index}].realWeight`, value)

		// 2. Calculate the packagingForecastNumber of the section
		const forecastNumber = calculatePackagingForecastNumberBySection(sections[index], value)
		setFieldValue(`sections[${index}].packagingForecastNumber`, forecastNumber)

		// 3. Calculate the global packaging
		const section = { ...sections[index], realWeight: value, packagingForecastNumber: forecastNumber }
		const copiedSections = [...sections]
		copiedSections[index] = section
		const globalPackagingForecastNumber = calculateGlobalPackagingForecastNumber(copiedSections)
		setFieldValue("packagingForecastNumber", globalPackagingForecastNumber)

		// 4. Calculate the packagings forecast number
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
		<PEReprodTableContainer
			icon="distributionBySections.svg"
			title="Répartition par sections"
			description="Saisissez les quantités à mettre en reprod pour les barquettes réemployables et jetables."
		>
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
          </TableRow>
        </TableHead>
        <TableBody>
					{sections.map((currentSection, index) => (
						<PEReprodSectionField
							key={index}
							section={currentSection}
							sectionIndex={index}
							setFieldTouched={setFieldTouched} 
							onChangeSectionRealWeight={handleChangeSectionRealWeight}
							formatCellValue={formatCellValue}
							errors={errors}
							isLastItem={index === sections.length - 1}
						/>
					))}
        </TableBody>
      </PETable>
    </PEReprodTableContainer>
	)
}


export default PEReprodSectionsField
