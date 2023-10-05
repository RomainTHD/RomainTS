"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1137],{

/***/ 1137:
/*!********************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/PropertyAccessExpressionVisitor.ts ***!
  \********************************************************************************/
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
    const expr = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.expression, env);
    const e = yield env.withChildData({
      isPropertyAccess: true
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    }));
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(e.identifier !== undefined, "identifier is undefined");
    const prop = e.identifier;
    if (!(expr.eType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.PropertyAccessor)) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Property access on non-object type '${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringify)(expr)}'`, node);
    }
    if (expr.eType.hasProperty(prop)) {
      return {
        eType: expr.eType.getProperty(prop).pType,
        isFromVariable: true,
        isMutable: true
      };
    }
    if (env.config.strictMode) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Property '${prop}' does not exist on type '${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringify)(expr)}'`, node);
    } else {
      return {
        eType: _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create()
      };
    }
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);