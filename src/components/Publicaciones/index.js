import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Error404 from '../General/Error404';

import * as usuariosActions from './../../actions/usuariosActions';
import * as publicacionesActions from './../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {

	async componentDidMount() {
		const {
			usuariosTraerTodos,
			match: { params: { key } },
			publicacionesTraerPorUsuario
		} = this.props;

		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}

		if (this.props.usuariosReducer.error) {
			return;
		}

		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			await publicacionesTraerPorUsuario(key);
		}
	}

	ponerNombre = () => {
		const {
			match: { params: { key } },
			usuariosReducer
		} = this.props;

		if (usuariosReducer.error) {
			return <Error404 mensaje={ usuariosReducer.error } />;
		}
		if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
			return <Spinner />
		}
    // Nombre del usuario
		const nombre = usuariosReducer.usuarios[key].name;

		return (
			<h1>
				Publicaciones de { nombre }
			</h1>
		);
	};

	ponerPublicaciones = () => {
		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } },
		} = this.props;

		if (!usuarios.length) return;
		if (usuariosReducer.error) return;
		
		if (publicacionesReducer.cargando) {
			return <Spinner />;
		};
		if (publicacionesReducer.error) {
			return <Error404 mensaje={publicacionesReducer.error} />;
		};
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];
		return publicaciones[publicaciones_key].map((publicacion) => (
			<div 
			className="pub_titulo"
			key={publicacion.id}
			onClick={ ()=>alert(publicacion.id) }>
				<h2>
					{ publicacion.title}
				</h2>
				<h3>
					{ publicacion.body}
				</h3>
			</div>
		));

	}

	render() {
		console.log(this.props);
		return (
			<div>
				{ this.ponerNombre() }
				{ this.ponerPublicaciones() }
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return {
		usuariosReducer,
		publicacionesReducer,
	};
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones); 