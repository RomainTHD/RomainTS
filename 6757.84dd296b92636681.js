"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[6757],{

/***/ 6757:
/*!************************************************************!*\
  !*** ../src/typechecker/visitor/token/PlusTokenVisitor.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ 6435);



const visit = (node, env) => {
  const left = env.getData("left");
  let leftType;
  if (left.identifier) {
    const v = env.lookup(left.identifier);
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.assert)(v, `Left type cannot be found, identifier was '${left.identifier}'`);
    leftType = v.vType;
  } else {
    leftType = left.eType;
  }
  const right = env.getData("right");
  if (leftType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType && right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType) {
    // `0n + 1n` => 1n
    return {
      eType: _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType.create()
    };
  } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.xor)(leftType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType, right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType)) {
    // `0 + 1n` => error
    throw new ___WEBPACK_IMPORTED_MODULE_0__.TypecheckingFailure("Cannot mix BigInt and other types", node);
  } else {
    const numberLike = _types__WEBPACK_IMPORTED_MODULE_1__.UnionType.create([_types__WEBPACK_IMPORTED_MODULE_1__.NumberType.create(), _types__WEBPACK_IMPORTED_MODULE_1__.BooleanType.create()]);
    if (numberLike.contains(leftType) && numberLike.contains(right.eType)) {
      // Anything else is a number
      return {
        eType: _types__WEBPACK_IMPORTED_MODULE_1__.NumberType.create()
      };
    } else {
      // `0 + []` => "0"`
      return {
        eType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create()
      };
    }
  }
};

/***/ })

}]);