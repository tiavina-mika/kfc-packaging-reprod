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

export const packagingNature = [
	{ value: "REUSABLE", label: "Réemployable" },
	{ value: "DISPOSABLE", label: "Jetable" },
	{ value: "CAPPED", label: "Operculé" }
]

export const formatPackagingExecutionWeightsInitialValues = (
  packagingExecution: Record<string, any>,
  proposedWeightsBySections: Record<string, any> = {}
) => {
  return {
    ...packagingExecution,
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