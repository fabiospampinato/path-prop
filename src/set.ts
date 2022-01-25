
/* IMPORT */

import {DIVIDER} from './constants';

/* MAIN */

const set = ( object, path: string, value ) => {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return object;

  const keys = path.split ( DIVIDER );
  const source = object;

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    const key = keys[i];

    if ( key === 'constructor' || key === 'prototype' || key === '__proto__' ) break;

    if ( i === l - 1 ) {

      object[key] = value;

    } else {

      const value = object[key];

      if ( typeof value !== 'object' || value === null ) {

        object = object[key] = {};

      } else {

        object = value;

      }

    }

  }

  return source;

};

/* EXPORT */

export default set;
