"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9833],{

/***/ 9833:
/*!***********************************************************!*\
  !*** ../src/typechecker/visitor/type/UnionTypeVisitor.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);



const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const types = [];
    for (const subType of node.types) {
      types.push(yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(subType, env));
    }
    const union = _types__WEBPACK_IMPORTED_MODULE_2__.UnionType.create(types);
    if (union.size === 1) {
      // `number | number` is the same as `number`
      return union.types[0];
    } else {
      return union;
    }
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);