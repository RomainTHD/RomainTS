"use strict";
(self["webpackChunkRomainTS_demo"] = self["webpackChunkRomainTS_demo"] || []).push([[546],{

/***/ 3546:
/*!*************************************************************!*\
  !*** ../src/typechecker/visitor/other/IdentifierVisitor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../env */ 5231);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);





const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.LoggerFactory.get("Identifier");
function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (env.getValueSide() === _env__WEBPACK_IMPORTED_MODULE_3__.ValueSide.LValue) {
      // `x = 0`: `x` is a LValue
      return node.text;
    } else {
      // `x + 0`: `x` is a RValue
      const value = env.get(node.text);
      if (!value) {
        if (env.config.strictMode) {
          throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__.TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
        } else {
          logger.warn(`Identifier '${node.text}' not found in scope`);
          return _types__WEBPACK_IMPORTED_MODULE_1__.UndefinedType.get();
        }
      }
      return value.vType;
    }
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);