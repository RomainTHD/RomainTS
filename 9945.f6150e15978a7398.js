"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9945],{

/***/ 9945:
/*!*********************************************************************!*\
  !*** ../src/typechecker/visitor/statement/BreakStatementVisitor.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);





const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (node.label) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__.NotImplementedException();
    }
    const allowBreak = env.getData("allowBreak", false, false);
    if (!allowBreak) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__.TypecheckingFailure("Cannot use break outside of a loop or switch statement", node);
    }
    return {
      returningStatement: _utils_Bool3__WEBPACK_IMPORTED_MODULE_2__.Bool3.No,
      inferredType: _types__WEBPACK_IMPORTED_MODULE_1__.VoidType.create()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);