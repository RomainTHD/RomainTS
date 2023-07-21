"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9886],{

/***/ 9886:
/*!******************************************************************!*\
  !*** ../src/typechecker/visitor/token/PlusEqualsTokenVisitor.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);



const visit = (node, env, {
  left,
  right
}) => {
  if (left instanceof _types__WEBPACK_IMPORTED_MODULE_0__.StringType || right instanceof _types__WEBPACK_IMPORTED_MODULE_0__.StringType) {
    // `0 + "a"` => "0a"
    return _types__WEBPACK_IMPORTED_MODULE_0__.StringType.create();
  } else if (left instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType && right instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType) {
    // `0n + 1n` => 1n
    return _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType.create();
  } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.xor)(left instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType, right instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType)) {
    // `0 + 1n` => error
    throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Cannot convert BigInt to Number", node);
  } else {
    // Anything else is a number
    return _types__WEBPACK_IMPORTED_MODULE_0__.NumberType.create();
  }
};

/***/ })

}]);