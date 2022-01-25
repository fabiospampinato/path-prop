
/* IMPORT */

import get from './get';

/* MAIN */

const has = ( object, path: string ): boolean => {

  return get ( object, path ) !== undefined;

};

/* EXPORT */

export default has;
