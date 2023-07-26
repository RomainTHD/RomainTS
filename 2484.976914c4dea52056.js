"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2484],{

/***/ 2484:
/*!***************************************************************!*\
  !*** ../src/typechecker/visitor/type/TypeReferenceVisitor.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../accept */ 3630);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../env */ 5231);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);




const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    env.setValueSide(_env__WEBPACK_IMPORTED_MODULE_2__.ValueSide.LValue);
    const name = yield _accept__WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.typeName, env);
    env.setValueSide(_env__WEBPACK_IMPORTED_MODULE_2__.ValueSide.RValue);
    const t = env.lookupType(name);
    if (!t) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure(`Couldn't find type '${name}'`, node);
    }
    return t;
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);