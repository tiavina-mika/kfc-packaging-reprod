import { convertGramsIntoKilos } from "./utils"

export const calculatePackagingForecastNumberBySection = (section: Record<string, any>, realWeight = 1): number => {
  const realWeightKilos = convertGramsIntoKilos(realWeight)
  // const realWeightKilos = convertGramsIntoKilos(realWeight)
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