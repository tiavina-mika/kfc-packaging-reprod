/**
 * Mock database search for recipes by unique code or name
 * @param search 
 * @returns 
 */
export const searchRecipesByUniqueCodeOrName = (packagingExecutions: Record<string, any>[] = [], search: string) => {
  return packagingExecutions.filter((pe) => {
    return pe.uniqueCode.toLowerCase().includes(search.toLowerCase()) || pe.recipeName.toLowerCase().includes(search.toLowerCase())
  })
}

export const roundNumber = (number: number, decimal = 4) => {
	if (isNaN(number)) {
		return ""
	}
	const x = Math.pow(10, decimal)
	return (Math.round(number * x)) / x
}

export const convertKilosIntoGrams = (weightInKilos: number) => {
  return !isNaN(weightInKilos) ? weightInKilos * 1000 : 0
}

export const convertGramsIntoKilos = (weightInGrams: number) => {
  return weightInGrams / 1000
}

export const packagingNature = [
	{ value: "REUSABLE", label: "Réemployable" },
	{ value: "DISPOSABLE", label: "Jetable" },
	{ value: "CAPPED", label: "Operculé" }
]

export const formatPackagingExecutionWeightsInitialValues = (
  packagingExecution: Record<string, any>,
  // from data api
  proposedWeightsBySections: Record<string, any> = {}
) => {
  return {
    ...packagingExecution,
    expectedPackagingNumber: packagingExecution.expectedPackagingNumber || 0,
    packagings: packagingExecution.packagings.map((packaging: Record<string, any>) => ({
      ...packaging,
      forecastNumber: packaging.forecastNumber || 0
    })),
    sections: packagingExecution.sections.map((section: Record<string, any>) => ({
      ...section,
      realWeight: 0,
      proposedWeight: proposedWeightsBySections[section.section.objectId] || 0,
      forecastWaste: section.forecastWaste || 0,
      packagingForecastNumber: Infinity // won't be saved in db for display only and to ease waste calculations
    })),
    packagingForecastNumber: 0 // won't be saved in db for display only and to ease waste calculations
  }
}