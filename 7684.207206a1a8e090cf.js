"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[7684],{

/***/ 7684:
/*!************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/BinaryExpressionVisitor.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);



const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let resolveIdentifier = true;
    switch (node.operatorToken.kind) {
      // TODO: Use a visitor instead
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).EqualsToken:
        resolveIdentifier = false;
        break;
      default:
        break;
    }
    // A BinaryExpression left expression can be either a LValue or a RValue
    // example: `x = 0` where `x` is a LValue, or `x + 1` where `x` is a RValue
    const left = yield env.withChildData({
      resolveIdentifier
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.left, env);
    }));
    const right = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.right, env);
    return env.withChildData({
      left,
      right
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.operatorToken, env);
    }));
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);