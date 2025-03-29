import React, { useState } from 'react'

import useGetPhrases from './hooks/useGetPhrases'
import styles from './AppStoreMain.styles.css'

// Componente principal
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
    <div>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={styles.button}
      >
        Conocer mi fortuna
      </button>
      {isLoading ? (
        <span className={styles.spinner}>
          <span className={styles.spinner_circle} />
        </span>
      ) : null}
      {/* Mostramos la frase de la fortuna solo si existe */}
      {fortune && <h3>{fortune.CookieFortune}</h3>}
      {/* Mostramos el número de la suerte solo si existe */}
      {luckyNumber && (
        <h5>
          Tu número de la suerte es: <strong>{luckyNumber}</strong>
        </h5>
      )}
      {/* Mostramos un mensaje de error si ocurre algún problema */}
      {hasError && (
        <p style={{ color: 'red' }}>
          ¡Ups! Ocurrió un error al consultar tu fortuna. Inténtalo de nuevo.
        </p>
      )}
    </div>
  )
}

export default AppStoreMain
