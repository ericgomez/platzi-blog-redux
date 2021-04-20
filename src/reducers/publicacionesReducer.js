import { ACTUALIZAR, CARGANDO, ERROR, COMMENT_CARGANDO, COMMENT_ERROR, COMMENT_ACTUALIZAR } from '../types/publicacionesTypes';

const INITIAL_STATE = {
	publicaciones: [],
  cargando: false,
  error: '',
  comment_cargando: false,
	comment_error: ''
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTUALIZAR:
      return { ...state, publicaciones: action.payload, cargando: false, error: '' };
    
    case CARGANDO:
      return {  ...state, cargando: true };

    case ERROR:
      return {  ...state, error: action.payload, cargando: false };

    case COMMENT_ACTUALIZAR:
      return { ...state, publicaciones: action.payload, comment_cargando: false, comment_error: '' };

    case COMMENT_CARGANDO:
      return {  ...state, comment_cargando: true };

    case COMMENT_ERROR:
      return {  ...state, comment_error: action.payload, comment_cargando: false };


    default: return state;
  };
}; 