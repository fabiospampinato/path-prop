
/* IMPORT */

import get from './get';
import has from './has';
import set from './set';
import del from './del';
import flat from './flat';
import unflat from './unflat';

/* MAIN */

const PathProp = {get, has, set, delete: del, flat, unflat};

/* EXPORT */

export default PathProp;
export {get, has, set, del, del as delete, flat, unflat};
