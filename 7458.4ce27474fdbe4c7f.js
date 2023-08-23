"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[7458],{

/***/ 7458:
/*!**************************************************************!*\
  !*** ../src/typechecker/visitor/other/CatchClauseVisitor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);


function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    env.enterScope();
    if (node.variableDeclaration) {
      // FIXME: Will resolve type to `any` instead of `unknown`
      // FIXME: `catch (e: number) {}` should be an error
      const vDecl = node.variableDeclaration;
      yield env.withChildData({
        isLocal: true,
        isMutable: true
      }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(vDecl, env);
      }));
    }
    const catchRet = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.block, env);
    env.leaveScope();
    return catchRet;
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);