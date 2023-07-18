"use strict";
(self["webpackChunkRomainTS_demo"] = self["webpackChunkRomainTS_demo"] || []).push([[402],{

/***/ 7402:
/*!**************************************************************!*\
  !*** ../src/typechecker/visitor/token/EqualsTokenVisitor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);



const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_1__.LoggerFactory.get("EqualsTokenVisitor");
function visit(_x, _x2, _x3) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env, {
    left,
    right
  }) {
    const variable = env.get(left);
    if (variable) {
      if (variable.builtin) {
        if (env.config.strictMode) {
          throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Cannot assign to builtin '${left}'`, node);
        } else {
          logger.warn(`Suspicious assignment to builtin '${left}'`);
        }
      } else if (!variable.isMutable) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Cannot assign to constant '${left}'`, node);
      } else if (!variable.vType.contains(right)) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Type '${right}' is not assignable to type '${variable.vType}'`, node);
      }
    } else {
      // `x = 0` where `x` is not declared. Valid in non-strict mode
      if (env.config.strictMode) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Variable ${left} not found`, node);
      } else {
        logger.warn(`Variable '${left}' not found, declaring it`);
        env.add(left, {
          vType: right,
          isLocal: false,
          isMutable: true
        });
      }
    }
    return right;
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);