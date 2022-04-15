
/* IMPORT */

import get from './get';
import set from './set';
import {isArray, merge} from './utils';

/* MAIN */

const unflatArray = ( arr: unknown[] ): unknown[] => {

  const {length} = arr;
  const unflattened = new Array ( length );

  for ( let i = 0; i < length; i++ ) {

    const value = arr[i];

    if ( typeof value !== 'object' || value === null ) {

      unflattened[i] = value;

    } else {

      unflattened[i] = unflat ( value );

    }

  }

  return unflattened;

};

const unflatObject = ( object: object ): object => {

  const unflattened = {};

  for ( const key in object ) {

    if ( key === 'constructor' || key === 'prototype' || key === '__proto__' ) break;

    const value = object[key];

    if ( value === undefined ) continue;

    if ( typeof value !== 'object' || value === null ) {

      set ( unflattened, key, value );

    } else {

      const valuePrev = get ( unflattened, key );

      if ( typeof valuePrev !== 'object' || valuePrev === null ) {

        set ( unflattened, key, unflat ( value ) );

      } else {

        set ( unflattened, key, merge ([ valuePrev, unflat ( value ) ]) );

      }

    }

  }

  return unflattened;

};

const unflat = ( object: object ): object => {

  if ( isArray ( object ) ) return unflatArray ( object );

  return unflatObject ( object );

};

/* EXPORT */

export default unflat;
