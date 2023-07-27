"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1253],{

/***/ 1253:
/*!****************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/FunctionDeclarationVisitor.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);
/* harmony import */ var _shared_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/function */ 392);






function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (!node.name) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_4__.NotImplementedException("Anonymous functions aren't supported yet");
    }
    const name = yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    }));
    const {
      fType,
      infer
    } = yield (0,_shared_function__WEBPACK_IMPORTED_MODULE_5__.visitFunction)(env, node.parameters, node.type);
    if (!node.body) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_4__.NotImplementedException("Functions without body aren't supported yet");
    }
    env.add(name, {
      vType: fType,
      isLocal: false,
      isMutable: true
    });
    env.enterScope();
    env.pushReturnType(fType.retType);
    // FIXME: Wrong signature
    env.add("this", {
      vType: fType,
      isLocal: true,
      isMutable: true
    });
    for (const param of fType.params) {
      env.add(param.name, {
        vType: param.pType,
        isLocal: true,
        isMutable: true
      });
    }
    const retData = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.body, env);
    if (retData.doesReturn !== _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.True && ![_types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create(), _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create(), _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create()].some(t => t.equals(fType.retType))) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Function '${name}' must return a value of type '${fType.retType}'`, node);
    }
    env.popReturnType();
    env.leaveScope();
    if (infer && fType.retType.equals(_types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create())) {
      let inferredType = retData.inferredType;
      if (inferredType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.LiteralType) {
        /*
        For some reason, TypeScript infers
        ```
        function f() {
            return 0;
        }
        ```
        to be of type `() => number` instead of `() => 0`, which would be more precise
         */
        inferredType = inferredType.literal.vType;
      }
      if (retData.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.False) {
        fType.retType = _types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create();
      } else if (retData.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.Sometimes) {
        fType.retType = _types__WEBPACK_IMPORTED_MODULE_2__.UnionType.create([inferredType, _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create()]).simplify();
      } else {
        fType.retType = inferredType;
      }
    }
    return fType;
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);