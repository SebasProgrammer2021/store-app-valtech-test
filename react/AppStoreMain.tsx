import React, { useState } from 'react'

import useGetPhrases from './hooks/useGetPhrases'
import styles from './AppStoreMain.styles.css'

const AppStoreMain = () => {
  const [luckyNumber, setLuckyNumber] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)

  // Usamos nuestro hook personalizado
  const { fortune, isLoading, fetchFortune } = useGetPhrases()

  const generateLuckyNumber = () => {
    // Genera 2 números de 2 dígitos y 1 número de 4 dígitos
    const firstPart = Math.floor(Math.random() * 90 + 10) // 10-99
    const secondPart = Math.floor(Math.random() * 90 + 10) // 10-99
    const thirdPart = Math.floor(Math.random() * 9000 + 1000) // 1000-9999

    return `${firstPart}-${secondPart}-${thirdPart}`
  }

  const handleClick = async () => {
    // Reseteamos estados
    setLuckyNumber(null)
    setHasError(false)

    try {
      // Obtenemos la frase de la fortuna
      await fetchFortune()

      // Generamos el número de la suerte
      const newLuckyNumber = generateLuckyNumber()

      setLuckyNumber(newLuckyNumber)
    } catch (error) {
      console.error('Error al obtener la frase:', error)
      setHasError(true)
    }
  }

  return (
    <div className={styles['fortune-container']}>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? 'Consultando...' : 'Conocer mi fortuna'}
      </button>

      {/* Mostramos la frase de la fortuna solo si existe */}
      {fortune && (
        <h3 className={styles['fortune-text']}>{fortune.CookieFortune}</h3>
      )}

      {/* Mostramos el número de la suerte solo si existe */}
      {luckyNumber && (
        <h5 className={styles['lucky-number']}>
          Tu número de la suerte es: <strong>{luckyNumber}</strong>
        </h5>
      )}

      {/* Mostramos un mensaje de error si ocurre algún problema */}
      {hasError && (
        <p className={styles['error-message']}>
          ¡Ups! Ocurrió un error al consultar tu fortuna. Inténtalo de nuevo.
        </p>
      )}

      {isLoading && (
        <div className={styles.spinner}>
          <span className={styles.spinner_circle} />
        </div>
      )}
    </div>
  )
}

export default AppStoreMain
