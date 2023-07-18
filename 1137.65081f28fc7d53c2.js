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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../accept */ 3630);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../env */ 5231);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);






const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.LoggerFactory.create("PropertyAccessExpressionVisitor");
const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const expr = yield _accept__WEBPACK_IMPORTED_MODULE_3__.TypeChecker.accept(node.expression, env);
    env.setValueSide(_env__WEBPACK_IMPORTED_MODULE_4__.ValueSide.LValue);
    const prop = yield _accept__WEBPACK_IMPORTED_MODULE_3__.TypeChecker.accept(node.name, env);
    env.setValueSide(_env__WEBPACK_IMPORTED_MODULE_4__.ValueSide.RValue);
    if (!(expr instanceof _types__WEBPACK_IMPORTED_MODULE_1__.ObjectType)) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_5__.TypecheckingFailure(`Property access on non-object type '${expr}'`, node);
    }
    if (expr.hasProperty(prop)) {
      return expr.getProperty(prop);
    }
    if (env.config.strictMode) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_5__.TypecheckingFailure(`Property '${prop}' does not exist on type '${expr}'`, node);
    } else {
      logger.warn(`Property '${prop}' does not exist on type '${expr}'`);
      return _types__WEBPACK_IMPORTED_MODULE_1__.UndefinedType.create();
    }
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);