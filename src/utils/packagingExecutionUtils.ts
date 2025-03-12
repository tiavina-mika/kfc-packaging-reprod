import { convertGramsIntoKilos, convertKilosIntoGrams } from "./utils"

export const getOrderedPackagings = (packagings: Record<string, any>[] = []) => {
  const order = ["CAPPED", "REUSABLE", "DISPOSABLE"];
  return packagings.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
}

const distributePackagingNumbers = (packagings: Record<string, any>[], initialNumber: number, field: string) => {
  const orderPackagins = getOrderedPackagings(packagings) || []
  const newPackagings: Record<string, any>[] = []
  let totalPackagingNumber = 0
  let eachPackagingNumber = initialNumber

  for (const packaging of orderPackagins) {
    const min = Math.min(eachPackagingNumber, packaging.theoreticalNumber)

    newPackagings.push({
      ...packaging,
      [field]: min,
      forecastNumber: packaging.forecastNumber || 0
    })
    eachPackagingNumber -= min
    totalPackagingNumber += min
  }

  return {
    newPackagings,
    totalPackagingNumber
  }
}
export const formatPackagingExecutionWeightsInitialValues = (
  packagingExecution: Record<string, any>,
  // from data api
  proposedWeightsBySections: Record<string, any> = {},
  tempRealNumber = 0
) => {
  const { newPackagings, totalPackagingNumber: totalRealizedNumber } = distributePackagingNumbers(packagingExecution.packagings, tempRealNumber, "realizedNumber")

  const cappedPackaging = newPackagings.find((packaging) => packaging.type === "CAPPED")
  const cappedPackagingWeight = cappedPackaging ? (cappedPackaging.realizedNumber - cappedPackaging.theoreticalNumber) : 0

  const realizableNumbers = []

  const sections: Record<string, any>[] = []


  for (const section of packagingExecution.sections) {
    sections.push({
      ...section,
      realWeight: 0,
      proposedWeight: proposedWeightsBySections[section.section.objectId] || 0,
      forecastWaste: section.forecastWaste || 0,
      cappedPackagingWeight: cappedPackagingWeight,
      packagingForecastNumber: Infinity // won't be saved in db for display only and to ease waste calculations
    })

    const realizableNumber = convertKilosIntoGrams(section.initialProductionWeight) - section.recipeSectionWeight
    realizableNumbers.push(realizableNumber)
  }

  const minRealizableNumber = Math.min(...realizableNumbers)
  const { newPackagings: updatedNewPackagings, totalPackagingNumber: totalRealizableNumber } = distributePackagingNumbers(newPackagings, minRealizableNumber, "realizableNumber")

  return {
    ...packagingExecution,
    expectedPackagingNumber: packagingExecution.expectedPackagingNumber || 0,
    packagings: updatedNewPackagings,
    sections,
    totalRealizedNumber: totalRealizedNumber,
    totalRealizableNumber,
    packagingForecastNumber: 0 // won't be saved in db for display only and to ease waste calculations
  }
}

export const calculatePackagingForecastNumberBySection = (section: Record<string, any>, realWeight = 1): number => {
  const realWeightKilos = convertGramsIntoKilos(realWeight)
  const sectionProductionWeight = section.initialProductionWeight // already in kilos
  if (!sectionProductionWeight) return 0

  let packagingForecastNumber = Math.floor(sectionProductionWeight / realWeightKilos)
  if (!isFinite(packagingForecastNumber)) { // if realWeight is 0 the division will return Infinity
    packagingForecastNumber = 0
  }

  return packagingForecastNumber
}

export const calculateGlobalPackagingForecastNumber = (sections: Record<string, any>[] = []): number => {
  const sectionsWithPackagingForecastNumber = sections.filter(section => section.packagingForecastNumber && isFinite(section.packagingForecastNumber))
  const packagingForecastNumbers = sectionsWithPackagingForecastNumber.map(section => section.packagingForecastNumber)
  if (packagingForecastNumbers.length <= 0) return 0
  const minimumPackagingForecastNumber = Math.min(...packagingForecastNumbers)

  return minimumPackagingForecastNumber
}

export const calculatePackagingsForecastNumber = (packagings: Record<string, any>[] = [], packagingForecastNumber = 0) => {
  let currentPackagingForecastNumber = packagingForecastNumber
  const newPackagings = []

  for (const index in packagings) {
    const packaging = { ...packagings[index] }
    const isLast = Number(index) === packagings.length - 1
    const packagingTheoreticalNumber = packaging.theoreticalNumber || 0
    const usedPackagingNumber = isLast ? currentPackagingForecastNumber : Math.min(packagingTheoreticalNumber, currentPackagingForecastNumber)
    packaging.forecastNumber = usedPackagingNumber
    currentPackagingForecastNumber -= usedPackagingNumber
    currentPackagingForecastNumber = Math.max(0, currentPackagingForecastNumber)
    newPackagings.push(packaging)
  }

  return newPackagings
}

export const calculatePackagingsRealizablePackagingNumber = (
  sections: Record<string, any>[] = [],
  packagings: Record<string, any>[] = [],
) => {
  const realizableNumbers = []

  for (const section of sections) {
    const realizableNumber = convertKilosIntoGrams(section.initialProductionWeight) - section.recipeSectionWeight
    realizableNumbers.push(realizableNumber)
  }

  const minRealizableNumber = Math.min(...realizableNumbers)

  const { newPackagings, totalPackagingNumber: totalRealizableNumber } = distributePackagingNumbers(packagings, minRealizableNumber, "realizableNumber")
  return distributePackagingNumbers(packagings, minRealizableNumber, "realizableNumber")
}