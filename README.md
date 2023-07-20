# RomainTS

A (future) TypeScript compiler written in TypeScript. For now, it's just a
typechecker though.

I'm too lazy to write my own lexer / parser, and it's not as fun, so I'm using
the TypeScript one to generate the raw AST, but maybe at some point I'll work
on it.

### Usage

```shell
tsx ./src/main.ts -i <file.ts>
```

### Project status

[Supported features](https://github.com/RomainTHD/RomainTS/wiki/Supported-features)
