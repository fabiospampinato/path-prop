
/* IMPORT */

import {DIVIDER} from './constants';

/* MAIN */

const set = <T extends object> ( object: T, path: string, value: unknown ): T => {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return object;

  const keys = path.split ( DIVIDER );

  let target: any = object;

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    const key = keys[i];

    if ( key === 'constructor' || key === 'prototype' || key === '__proto__' ) break;

    if ( i === l - 1 ) {

      target[key] = value;

    } else {

      const value = target[key];

      if ( typeof value !== 'object' || value === null ) {

        target = target[key] = {};

      } else {

        target = value;

      }

    }

  }

  return object;

};

/* EXPORT */

export default set;
