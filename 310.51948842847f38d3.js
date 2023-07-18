"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[310],{

/***/ 310:
/*!**************************************************************************!*\
  !*** ../src/typechecker/visitor/statement/ExpressionStatementVisitor.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var D_GDrive_Programmation_TypeScript_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 5848);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);




const visit = /*#__PURE__*/function () {
  var _ref = (0,D_GDrive_Programmation_TypeScript_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env, firstStatement) {
    if (firstStatement) {
      if (node.expression.kind === (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).StringLiteral) {
        const literal = node.expression;
        if (literal.text === "use strict") {
          env.setConfigValue("strictMode", true);
        }
      }
    }
    yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.expression, env);
    return {
      doesReturn: _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.False,
      inferredType: null
    };
  });
  return function visit(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);