
/* IMPORT */

import {DIVIDER} from './constants';
import {isArray, isEmpty} from './utils';

/* MAIN */

const flatArray = ( arr: unknown[] ): unknown[] => {

  const {length} = arr;
  const flattened = new Array ( length );

  for ( let i = 0; i < length; i++ ) {

    const value = arr[i];

    if ( typeof value !== 'object' || value === null ) {

      flattened[i] = value;

    } else {

      flattened[i] = flat ( value );

    }

  }

  return flattened;

};

const flatObject = ( object: object, prefix: string = '' ): object => {

  const flattened = {};

  for ( const key in object ) {

    if ( key === 'constructor' || key === 'prototype' || key === '__proto__' ) break;

    const value = object[key];

    if ( value === undefined ) continue;

    if ( typeof value !== 'object' || value === null ) {

      flattened[`${prefix}${key}`] = value;

    } else if ( isArray ( value ) ) {

      flattened[`${prefix}${key}`] = flatArray ( value );

    } else if ( isEmpty ( value ) ) {

      flattened[`${prefix}${key}`] = {};

    } else {

      const flattenedDeep = flatObject ( value, `${prefix}${key}${DIVIDER}` );

      for ( const key in flattenedDeep ) {

        flattened[key] = flattenedDeep[key];

      }

    }

  }

  return flattened;

};

const flat = ( object: object, prefix: string = '' ): object => {

  if ( isArray ( object ) ) return flatArray ( object );

  return flatObject ( object, prefix );

};

/* EXPORT */

export default flat;
