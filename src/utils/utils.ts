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