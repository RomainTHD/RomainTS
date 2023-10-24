"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[6815],{

/***/ 6815:
/*!***********************************************************************************************!*\
  !*** ../src/typechecker/visitor/token/GreaterThanGreaterThanGreaterThanEqualsTokenVisitor.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);




const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const left = env.getData("left", true);
    if (!left.isMutable) {
      if (left.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure("The left-hand side of an assignment expression must be a variable or a property access", node);
      } else {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure("Cannot assign to a constant", node);
      }
    }
    let leftType;
    if (left.identifier) {
      const v = env.lookup(left.identifier);
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.assert)(v, `Left type cannot be found, identifier was '${left.identifier}'`);
      leftType = v.vType;
    } else {
      leftType = left.eType;
    }
    const right = env.getData("right", true);
    if (leftType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType || right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure("BigInts have no unsigned right shift, use >> instead", node);
    } else {
      return {
        eType: _types__WEBPACK_IMPORTED_MODULE_1__.NumberType.create()
      };
    }
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);