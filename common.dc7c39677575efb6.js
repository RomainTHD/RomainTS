"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[8592],{

/***/ 392:
/*!*****************************************************!*\
  !*** ../src/typechecker/visitor/shared/function.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visitFunction: () => (/* binding */ visitFunction)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../accept */ 3630);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../env */ 5231);




var accept = _accept__WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept;
function visitFunction(_x, _x2, _x3) {
  return _visitFunction.apply(this, arguments);
}
function _visitFunction() {
  _visitFunction = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (env, nodeParams, nodeRetType) {
    const params = [];
    for (const param of nodeParams) {
      env.setValueSide(_env__WEBPACK_IMPORTED_MODULE_3__.ValueSide.LValue);
      const name = yield accept(param.name, env);
      env.setValueSide(_env__WEBPACK_IMPORTED_MODULE_3__.ValueSide.RValue);
      let pType;
      if (param.type) {
        pType = yield accept(param.type, env);
      } else {
        pType = _types__WEBPACK_IMPORTED_MODULE_1__.AnyType.create();
      }
      params.push({
        name,
        pType
      });
    }
    let retType;
    let infer = false;
    if (nodeRetType) {
      retType = yield accept(nodeRetType, env);
    } else {
      // Function return type will be inferred later on
      retType = _types__WEBPACK_IMPORTED_MODULE_1__.AnyType.create();
      infer = true;
    }
    return {
      fType: _types__WEBPACK_IMPORTED_MODULE_1__.FunctionType.create(params, retType),
      infer
    };
  });
  return _visitFunction.apply(this, arguments);
}

/***/ }),

/***/ 8922:
/*!*************************************************!*\
  !*** ../src/typechecker/visitor/token/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visitBinaryOperatorToken: () => (/* binding */ visitBinaryOperatorToken)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);



function visitBinaryOperatorToken(node, left, right) {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.xor)(left instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType, right instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType)) {
    throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Cannot convert BigInt to Number", node);
  } else if (left instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType && right instanceof _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType) {
    return _types__WEBPACK_IMPORTED_MODULE_0__.BigIntType.create();
  } else {
    return _types__WEBPACK_IMPORTED_MODULE_0__.NumberType.create();
  }
}

/***/ }),

/***/ 3738:
/*!*****************************!*\
  !*** ../src/utils/Bool3.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bool3: () => (/* binding */ Bool3)
/* harmony export */ });
var Bool3 = /*#__PURE__*/(() => {
  Bool3 = Bool3 || {};
  Bool3[Bool3["False"] = 0] = "False";
  Bool3[Bool3["True"] = 1] = "True";
  Bool3[Bool3["Sometimes"] = 2] = "Sometimes";
  return Bool3;
})();

/***/ })

}]);