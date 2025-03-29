import React, { useState } from 'react'

import styles from './AppStoreMain.styles.css'

// type Props = {
//   name: string
// }

const AppStoreMain = () => {
  const [loading, setLoading] = useState(false)
  const [luckyNumber, setLuckyNumber] = useState<string | null>(null)

  const generateLuckyNumber = () => {
    // Genera 2 números de 2 dígitos y 1 número de 4 dígitos
    const firstPart = Math.floor(Math.random() * 90 + 10) // 10-99
    const secondPart = Math.floor(Math.random() * 90 + 10) // 10-99
    const thirdPart = Math.floor(Math.random() * 9000 + 1000) // 1000-9999

    return `${firstPart}-${secondPart}-${thirdPart}`
  }

  const handleClick = () => {
    setLoading(true)
    setLuckyNumber(null) // Resetea el número anterior

    setTimeout(() => {
      // Genera el número de la suerte
      const newLuckyNumber = generateLuckyNumber()

      setLuckyNumber(newLuckyNumber)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={styles.button}
      >
        Conocer mi fortuna
      </button>

      {loading ? (
        <span className={styles.spinner}>
          <span className={styles.spinner_circle} />
        </span>
      ) : null}
      <h5>
        {luckyNumber
          ? `Tu número de la suerte: ${luckyNumber}`
          : 'Haz clic en "Conocer mi fortuna" para generar un número de la suerte.'}
      </h5>
      <h3>deberá mostrar la frase obtenida y almacenada en el estado.</h3>
    </div>
  )
}

export default AppStoreMain
