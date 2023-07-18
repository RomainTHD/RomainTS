"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[684],{

/***/ 7684:
/*!************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/BinaryExpressionVisitor.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 5848);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);



var accept = ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept;
const visit = /*#__PURE__*/function () {
  var _ref = (0,C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let value = ___WEBPACK_IMPORTED_MODULE_2__.ValueSide.RValue;
    switch (node.operatorToken.kind) {
      // TODO: Use a visitor instead
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).EqualsToken:
        value = ___WEBPACK_IMPORTED_MODULE_2__.ValueSide.LValue;
        break;
      default:
        break;
    }
    // A BinaryExpression left expression can be either a LValue or a RValue
    // example: `x = 0` where `x` is a LValue, or `x + 1` where `x` is a RValue
    env.setValueSide(value);
    const left = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.left, env);
    env.setValueSide(___WEBPACK_IMPORTED_MODULE_2__.ValueSide.RValue);
    const right = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.right, env);
    return yield accept(node.operatorToken, env, {
      left,
      right
    });
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);