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
  const packagings: Record<string, any>[] = []
  let total = 0
  let eachRealizedNumber = tempRealNumber

  getOrderedPackagings(packagingExecution.packagings).forEach((packaging) =>{
    const min = Math.min(eachRealizedNumber, packaging.theoreticalNumber)

    packagings.push({
      ...packaging,
      realizedNumber: min,
      forecastNumber: packaging.forecastNumber || 0
    })
    eachRealizedNumber -= min
    total += min
    
  })

  // let eachRealizedNumber = tempRealNumber
  // let currentPackagingForecastNumber = tempRealNumber
  // getOrderedPackagings(packagingExecution.packagings).forEach((packaging, index) =>{
  //   const isLast = index === packagings.length - 1
  //   const packagingTheoreticalNumber = packaging.theoreticalNumber || 0
  //   const usedPackagingNumber = isLast ? currentPackagingForecastNumber : Math.min(packagingTheoreticalNumber, currentPackagingForecastNumber)
  //   // setFieldValue(`packagings[${index}].forecastNumber`, usedPackagingNumber)
  //   currentPackagingForecastNumber -= usedPackagingNumber
  //   currentPackagingForecastNumber = Math.max(0, currentPackagingForecastNumber)

  //   packagings.push({
  //     ...packaging,
  //     realizedNumber: currentPackagingForecastNumber,
  //     forecastNumber: usedPackagingNumber || 0
  //   })
    
  //   total += currentPackagingForecastNumber
  // })

  return {
    ...packagingExecution,
    expectedPackagingNumber: packagingExecution.expectedPackagingNumber || 0,
    packagings,
    sections: packagingExecution.sections.map((section: Record<string, any>) => {
      console.log('section: ', section);
      return {
        ...section,
        realWeight: 0,
        proposedWeight: proposedWeightsBySections[section.section.objectId] || 0,
        forecastWaste: section.forecastWaste || 0,
        packagingForecastNumber: Infinity // won't be saved in db for display only and to ease waste calculations
      }
    }),
    totalRealizedNumber: total,
    packagingForecastNumber: 0 // won't be saved in db for display only and to ease waste calculations
  }
}