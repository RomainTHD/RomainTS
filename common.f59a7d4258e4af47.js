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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);




function visitFunction(_x, _x2, _x3, _x4) {
  return _visitFunction.apply(this, arguments);
}
function _visitFunction() {
  _visitFunction = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (env, nodeGenerics, nodeParams, nodeRetType) {
    env.enterScope();
    const genericsStr = [];
    if (nodeGenerics) {
      const seen = new Set();
      for (const generic of nodeGenerics) {
        // TODO: Handle default, constraint, etc
        const e = yield env.withChildData({
          resolveIdentifier: false
        }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(generic.name, env);
        }));
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(e.identifier, "identifier is undefined");
        if (seen.has(e.identifier)) {
          throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Duplicate generic '${e.identifier}'`, generic);
        }
        seen.add(e.identifier);
        genericsStr.push(e.identifier);
        env.addType(e.identifier, _types__WEBPACK_IMPORTED_MODULE_2__.GenericType.create(e.identifier, _types__WEBPACK_IMPORTED_MODULE_2__.UnknownType.create()));
      }
    }
    const params = [];
    for (const param of nodeParams) {
      const e = yield env.withChildData({
        resolveIdentifier: false
      }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(param.name, env);
      }));
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(e.identifier !== undefined, "identifier is undefined");
      const name = e.identifier;
      let pType;
      if (param.type) {
        pType = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(param.type, env);
      } else {
        pType = _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create();
      }
      params.push({
        name,
        pType,
        isGeneric: pType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.GenericType,
        isOptional: param.questionToken !== undefined
      });
    }
    let retType;
    let infer = false;
    if (nodeRetType) {
      retType = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(nodeRetType, env);
    } else {
      // Function return type will be inferred later on
      retType = _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create();
      infer = true;
    }
    env.leaveScope();
    return {
      fType: _types__WEBPACK_IMPORTED_MODULE_2__.FunctionType.create(params, retType, genericsStr),
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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ 6435);



function visitBinaryOperatorToken(node, env, isAssignment) {
  const left = env.getData("left", true);
  if (isAssignment && !left.isMutable) {
    if (left.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType) {
      throw new ___WEBPACK_IMPORTED_MODULE_0__.TypecheckingFailure("The left-hand side of an assignment expression must be a variable or a property access", node);
    } else {
      throw new ___WEBPACK_IMPORTED_MODULE_0__.TypecheckingFailure("Cannot assign to a constant", node);
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
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.xor)(leftType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType, right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType)) {
    throw new ___WEBPACK_IMPORTED_MODULE_0__.TypecheckingFailure("Cannot convert BigInt to Number", node);
  } else if (leftType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType && right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType) {
    return {
      eType: _types__WEBPACK_IMPORTED_MODULE_1__.BigIntType.create()
    };
  } else {
    return {
      eType: _types__WEBPACK_IMPORTED_MODULE_1__.NumberType.create()
    };
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
var Bool3 = /*#__PURE__*/function (Bool3) {
  Bool3[Bool3["No"] = 0] = "No";
  Bool3[Bool3["Sometimes"] = 1] = "Sometimes";
  Bool3[Bool3["Yes"] = 2] = "Yes";
  return Bool3;
}(Bool3 || {});
(function (Bool3) {
  /**
   * Expected behavior:
   *
   * <table>
   * 	<tr>
   * 		<th></th>
   * 		<th>Y</th>
   * 		<th>S</th>
   * 		<th>N</th>
   * 	</tr>
   * 	<tr>
   * 		<th>Y</th>
   * 		<td>Y</td>
   * 		<td>S</td>
   * 		<td>S</td>
   * 	</tr>
   * 	<tr>
   * 		<th>S</th>
   * 		<td>S</td>
   * 		<td>S</td>
   * 		<td>S</td>
   * 	</tr>
   * 	<tr>
   * 		<th>N</th>
   * 		<td>S</td>
   * 		<td>S</td>
   * 		<td>N</td>
   * 	</tr>
   * </table>
   */
  function both(a, b) {
    return a === b ? a : Bool3.Sometimes;
  }
  Bool3.both = both;
  function max(a, b) {
    return Math.max(a, b);
  }
  Bool3.max = max;
  function min(a, b) {
    return Math.min(a, b);
  }
  Bool3.min = min;
})(Bool3 || (Bool3 = {}));

/***/ })

}]);