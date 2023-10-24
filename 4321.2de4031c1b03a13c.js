"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[4321],{

/***/ 4321:
/*!************************************************************************!*\
  !*** ../src/typechecker/visitor/statement/VariableStatementVisitor.ts ***!
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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);






const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let exported = false;
    if (node.modifiers) {
      for (const modifier of node.modifiers) {
        if (modifier.kind === (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).ExportKeyword) {
          exported = true;
        } else {
          throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__.NotImplementedException();
        }
      }
    }
    yield env.withChildData({
      isExported: exported
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.declarationList, env);
    }));
    return {
      returningStatement: _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.No,
      inferredType: _types__WEBPACK_IMPORTED_MODULE_3__.VoidType.create()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);