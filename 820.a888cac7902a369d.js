"use strict";
(self["webpackChunkRomainTS_demo"] = self["webpackChunkRomainTS_demo"] || []).push([[820],{

/***/ 7820:
/*!*************************************************************!*\
  !*** ../src/typechecker/visitor/token/SlashTokenVisitor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ 8922);

const visit = (node, env, {
  left,
  right
}) => {
  return (0,___WEBPACK_IMPORTED_MODULE_0__.visitMultiplicativeOperatorOrHigherToken)(node, left, right);
};

/***/ })

}]);