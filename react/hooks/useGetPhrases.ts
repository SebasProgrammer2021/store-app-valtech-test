import { useState, useCallback } from 'react'

import { getRandomFortune, ICookieFortuneResponse } from '../api/cookieFortune'

/**
 * Hook personalizado para obtener frases aleatorias de la fortuna
 */
export const useGetPhrases = () => {
  const [fortune, setFortune] = useState<ICookieFortuneResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Obtiene una frase aleatoria de la fortuna
   */
  const fetchFortune = useCallback(async () => {
    setIsLoading(true)

    try {
      const result = await getRandomFortune()

      setFortune(result)

      return result
    } catch (error) {
      // El manejo de errores se hace en el componente que usa el hook
      console.error('Error al obtener la frase de la fortuna:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    fortune,
    isLoading,
    fetchFortune,
  }
}

export default useGetPhrases
