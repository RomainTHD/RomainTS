"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[406],{

/***/ 9406:
/*!**********************************************************************!*\
  !*** ../src/typechecker/visitor/expression/CallExpressionVisitor.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);



const visit = /*#__PURE__*/function () {
  var _ref = (0,C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const left = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.expression, env);
    if (!(left instanceof _types__WEBPACK_IMPORTED_MODULE_2__.FunctionType)) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Cannot call non-function type '${left}'`, node);
    }
    const f = left;
    const args = [];
    for (const arg of node.arguments) {
      args.push(yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(arg, env));
    }
    if (f.params.length !== args.length) {
      // TODO: Handle optional parameters
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Expected ${f.params.length} arguments, got ${args.length}`, node);
    }
    for (let i = 0; i < args.length; i++) {
      const param = f.params[i];
      const arg = args[i];
      if (!param.pType.contains(arg)) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Argument ${i} has type '${arg}', but expected '${param.pType}'`, node);
      }
    }
    return f.retType;
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);