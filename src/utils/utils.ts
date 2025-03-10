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

export const getOrderedPackagings = (packagings: Record<string, any>[] = []) => {
  const order = ["CAPPED", "REUSABLE", "DISPOSABLE"];
  return packagings.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
}

export const formatPackagingExecutionWeightsInitialValues = (
  packagingExecution: Record<string, any>,
  // from data api
  proposedWeightsBySections: Record<string, any> = {},
  tempRealNumber = 0
) => {
  const orderPackagins = getOrderedPackagings(packagingExecution.packagings) || []
  const packagings: Record<string, any>[] = []
  let total = 0
  let eachRealizedNumber = tempRealNumber

  for (const packaging of orderPackagins) {
    const min = Math.min(eachRealizedNumber, packaging.theoreticalNumber)

    packagings.push({
      ...packaging,
      realizedNumber: min,
      forecastNumber: packaging.forecastNumber || 0
    })
    eachRealizedNumber -= min
    total += min
  }

  const cappedPackaging = packagings.find((packaging) => packaging.type === "CAPPED")
  const cappedPackagingWeight = cappedPackaging ? (cappedPackaging.realizedNumber - cappedPackaging.theoreticalNumber) : 0

  const sections: Record<string, any>[] = []

  for (const section of packagingExecution.sections) {
    const values = {
      ...section,
      realWeight: 0,
      proposedWeight: proposedWeightsBySections[section.section.objectId] || 0,
      forecastWaste: section.forecastWaste || 0,
      cappedPackagingWeight: cappedPackagingWeight,
      packagingForecastNumber: Infinity // won't be saved in db for display only and to ease waste calculations
    }


    sections.push(values)
  }

  return {
    ...packagingExecution,
    expectedPackagingNumber: packagingExecution.expectedPackagingNumber || 0,
    packagings,
    sections,
    totalRealizedNumber: total,
    packagingForecastNumber: 0 // won't be saved in db for display only and to ease waste calculations
  }
}