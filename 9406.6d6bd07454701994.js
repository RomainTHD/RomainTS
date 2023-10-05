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




const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let typeArgs = null;
    if (node.typeArguments) {
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
      // TODO: Handle optional parameters
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Expected ${f.params.length} arguments, got ${args.length}`, node);
    }
    if (!typeArgs) {
      args.forEach((arg, i) => {
        if (!f.params[i].isGeneric) {
          return;
        }
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(f.params[i].pType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.GenericType);
        const generic = f.params[i].pType;
        env.addType(generic.label, arg);
        inferredTypes.set(generic.label, arg);
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
      retType = inferredTypes.get(generic.label) ?? retType;
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