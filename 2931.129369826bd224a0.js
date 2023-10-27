"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2931],{

/***/ 6144:
/*!**************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/FunctionExpressionVisitor.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);
/* harmony import */ var _shared_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/function */ 392);






const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_4__.LoggerFactory.create("FunctionExpressionVisitor");
function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const {
      fType,
      infer
    } = yield (0,_shared_function__WEBPACK_IMPORTED_MODULE_5__.visitFunction)(node, env);
    env.enterScope();
    env.pushReturnType(fType.retType);
    // FIXME: Wrong signature
    env.add("this", {
      vType: fType,
      isLocal: true,
      isMutable: true
    });
    env.add("arguments", {
      vType: _types__WEBPACK_IMPORTED_MODULE_2__.ArrayType.create(_types__WEBPACK_IMPORTED_MODULE_2__.NumberType.create()),
      isLocal: true,
      isMutable: true
    });
    const paramsAlreadyDeclared = new Set();
    for (const param of fType.params) {
      if (paramsAlreadyDeclared.has(param.name)) {
        if (env.config.strictMode) {
          throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Duplicate parameter '${param.name}'`, node);
        } else {
          logger.warn(`Duplicate parameter '${param.name}'`);
        }
      }
      env.add(param.name, {
        vType: param.pType,
        isLocal: true,
        isMutable: true
      });
      paramsAlreadyDeclared.add(param.name);
    }
    const retData = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.body, env);
    if (retData.returningStatement !== _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.Yes && ![_types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create(), _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create(), _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create()].some(t => t.equals(fType.retType))) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Function must return a value of type '${fType.retType}'`, node);
    }
    env.popReturnType();
    env.leaveScope();
    if (infer && fType.retType.equals(_types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create()) && retData.inferredType) {
      fType.retType = retData.inferredType.generalize();
    }
    return {
      eType: fType
    };
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);