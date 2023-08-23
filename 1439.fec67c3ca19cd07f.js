"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1439],{

/***/ 9579:
/*!************************************!*\
  !*** ../src/interpreter/accept.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Interpreter: () => (/* binding */ Interpreter)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ 9833);
/* harmony import */ var _utils_ASTHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/ASTHelper */ 4813);
/* harmony import */ var _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/IllegalStateException */ 7430);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Logger */ 2675);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/NotImplementedException */ 7971);






var Interpreter;
(function (Interpreter) {
  const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_4__.LoggerFactory.create("Interpreter");
  function accept(_x, _x2) {
    return _accept.apply(this, arguments);
  }
  function _accept() {
    _accept = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
      return yield (0,_utils_ASTHelper__WEBPACK_IMPORTED_MODULE_2__.baseAccept)(node, env, logger);
    });
    return _accept.apply(this, arguments);
  }
  Interpreter.accept = accept;
  function interpret(_x3) {
    return _interpret.apply(this, arguments);
  }
  function _interpret() {
    _interpret = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (root) {
      const env = ___WEBPACK_IMPORTED_MODULE_1__.Env.create();
      try {
        yield accept(root, env);
        return true;
      } catch (e) {
        if (e instanceof _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_3__.IllegalStateException) {
          logger.error("Illegal state!");
          logger.error(e.stack);
        } else if (e instanceof _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_5__.NotImplementedException) {
          logger.error("Not implemented, at:");
          logger.error(e.stack);
        } else if (e instanceof Error) {
          throw new _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_3__.IllegalStateException(`Unknown error: ${e} ${e.stack}`);
        } else {
          throw new _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_3__.IllegalStateException(`Unknown error: ${e}`);
        }
        return false;
      }
    });
    return _interpret.apply(this, arguments);
  }
  Interpreter.interpret = interpret;
})(Interpreter || (Interpreter = {}));

/***/ }),

/***/ 5289:
/*!********************************************!*\
  !*** ../src/interpreter/envInterpreter.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnvInterpreter: () => (/* binding */ EnvInterpreter)
/* harmony export */ });
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env */ 4287);

class EnvInterpreter extends _env__WEBPACK_IMPORTED_MODULE_0__.BaseEnv {
  constructor(config) {
    super(config, _env__WEBPACK_IMPORTED_MODULE_0__.Stage.Interpreter);
  }
  static create(config) {
    return new EnvInterpreter({
      allowUnreachableCode: config?.allowUnreachableCode ?? true,
      noImplicitAny: config?.noImplicitAny ?? false,
      strictMode: config?.strictMode ?? false
    });
  }
  valueToString(value) {
    return "(TODO)";
  }
}

/***/ }),

/***/ 9833:
/*!***********************************!*\
  !*** ../src/interpreter/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Env: () => (/* reexport safe */ _envInterpreter__WEBPACK_IMPORTED_MODULE_0__.EnvInterpreter),
/* harmony export */   EnvInterpreter: () => (/* reexport safe */ _envInterpreter__WEBPACK_IMPORTED_MODULE_0__.EnvInterpreter),
/* harmony export */   Interpreter: () => (/* reexport safe */ _accept__WEBPACK_IMPORTED_MODULE_1__.Interpreter)
/* harmony export */ });
/* harmony import */ var _envInterpreter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./envInterpreter */ 5289);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accept */ 9579);





/***/ }),

/***/ 1439:
/*!*************************************************************!*\
  !*** ../src/interpreter/visitor/other/SourceFileVisitor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 9833);


function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    for (const [i, stmt] of node.statements.entries()) {
      yield env.withChildData({
        isFirstStatement: i === 0
      }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield ___WEBPACK_IMPORTED_MODULE_1__.Interpreter.accept(stmt, env);
      }));
    }
    env.print();
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);