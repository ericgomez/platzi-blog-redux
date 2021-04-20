import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from './../General/Spinner';
import Error404 from './../General/Error404';

import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {
	componentDidMount() {
		if (!Object.keys(this.props.tareas).length) {
			this.props.traerTodas();
		}
	}

  mostrarContenido = () => {
		const { tareas, cargando, error } = this.props;

    if (cargando) {
      return <Spinner />;
    }

    if (error) {
      return <Error404 mensaje={error} />;
    }

		return Object.keys(tareas).map((user_id) => (
			<div key={ user_id }>
				<h2>Usuario { user_id }</h2>
				<div className='contenedor_tareas'>
					{ this.ponerTareas(user_id) }
				</div>
			</div>
		));
	};

	ponerTareas = (user_id) => {
		const { tareas } = this.props;

		const por_usuario = {
			...tareas[user_id]
		};

		return Object.keys(por_usuario).map((tar_id) => (
			<div key={ tar_id }>
				<input type='checkbox'
					defaultChecked={ por_usuario[tar_id].completed }
				/>
				{ por_usuario[tar_id].title }
				<button className='m_left'>
					<Link to={ `/tareas/guardar/${user_id}/${tar_id}` }>
						Editar
					</Link>
				</button>
				<button className='m_left'>
					Eliminar
				</button>
			</div>
		));
	};

	render() {
		return (
			<div>
        <button>
          <Link to='/tareas/guardar'>
						Agregar
					</Link>
        </button>
				{ this.mostrarContenido() }
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas); 