"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[6310],{

/***/ 6310:
/*!*******************************************************************!*\
  !*** ../src/typechecker/visitor/literal/NumericLiteralVisitor.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);




const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.LoggerFactory.create("NumericLiteralVisitor");
const visit = (node, env) => {
  const trueNode = node;
  if (trueNode.numericLiteralFlags && (trueNode.numericLiteralFlags & (typescript__WEBPACK_IMPORTED_MODULE_0___default().TokenFlags).Octal) !== 0) {
    if (env.config.strictMode) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure("Legacy octal literals are forbidden", node);
    } else {
      logger.warn("Used a legacy octal literal");
    }
  }
  return _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
    vType: _types__WEBPACK_IMPORTED_MODULE_1__.NumberType.create(),
    value: parseInt(node.text, 10)
  });
};

/***/ })

}]);