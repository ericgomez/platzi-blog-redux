import React from 'react'

const App = () => {
  const ponerFilas = () => [
    <tr>
      <td>Eric</td>
      <td>eric.gomez@prodeco.mx</td>
      <td>ericgomez.com</td>
    </tr>,
    <tr>
    <td>Prodeco</td>
    <td>prodeco@prodeco.mx</td>
    <td>prodeco.com</td>
  </tr>,
  ]

  return (
    <div className='margen'>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          { ponerFilas() }
        </tbody>
      </table>
    </div>
  )
}

export default App
