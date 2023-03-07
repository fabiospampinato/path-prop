# Path Prop

Fast library for manipulating plain objects using paths.

This library is similar to [dot-prop](https://github.com/sindresorhus/dot-prop), but it achieves up to 3x better performance, it offers a couple of additional methods for dealing with flat objects and it has a few more restrictions.

## Features

- **Performant**: it is up to 3x faster than [dot-prop](https://github.com/sindresorhus/dot-prop).
- **Lightweight**: it has just a few tiny dependencies and it's comprised of about 200 lines of code.
- **Flat objects**: a few additional methods are provided for flattening and unflattening objects.

## Restrictions

In order to achieve maximum performance a few limitations/restrictions have been introduced:

- If a property is set to `undefined` it will be considered as not set.
- There's no way to escape dots in paths.
- It's only supposed to manipulate objects, not functions etc.
- It doesn't check if a property is owned or enumerable.

## Install

```sh
npm install --save path-prop
```

## Usage

```ts
import pp from 'path-prop';

/* GET */

let object = { foo: { bar: 123 } };

pp.get ( object, 'foo' ); // => { bar: 123 }
pp.get ( object, 'foo.bar' ); // => 123
pp.get ( object, 'foo.bar.baz' ); // => undefined
pp.get ( object, 'foo.bar.baz', 1 ); // => 1

/* HAS */

object = { foo: { bar: 123 } };

pp.has ( object, 'foo' ); // => true
pp.has ( object, 'foo.bar' ); // => true
pp.has ( object, 'foo.bar.baz' ); // => false

/* SET */

pp.set ( { foo: { bar: 123 } }, 'bar', 1 ); // => { foo: { bar: 123 }, bar: 1 }
pp.set ( { foo: { bar: 123 } }, 'foo.bar', 1 ); // => { foo: { bar: 1 } }
pp.set ( { foo: { bar: 123 } }, 'foo.bar.baz', 1 ); // => { foo: { bar: { baz: 1 } } }

/* DELETE */

object = { foo: { bar: 123 } };

pp.delete ( object, 'foo.bar' ); // => undefined
console.log ( object ); // => { foo: {} }

/* FLAT */

object = { foo: { bar: 123, baz: 'test' }, bar: 1 };

pp.flat ( object ); // => { 'foo.bar': 123, 'foo.baz': 'test', bar: 1 }

/* UNFLAT */

object = { 'foo.bar': 123, 'foo.baz': 'test', bar: 1 };

pp.unflat ( object ); // => { foo: { bar: 123, baz: 'test' }, bar: 1 }
```

## API

### `get ( object, path, fallback? )`

Gets the value at `path`, returning `fallback` if it's not set.

### `has ( object, path )`

Checks if a value is set at `path`.

### `set ( object, path, value )`

Sets `value` at `path`.

### `delete ( object, path )`

Deletes the value at `path`.

### `flat ( object )`

Transforms a potentially deep object into a flat object.

### `unflat ( object )`

Transforms a flat object into a potentially deep object.

## License

MIT © Fabio Spampinato
