"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[6100],{

/***/ 6100:
/*!**********************************************************************!*\
  !*** ../src/typechecker/visitor/statement/SwitchStatementVisitor.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);




const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    env.enterScope();
    const expr = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.expression, env);
    const all = _types__WEBPACK_IMPORTED_MODULE_2__.UnionType.create();
    let doesReturn = null;
    for (const stmt of node.caseBlock.clauses) {
      const clause = yield env.withChildData({
        switchExprType: expr.eType,
        allowBreak: true
      }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(stmt, env);
      }));
      all.add(clause.inferredType);
      if (doesReturn === null) {
        doesReturn = clause.returningStatement;
      } else {
        doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.both(doesReturn, clause.returningStatement);
      }
    }
    return {
      returningStatement: doesReturn ?? _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.No,
      inferredType: all.size === 0 ? _types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create() : all.simplify()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);