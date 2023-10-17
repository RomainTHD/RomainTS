"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1723],{

/***/ 1723:
/*!***************************************************************!*\
  !*** ../src/typechecker/visitor/other/ImportClauseVisitor.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);



function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (!node.namedBindings) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_2__.NotImplementedException();
    }
    return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.namedBindings, env);
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);