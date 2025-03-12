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
