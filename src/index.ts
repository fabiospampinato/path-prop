
/* IMPORT */

import isEmpty from 'plain-object-is-empty';
import merge from 'plain-object-merge';
import {DIVIDER} from './consts';

/* HELPERS */

const {isArray} = Array;

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

function flatArray ( arr ) {

  const {length} = arr,
        flattened = new Array ( length );

  for ( let i = 0; i < length; i++ ) {

    const value = arr[i];

    if ( typeof value !== 'object' || value === null ) {

      flattened[i] = value;

    } else {

      flattened[i] = flat ( value );

    }

  }

  return flattened;

}

function flatObject ( object, prefix: string = '' ) {

  const flattened = {};

  for ( const key in object ) {

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

}

function flat ( object, prefix: string = '' ) {

  if ( isArray ( object ) ) return flatArray ( object );

  return flatObject ( object, prefix );

}

function unflatArray ( arr ) {

  const {length} = arr,
        unflattened = new Array ( length );

  for ( let i = 0; i < length; i++ ) {

    const value = arr[i];

    if ( typeof value !== 'object' || value === null ) {

      unflattened[i] = value;

    } else {

      unflattened[i] = unflat ( value );

    }

  }

  return unflattened;

}

function unflatObject ( object ) {

  const unflattened = {};

  for ( const key in object ) {

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

}

function unflat ( object ) {

  if ( isArray ( object ) ) return unflatArray ( object );

  return unflatObject ( object );

}

/* PATH PROP */

const PathProp = {get, has, set, delete: del, flat, unflat};

/* EXPORT */

export default PathProp;
