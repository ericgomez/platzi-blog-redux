import React, { Component } from 'react'
import { connect } from 'react-redux';

import Spinner from './../General/Spinner';
import Error404 from './../General/Error404';
import { Redirect } from 'react-router-dom';

import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {

  componentDidMount() {
		const {
			match: { params: { user_id, tar_id } },
			tareas,
			cambioUsuarioId,
			cambioTitulo,
      limpiarForma
		} = this.props;

		if (user_id && tar_id) {
			const tarea = tareas[user_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title);
		}

    else {
      limpiarForma();
    }
	}
  
  cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

  guardar = () => {
		const { 
      match: { params: { user_id, tar_id } },
      tareas,
      usuario_id, 
      titulo, 
      agregar,
      editar, 
    } = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		};
		
    if (user_id && tar_id) {
			const tarea = tareas[user_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			};
      // En caso de que existan las tareas Editamos
			editar(tarea_editada);
		}
		else {
      // En caso de no existan las tareas Modificamos
			agregar(nueva_tarea);
		}
	};

  deshabilitar = () => {
		const { usuario_id, titulo, cargando } = this.props;

    if (cargando) {
      return true;
    }

		if (!usuario_id || !titulo) {
			return true;
    }

		return false;
	};

  mostrarAccion = () => {
    const {error, cargando} = this.props;
    
    if (cargando) {
      return <Spinner />;
    }

    if (error) {
      return <Error404 mensaje={error} />;
    }
  };

  render () {
    return (
      <div>
        {
          (this.props.regresar) ? <Redirect to='/tareas' /> : ''
        }
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input 
          type='number'
          defaultValue={ this.props.usuario_id } 
          onChange={ this.cambioUsuarioId }/>
        <br />
        <br />
        Título:
        <input
          defaultValue={ this.props.titulo } 
          onChange={ this.cambioTitulo }/>
        <br />
        <br />
        <button 
          onClick={ this.guardar }
          disabled={ this.deshabilitar() }>
          Guardar
        </button>

        { this.mostrarAccion() }

      </div>
    )
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar)
