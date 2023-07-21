"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2123],{

/***/ 2123:
/*!******************************************************************!*\
  !*** ../src/typechecker/visitor/literal/StringLiteralVisitor.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types */ 2122);

const visit = (node, env) => {
  return _types__WEBPACK_IMPORTED_MODULE_0__.LiteralType.create({
    vType: _types__WEBPACK_IMPORTED_MODULE_0__.StringType.create(),
    value: node.text
  });
};

/***/ })

}]);