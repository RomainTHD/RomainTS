"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9951],{

/***/ 9951:
/*!*****************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/TypeAliasDeclarationVisitor.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);




function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (node.modifiers) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__.NotImplementedException();
    }
    const e = yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    }));
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.assert)(e.identifier !== undefined, "identifier is undefined");
    const name = e.identifier;
    const t = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.type, env);
    env.addType(name, t);
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);