
/* IMPORT */

import benchmark from 'benchloop';
import pp from '../dist/index.js';
import Fixtures from '../test/fixtures.js';

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 50000,
  log: 'compact'
});

benchmark ({
  name: 'get',
  before: ctx => {
    ctx.source = Fixtures.source;
  },
  fn: ctx => {
    pp.get ( ctx.source, 'foo' );
    pp.get ( ctx.source, 'deep.foo', 123 );
    pp.get ( ctx.source, 'deep.deep.deep.level', 123 );
    pp.get ( ctx.source, 'deep.deep.deep.deep.deep.deep.deep.deep' );
  }
});

benchmark ({
  name: 'has',
  beforeEach: ctx => {
    ctx.source = Fixtures.source;
  },
  fn: ctx => {
    pp.has ( ctx.source, 'foo' );
    pp.has ( ctx.source, 'deep.foo' );
    pp.has ( ctx.source, 'deep.deep.deep.level' );
    pp.has ( ctx.source, 'deep.deep.deep.deep.deep.deep.deep.deep' );
  }
});

benchmark ({
  name: 'set',
  beforeEach: ctx => {
    ctx.source = Fixtures.source;
  },
  fn: ctx => {
    pp.set ( ctx.source, 'foo', 123 );
    pp.set ( ctx.source, 'deep.foo', 123 );
    pp.set ( ctx.source, 'deep.deep.deep.test', 123 );
    pp.set ( ctx.source, 'deep.deep.deep.deep.deep.deep.deep.deep', 123 );
  }
});

benchmark ({
  name: 'delete',
  beforeEach: ctx => {
    ctx.source = Fixtures.source;
  },
  fn: ctx => {
    pp.delete ( ctx.source, 'foo' );
    pp.delete ( ctx.source, 'deep.foo' );
    pp.delete ( ctx.source, 'deep.deep.deep.level' );
    pp.delete ( ctx.source, 'deep.deep.deep.deep.deep.deep.deep.deep' );
  }
});

benchmark ({
  name: 'flat',
  fn: () => {
    pp.flat ( Fixtures.unflattened );
  }
});

benchmark ({
  name: 'unflat',
  fn: () => {
    pp.unflat ( Fixtures.flattened );
  }
});

benchmark.summary ();
