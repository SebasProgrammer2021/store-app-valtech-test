import React, { useState } from 'react'

import styles from './AppStoreMain.styles.css'

// type Props = {
//   name: string
// }

const AppStoreMain = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)

    setTimeout(() => {
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
        Obtener datos
      </button>

      {loading ? (
        <span className={styles.spinner}>
          <span className={styles.spinner_circle} />
        </span>
      ) : null}
      <h5>
        deberá mostrar un numero de la suerte aleatorio. El formato debe ser XX
        XX XXXX.
      </h5>
      <h3>deberá mostrar la frase obtenida y almacenada en el estado.</h3>
    </div>
  )
}

export default AppStoreMain
