"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[228],{

/***/ 228:
/*!******************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/ArrayLiteralExpressionVisitor.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var D_GDrive_Programmation_TypeScript_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);



const visit = /*#__PURE__*/function () {
  var _ref = (0,D_GDrive_Programmation_TypeScript_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const types = [];
    for (const element of node.elements) {
      types.push(yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(element, env));
    }
    if (types.length === 0) {
      return _types__WEBPACK_IMPORTED_MODULE_2__.ArrayType.create(_types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create());
    } else {
      return _types__WEBPACK_IMPORTED_MODULE_2__.ArrayType.create(_types__WEBPACK_IMPORTED_MODULE_2__.UnionType.create(types).simplify());
    }
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);