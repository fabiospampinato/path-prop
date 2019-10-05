
/* FIXTURES */

const Fixtures = {
  get source () {
    return {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
      zero: 0,
      false: false,
      null: null,
      undefined: undefined,
      deep: {
        foo: 'deep.foo',
        bar: 'deep.bar',
        baz: 'deep.baz',
        zero: 0,
        false: false,
        null: null,
        undefined: undefined,
        deep: {
          deep: {
            level: 4
          }
        }
      }
    };
  },
  get flattened () {
    return {
      'foo': 'foo',
      'bar': 123,
      'undefined': undefined,
      'deep.foo': 'foo',
      'deep.bar': 123,
      'deep.undefined': undefined,
      'deep.deep.deep.foo': true
    };
  },
  get unflattened () {
    return {
      foo: 'foo',
      bar: 123,
      undefined: undefined,
      deep: {
        foo: 'foo',
        bar: 123,
        undefined: undefined,
        deep: {
          deep: {
            foo: true
          }
        }
      }
    };
  }
};

/* EXPORT */

module.exports = Fixtures;
