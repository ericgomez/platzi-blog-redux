import React from 'react'

const App = () => {
  return (
    <div className='margen'>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Eric</td>
            <td>eric.gomez@prodeco.mx</td>
            <td>ericgomez.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
