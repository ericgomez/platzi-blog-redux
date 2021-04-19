// import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';

const INITIAL_STATE = {
	publicaciones: [],
  cargando: false,
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default: return state;
  };
}; 