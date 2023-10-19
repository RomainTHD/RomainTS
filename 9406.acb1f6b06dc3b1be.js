"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9406],{

/***/ 9406:
/*!**********************************************************************!*\
  !*** ../src/typechecker/visitor/expression/CallExpressionVisitor.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);





const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_4__.LoggerFactory.create("CallExpressionVisitor");
const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let typeArgs = null;
    if (node.typeArguments) {
      // `f<string>(...)`
      typeArgs = [];
      for (const typeArg of node.typeArguments) {
        typeArgs.push(yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(typeArg, env));
      }
      if (typeArgs.length === 0) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("Type argument list cannot be empty", node);
      }
    }
    const left = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.expression, env);
    if (!(left.eType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.FunctionType)) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Cannot call non-function type '${left.eType}'`, node);
    }
    const f = left.eType;
    if (typeArgs && typeArgs.length !== f.generics.length) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Expected ${f.generics.length} type arguments, got ${typeArgs.length}`, node);
    }
    env.enterScope();
    const inferredTypes = new Map();
    if (typeArgs) {
      // `f<string>(...)`
      typeArgs.forEach((arg, i) => {
        env.addType(f.generics[i], arg);
        inferredTypes.set(f.generics[i], arg);
      });
    }
    const args = [];
    for (const arg of node.arguments) {
      args.push((yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(arg, env)).eType);
    }
    if (f.params.length !== args.length) {
      const err = new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Expected ${f.params.length} arguments, got ${args.length}`, node);
      if (args.length > f.params.length) {
        throw err;
      }
      const firstOptional = f.params.findIndex(param => param.isOptional);
      if (firstOptional === -1 || args.length < firstOptional) {
        throw err;
      }
    }
    if (!typeArgs) {
      // Infer generic types from arguments
      args.forEach((arg, i) => {
        if (!f.params[i].isGeneric) {
          return;
        }
        // FIXME: Will break for `f<T>(a: T | something)`
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(f.params[i].pType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.GenericType);
        const generic = f.params[i].pType;
        let inferred;
        if (!inferredTypes.has(generic.label)) {
          // First time inferring this generic
          inferred = arg;
        } else {
          // Already inferred, confirm that it matches
          const previous = inferredTypes.get(generic.label);
          (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(previous);
          if (previous.contains(arg) || arg.contains(previous)) {
            // In `f("s", 0 as string | number)`, `T` is first inferred as `string`, but then extended to
            //  `string | number`, so we extend its definition
            /*
            FIXME: Actually, this is even more complicated.
             This example is fine:
            ```ts
            function f<T>(a: T, b: T): T {
                return a;
            }
            let x = f("s", 0 as string | number);
            ```
             But this one is not:
            ```ts
            function f<T>(a: T, b: T): T {
                return a;
            }
            let snd: string | number = 0;
            let x = f("s", snd);
            ```
             */
            inferred = _types__WEBPACK_IMPORTED_MODULE_2__.UnionType.create([previous, arg]).simplify().generalize();
          } else {
            // `f("s", 0)` has a conflict
            throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Argument of type '${arg}' is not assignable to parameter of type '${inferredTypes.get(generic.label)}'`, node);
          }
        }
        env.addType(generic.label, inferred);
        inferredTypes.set(generic.label, inferred);
      });
    }
    args.forEach((arg, i) => {
      const param = f.params[i];
      if (!param.pType.contains(arg)) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Argument ${i} has type '${arg}', but expected '${param.pType}'`, node);
      }
    });
    let {
      retType
    } = f;
    if (retType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.GenericType) {
      const generic = retType;
      const inferred = inferredTypes.get(generic.label);
      if (inferred) {
        retType = inferred;
      } else {
        // FIXME: Will break for `f<T>(): T | something`
        retType = generic.aliasType;
        // Should it be a real error?
        logger.warn(`Could not infer type for generic '${generic.label}'`);
      }
    } else {
      retType = retType.replaceGenerics(Array.from(inferredTypes.entries()).map(([k, v]) => ({
        name: k,
        gType: v
      })));
    }
    env.leaveScope();
    return {
      eType: retType
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);