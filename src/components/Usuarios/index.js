import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from './../General/Spinner';
import Error404 from '../General/Error404';
import Tabla from './Tabla';

import * as usuariosActions from './../../actions/usuariosActions';

class Usuarios extends Component {

  componentDidMount(){
    this.props.traerTodos();
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Error404 mensaje={ this.props.error } />;
    }

    return <Tabla />
  }

  render() {
    // console.log(this.props.cargando);
    // console.log(this.props.error);
    return (
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios)
