"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[8814],{

/***/ 8814:
/*!****************************************************************!*\
  !*** ../src/typechecker/visitor/literal/ThisKeywordVisitor.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/IllegalStateException */ 7430);

const visit = (node, env) => {
  const thisValue = env.lookup("this");
  if (!thisValue) {
    // FIXME: Maybe it has been deleted?
    throw new _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_0__.IllegalStateException("'this' is undefined");
  }
  return thisValue.vType;
};

/***/ })

}]);