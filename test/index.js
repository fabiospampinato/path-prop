
/* IMPORT */

import {describe} from 'fava';
import pp from '../dist/index.js';
import Fixtures from './fixtures.js';

/* MAIN */

describe ( 'path-prop', () => {

  describe ( 'get', it => {

    it ( 'supports regular keys', t => {

      t.is ( pp.get ( Fixtures.source, 'foo' ), 'foo' );
      t.is ( pp.get ( Fixtures.source, 'zero' ), 0 );
      t.is ( pp.get ( Fixtures.source, 'false' ), false );
      t.is ( pp.get ( Fixtures.source, 'null' ), null );
      t.is ( pp.get ( Fixtures.source, 'null.deep' ), undefined );
      t.is ( pp.get ( Fixtures.source, 'undefined' ), undefined );
      t.is ( pp.get ( Fixtures.source, 'arr.length' ), 3 );
      t.is ( pp.get ( Fixtures.source, 'test' ), undefined );

    });

    it ( 'supports paths', t => {

      t.is ( pp.get ( Fixtures.source, 'arr.0' ), 1 );
      t.is ( pp.get ( Fixtures.source, 'arr.2.deep.deep' ), true );
      t.is ( pp.get ( Fixtures.source, 'deep.foo' ), 'deep.foo' );
      t.is ( pp.get ( Fixtures.source, 'deep.zero' ), 0 );
      t.is ( pp.get ( Fixtures.source, 'deep.false' ), false );
      t.is ( pp.get ( Fixtures.source, 'deep.null' ), null );
      t.is ( pp.get ( Fixtures.source, 'deep.null.deep' ), undefined );
      t.is ( pp.get ( Fixtures.source, 'deep.deep.deep.deep' ), undefined );
      t.is ( pp.get ( Fixtures.source, 'deep.undefined' ), undefined );
      t.is ( pp.get ( Fixtures.source, 'deep.test' ), undefined );

    });

    it ( 'supports defaults', t => {

      t.is ( pp.get ( Fixtures.source, 'test', 123 ), 123 );
      t.is ( pp.get ( Fixtures.source, 'null', 123 ), null );
      t.is ( pp.get ( Fixtures.source, 'null.deep', 123 ), 123 );
      t.is ( pp.get ( Fixtures.source, 'undefined', 123 ), 123 );
      t.is ( pp.get ( Fixtures.source, 'deep.test', 123 ), 123 );
      t.is ( pp.get ( Fixtures.source, 'deep.null', 123 ), null );
      t.is ( pp.get ( Fixtures.source, 'deep.null.deep', 123 ), 123 );
      t.is ( pp.get ( Fixtures.source, 'deep.undefined', 123 ), 123 );

    });

    it ( 'supports unexpected source objects', t => {

      t.is ( pp.get ( null, 'foo' ), undefined );
      t.is ( pp.get ( false, 'bar' ), undefined );
      t.is ( pp.get ( 0, 'deep.foo' ), undefined );
      t.is ( pp.get ( undefined, 'bar', 123 ), 123 );

    });

    it ( 'supports unexpected paths', t => {

      t.is ( pp.get ( Fixtures.source, null ), undefined );
      t.is ( pp.get ( Fixtures.source, false ), undefined );
      t.is ( pp.get ( Fixtures.source, 0 ), undefined );
      t.is ( pp.get ( Fixtures.source, undefined, 123 ), 123 );
      t.is ( pp.get ( Fixtures.source, [] ), undefined );

    });

    it ( 'is not succeptible to prototype pollution issues', t => {

      const target = Fixtures.source.arr;

      t.is ( pp.get ( target, 'constructor' ), target );
      t.is ( pp.get ( target, 'prototype' ), target );
      t.is ( pp.get ( target, '__proto__' ), target );

    });

  });

  describe ( 'has', it => {

    it ( 'supports regular keys', t => {

      t.true ( pp.has ( Fixtures.source, 'arr' ) );
      t.true ( pp.has ( Fixtures.source, 'foo' ) );
      t.true ( pp.has ( Fixtures.source, 'zero' ) );
      t.true ( pp.has ( Fixtures.source, 'false' ) );
      t.true ( pp.has ( Fixtures.source, 'null' ) );
      t.false ( pp.has ( Fixtures.source, 'undefined' ) );
      t.false ( pp.has ( Fixtures.source, 'test' ) );

    });

    it ( 'supports paths', t => {

      t.true ( pp.has ( Fixtures.source, 'arr.length' ) );
      t.true ( pp.has ( Fixtures.source, 'arr.2.deep.deep' ) );
      t.true ( pp.has ( Fixtures.source, 'deep.foo' ) );
      t.true ( pp.has ( Fixtures.source, 'deep.zero' ) );
      t.true ( pp.has ( Fixtures.source, 'deep.false' ) );
      t.true ( pp.has ( Fixtures.source, 'deep.null' ) );
      t.false ( pp.has ( Fixtures.source, 'deep.undefined' ) );
      t.false ( pp.has ( Fixtures.source, 'deep.test' ) );
      t.false ( pp.has ( Fixtures.source, 'deep.deep.deep.deep' ) );

    });

    it ( 'supports unexpected source objects', t => {

      t.false ( pp.has ( null, 'foo' ) );
      t.false ( pp.has ( false, 'bar' ) );
      t.false ( pp.has ( 0, 'deep.foo' ) );
      t.false ( pp.has ( undefined, 'bar' ) );

    });

    it ( 'supports unexpected paths', t => {

      t.false ( pp.has ( Fixtures.source, null ) );
      t.false ( pp.has ( Fixtures.source, false ) );
      t.false ( pp.has ( Fixtures.source, 0 ) );
      t.false ( pp.has ( Fixtures.source, undefined ) );
      t.false ( pp.has ( Fixtures.source, [] ) );

    });

  });

  describe ( 'set', it => {

    it ( 'supports regular keys', t => {

      const source = Fixtures.source;

      t.is ( pp.set ( source, 'arr', [1, 2, 3] ), source );
      t.is ( pp.set ( source, 'foo', 'set' ), source );
      t.is ( pp.set ( source, 'bar', undefined ), source );
      t.is ( pp.set ( source, 'undefined', 'set2' ), source );

      t.deepEqual ( pp.get ( source, 'arr' ), [1, 2, 3] );
      t.is ( pp.get ( source, 'foo' ), 'set' );
      t.is ( pp.get ( source, 'bar', 123 ), 123 );
      t.is ( pp.get ( source, 'undefined' ), 'set2' );

    });

    it ( 'supports paths', t => {

      const source = Fixtures.source;

      t.is ( pp.set ( source, 'arr.0', 0 ), source );
      t.is ( pp.set ( source, 'arr.2.deep.foo', true ), source );
      t.is ( pp.set ( source, 'deep.foo', 'set' ), source );
      t.is ( pp.set ( source, 'deep.bar', undefined ), source );
      t.is ( pp.set ( source, 'deep.undefined', 'set2' ), source );
      t.is ( pp.set ( source, 'deep.deep.deep.deep', 123 ), source );

      t.is ( pp.get ( source, 'arr.0' ), 0 );
      t.is ( pp.get ( source, 'arr.2.deep.foo' ), true );
      t.is ( pp.get ( source, 'deep.foo' ), 'set' );
      t.is ( pp.get ( source, 'deep.bar', 123 ), 123 );
      t.is ( pp.get ( source, 'deep.undefined' ), 'set2' );
      t.is ( pp.get ( source, 'deep.deep.deep.deep' ), 123 );

    });

    it ( 'supports unexpected sources', t => {

      t.is ( pp.set ( null, 'foo', 123 ), null );
      t.is ( pp.set ( false, 'bar', 123 ), false );
      t.is ( pp.set ( 0, 'deep.foo', 123 ), 0 );
      t.is ( pp.set ( undefined, 'bar', 123 ), undefined );

    });

    it ( 'supports unexpected paths', t => {

      const source = Fixtures.source;

      t.is ( pp.set ( source, null, 123 ), source );
      t.is ( pp.set ( source, false, 123 ), source );
      t.is ( pp.set ( source, 0, 123 ), source );
      t.is ( pp.set ( source, undefined, 123 ), source );
      t.is ( pp.set ( source, [], 123 ), source );

    });

    it ( 'is not succeptible to prototype pollution issues', t => {

      const target = Fixtures.source.arr;

      t.is ( pp.set ( target, 'constructor', true ), target );
      t.is ( pp.set ( target, 'prototype', true ), target );
      t.is ( pp.set ( target, '__proto__', true ), target );

      t.is ( pp.get ( target, 'constructor' ), target );
      t.is ( pp.get ( target, 'prototype' ), target );
      t.is ( pp.get ( target, '__proto__' ), target );

    });

  });

  describe ( 'delete', it => {

    it ( 'supports regular keys', t => {

      const source = Fixtures.source;

      pp.delete ( source, 'arr' );
      pp.delete ( source, 'foo' );
      pp.delete ( source, 'bar' );
      pp.delete ( source, 'undefined' );

      t.false ( source.hasOwnProperty ( 'foo' ) );
      t.is ( pp.get ( source, 'arr' ), undefined );
      t.is ( pp.get ( source, 'foo' ), undefined );
      t.is ( pp.get ( source, 'bar', 123 ), 123 );
      t.is ( pp.get ( source, 'undefined' ), undefined );
      t.is ( pp.get ( source, 'undefined', 123 ), 123 );

    });

    it ( 'supports paths', t => {

      const source = Fixtures.source;

      pp.delete ( source, 'arr.0' );
      pp.delete ( source, 'arr.deep.deep' );
      pp.delete ( source, 'deep.foo' );
      pp.delete ( source, 'deep.bar' );
      pp.delete ( source, 'deep.undefined' );

      t.is ( pp.get ( source, 'arr.0' ), undefined );
      t.is ( pp.get ( source, 'arr.deep.deep' ), undefined );
      t.is ( pp.get ( source, 'deep.foo' ), undefined );
      t.is ( pp.get ( source, 'deep.bar', 123 ), 123 );
      t.is ( pp.get ( source, 'deep.undefined' ), undefined );
      t.is ( pp.get ( source, 'deep.undefined', 123 ), 123 );

    });

    it ( 'supports unexpected sources', t => {

      pp.delete ( null, 'foo' );
      pp.delete ( false, 'bar' );
      pp.delete ( 0, 'deep.foo' );
      pp.delete ( undefined, 'bar' );

      t.pass ();

    });

    it ( 'supports unexpected paths', t => {

      const source = Fixtures.source;
      const clone = Fixtures.source;

      pp.delete ( source, null );
      pp.delete ( source, false );
      pp.delete ( source, 0 );
      pp.delete ( source, undefined );
      pp.delete ( source, [] );

      t.deepEqual ( source, clone );

    });

    it ( 'is not succeptible to prototype pollution issues', t => {

      const target = Fixtures.source.arr;

      pp.delete ( target, 'constructor' );
      pp.delete ( target, 'prototype' );
      pp.delete ( target, '__proto__' );

      t.true ( pp.has ( target, 'constructor' ) );
      t.true ( pp.has ( target, 'prototype' ) );
      t.true ( pp.has ( target, '__proto__' ) );

    });

  });

  describe ( 'flat', it => {

    it ( 'works', t => {

      const flattened = JSON.parse ( JSON.stringify ( Fixtures.flattened ) ); // Removing undefined values
      const unflattened = JSON.parse ( JSON.stringify ( Fixtures.unflattened ) ); // Removing undefined values

      t.deepEqual ( pp.flat ( Fixtures.unflattened ), flattened );
      t.deepEqual ( pp.unflat ( pp.flat ( Fixtures.unflattened ) ), unflattened );

    });

  });

  describe ( 'unflat', it => {

    it ( 'works', t => {

      const flattened = JSON.parse ( JSON.stringify ( Fixtures.flattened ) ); // Removing undefined values
      const unflattened = JSON.parse ( JSON.stringify ( Fixtures.unflattened ) ); // Removing undefined values

      t.deepEqual ( pp.unflat ( Fixtures.flattened ), unflattened );
      t.deepEqual ( pp.flat ( pp.unflat ( Fixtures.flattened ) ), flattened );

    });

    it ( 'merges objects', t => {

      t.deepEqual ( pp.unflat ( Fixtures.flattenedMerged ), Fixtures.unflattenedMerged );

    });

  });

});
