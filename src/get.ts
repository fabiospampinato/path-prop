
/* IMPORT */

import {DIVIDER} from './constants';

/* MAIN */

const get = ( object: object, path: string, fallback?: unknown ): unknown => {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return fallback;

  const keys = path.split ( DIVIDER );

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    const key = keys[i];

    if ( key === 'constructor' || key === 'prototype' || key === '__proto__' ) break;

    object = object[key];

    if ( object === undefined ) return fallback;

    if ( object === null ) return ( i === l - 1 ) ? object : fallback;

  }

  return object;

};

/* EXPORT */

export default get;
