
/* IMPORT */

import {DIVIDER} from './constants';

/* MAIN */

const del = ( object: object, path: string ): void => {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return;

  const keys = path.split ( DIVIDER );

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    const key = keys[i];

    if ( key === 'constructor' || key === 'prototype' || key === '__proto__' ) break;

    if ( i === l - 1 ) {

      delete object[key];

    } else {

      const value = object[key];

      if ( typeof value !== 'object' || value === null ) return;

      object = value;

    }

  }

};

/* EXPORT */

export default del;
