import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Error404 from '../General/Error404';

const Comentarios = props => {

  if (props.cargando) {
    return <Spinner />
  }

  if (props.error) {
    return <Error404 mensaje={ props.error } />
  }
  
  const ponerComentarios = () => (
		props.comentarios.map((comentario) => (
			<li key={ comentario.id }>
				<b><u>{ comentario.email }</u></b>
				<br />
				{ comentario.body }
			</li>
		))
	);

  return (
    <ul>
      { ponerComentarios() }
    </ul>
  )
}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);
