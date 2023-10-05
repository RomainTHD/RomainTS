"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[5287],{

/***/ 5287:
/*!*****************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/PrefixUnaryExpressionVisitor.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/IllegalStateException */ 7430);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);






const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const e = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.operand, env);
    const t = e.eType;
    switch (node.operator) {
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).PlusPlusToken:
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).MinusMinusToken:
        throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__.NotImplementedException();
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).PlusToken:
        if (_types__WEBPACK_IMPORTED_MODULE_3__.BigIntType.create().equals(t)) {
          throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Cannot use prefix unary operator on BigInt", node);
        } else {
          return {
            eType: _types__WEBPACK_IMPORTED_MODULE_3__.NumberType.create()
          };
        }
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).MinusToken:
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).TildeToken:
        if (_types__WEBPACK_IMPORTED_MODULE_3__.BigIntType.create().equals(t)) {
          return {
            eType: _types__WEBPACK_IMPORTED_MODULE_3__.BigIntType.create()
          };
        } else {
          return {
            eType: _types__WEBPACK_IMPORTED_MODULE_3__.NumberType.create()
          };
        }
      case (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).ExclamationToken:
        return {
          eType: _types__WEBPACK_IMPORTED_MODULE_3__.BooleanType.create()
        };
      default:
        throw new _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_4__.IllegalStateException(`Unexpected prefix unary operator ${(typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind)[node.operator]}`);
    }
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);