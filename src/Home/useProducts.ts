import React from "react"
import { getProducts } from "../utils/api"
import { Category } from "../shared/types"

export const useProducts = () => {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setCategories(data.categories || [])
      } catch (error) {
        setError(true)
      }
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  return { categories, isLoading, error }
}
