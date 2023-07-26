"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[5514],{

/***/ 5514:
/*!*****************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/InterfaceDeclarationVisitor.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../accept */ 3630);





function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (node.heritageClauses || node.modifiers) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__.NotImplementedException();
    }
    const name = yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _accept__WEBPACK_IMPORTED_MODULE_4__.TypeChecker.accept(node.name, env);
    }));
    const resType = _types__WEBPACK_IMPORTED_MODULE_1__.ObjectType.create([]);
    for (const member of node.members) {
      const prop = yield _accept__WEBPACK_IMPORTED_MODULE_4__.TypeChecker.accept(member, env);
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.assert)(prop, `Expected property, got '${prop}'`);
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.assert)(prop.name, `Expected property name, got '${prop.name}'`);
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.assert)(prop.pType, `Expected property type, got '${prop.pType}'`);
      resType.add(prop);
    }
    env.addType(name, resType);
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);