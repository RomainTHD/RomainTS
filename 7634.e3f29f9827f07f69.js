"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[7634],{

/***/ 7634:
/*!*************************************************************!*\
  !*** ../src/typechecker/visitor/type/TypeLiteralVisitor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);




const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const resType = _types__WEBPACK_IMPORTED_MODULE_2__.ObjectType.create([]);
    for (const m of node.members) {
      const prop = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(m, env);
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(prop, `Expected property, got '${prop}'`);
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(prop.name, `Expected property name, got '${prop.name}'`);
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(prop.pType, `Expected property type, got '${prop.pType}'`);
      resType.add(prop);
    }
    return resType;
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);