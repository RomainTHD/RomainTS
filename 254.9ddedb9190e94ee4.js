"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[254],{

/***/ 254:
/*!**************************************************************************!*\
  !*** ../src/typechecker/visitor/other/VariableDeclarationListVisitor.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/IllegalStateException */ 7430);




function flagsToString(flags) {
  return flags.toString(2).split("").reverse().map((x, i) => x === "1" ? i : -1).filter(b => b !== -1).map(b => (typescript__WEBPACK_IMPORTED_MODULE_1___default().NodeFlags)[2 ** b]).join(", ");
}
function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const data = (() => {
      // `x = 0;` when `x` is not declared, is a BinaryExpression, not a VariableDeclarationList
      switch (node.flags) {
        case (typescript__WEBPACK_IMPORTED_MODULE_1___default().NodeFlags).Const:
          return {
            isLocal: true,
            isMutable: false
          };
        case (typescript__WEBPACK_IMPORTED_MODULE_1___default().NodeFlags).Let:
          return {
            isLocal: true,
            isMutable: true
          };
        case (typescript__WEBPACK_IMPORTED_MODULE_1___default().NodeFlags).None:
          return {
            isLocal: false,
            isMutable: true
          };
        default:
          // eslint-disable-next-line no-bitwise
          if ((node.flags & (typescript__WEBPACK_IMPORTED_MODULE_1___default().NodeFlags).ThisNodeHasError) !== 0) {
            throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Expression expected", node);
          }
          throw new _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_3__.IllegalStateException(`Unexpected variable declaration list flags: ${flagsToString(node.flags)}`);
      }
    })();
    for (const varDecl of node.declarations) {
      yield env.withChildData(data, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(varDecl, env);
      }));
    }
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);