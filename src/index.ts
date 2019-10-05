
/* IMPORT */

import {DIVIDER} from './consts';

/* METHODS */

function get ( object, path: string, fallback? ) {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return fallback;

  const keys = path.split ( DIVIDER );

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    object = object[keys[i]];

    if ( object === undefined ) return fallback;

    if ( object === null ) return ( i === l - 1 ) ? object : fallback;

  }

  return object;

}

function has ( object, path: string ): boolean {

  return get ( object, path ) !== undefined;

}

function set ( object, path: string, value ) {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return object;

  const keys = path.split ( DIVIDER ),
        source = object;

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    const key = keys[i];

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

}

function del ( object, path: string ): void {

  if ( typeof path !== 'string' || typeof object !== 'object' || object === null ) return;

  const keys = path.split ( DIVIDER );

  for ( let i = 0, l = keys.length; i < l; i++ ) {

    if ( i === l - 1 ) {

      delete object[keys[i]];

    } else {

      const value = object[keys[i]];

      if ( typeof value !== 'object' || value === null ) return;

      object = value;

    }

  }

}

function flat ( object, prefix: string = '' ) {

  const flattened = {};

  for ( const key in object ) {

    const value = object[key];

    if ( value === undefined ) continue;

    if ( typeof value !== 'object' || value === null ) {

      flattened[`${prefix}${key}`] = value;

    } else {

      const flattenedDeep = flat ( value, `${prefix}${key}${DIVIDER}` );

      for ( const key in flattenedDeep ) {

        flattened[key] = flattenedDeep[key];

      }

    }

  }

  return flattened;

}

function unflat ( object ) {

  const unflattened = {};

  for ( const key in object ) {

    const value = object[key];

    if ( value === undefined ) continue;

    set ( unflattened, key, typeof value === 'object' && value !== null ? unflat ( value ) : value );

  }

  return unflattened;

}

/* PATH PROP */

const PathProp = {get, has, set, delete: del, flat, unflat};

/* EXPORT */

export default PathProp;
