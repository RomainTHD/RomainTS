"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[3319],{

/***/ 3319:
/*!****************************************************************!*\
  !*** ../src/typechecker/visitor/other/ArrowFunctionVisitor.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _shared_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/function */ 392);





var accept = ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept;
function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const {
      fType,
      infer
    } = yield (0,_shared_function__WEBPACK_IMPORTED_MODULE_4__.visitFunction)(env, node.parameters, node.type);
    env.enterScope();
    env.pushReturnType(fType.retType);
    for (const param of fType.params) {
      env.add(param.name, {
        vType: param.pType,
        isLocal: true,
        isMutable: true
      });
    }
    const retData = yield accept(node.body, env);
    if (retData.doesReturn !== _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.True && ![_types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create(), _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create(), _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create()].some(t => t.equals(fType.retType))) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Arrow function must return a value of type '${fType.retType}'`, node);
    }
    env.popReturnType();
    env.exitScope();
    if (infer && fType.retType.equals(_types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create()) && retData.inferredType) {
      fType.retType = retData.inferredType;
    }
    return fType;
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);