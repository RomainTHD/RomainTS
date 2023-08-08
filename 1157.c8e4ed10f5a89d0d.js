"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1157],{

/***/ 1157:
/*!*******************************************************************!*\
  !*** ../src/typechecker/visitor/statement/TryStatementVisitor.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);





const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    if (!node.catchClause && !node.finallyBlock || node.finallyBlock && (node.finallyBlock.flags & (typescript__WEBPACK_IMPORTED_MODULE_1___default().NodeFlags).ThisNodeHasError) !== 0) {
      throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Try statement must have either a catch clause or a finally block", node);
    }
    let all = {
      doesReturn: _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.No,
      inferredType: _types__WEBPACK_IMPORTED_MODULE_3__.UnionType.create([])
    };
    env.enterScope();
    const tryRet = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.tryBlock, env);
    env.leaveScope();
    all.doesReturn = tryRet.returningStatement;
    all.inferredType.add(tryRet.inferredType);
    if (node.catchClause) {
      env.enterScope();
      const catchRet = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.catchClause, env);
      env.leaveScope();
      all.doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.both(all.doesReturn, catchRet.returningStatement);
      all.inferredType.add(catchRet.inferredType);
    }
    if (node.finallyBlock) {
      /*
      FIXME: Not sure about the behavior of finally blocks with returns. For example, what should this code return?
      ```ts
      function foo(): number {
          try {
              return 1;
          } catch {
              return 2;
          }
          finally {
              return 3;
          }
      }
      ```
       */
      env.enterScope();
      const finallyRet = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.finallyBlock, env);
      env.leaveScope();
      all.doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.both(all.doesReturn, finallyRet.returningStatement);
      all.inferredType.add(finallyRet.inferredType);
    }
    return {
      returningStatement: all.doesReturn,
      inferredType: all.inferredType.types.length === 0 ? _types__WEBPACK_IMPORTED_MODULE_3__.VoidType.create() : all.inferredType.simplify()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);