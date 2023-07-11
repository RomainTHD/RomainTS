# RomainTS

A TypeScript compiler (or at least a typechecker for now).

I'm too lazy to write my own lexer / parser, and it's not as fun, so I'm using
the TypeScript one to generate the raw AST.

Usage:

```shell
tsx ./src/main.ts -i ./example.ts
```
