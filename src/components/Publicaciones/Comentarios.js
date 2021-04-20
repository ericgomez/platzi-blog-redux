import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Error404 from '../General/Error404';

const Comentarios = props => {

  if (props.comment_error) {
    return <Error404 mensaje={ props.comment_error } />
  }

  if (props.comment_cargando && !props.comentarios.length) {
    return <Spinner />
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
