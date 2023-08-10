"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[5593],{

/***/ 5593:
/*!******************************************************************!*\
  !*** ../src/typechecker/visitor/statement/IfStatementVisitor.ts ***!
  \******************************************************************/
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
    // All kind of expressions are either truthy or falsy
    yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.expression, env);
    if (node.thenStatement.kind === (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).VariableStatement) {
      /*
      Avoid the following illegal code:
      ```ts
      if (condition)
          let i = 0;
      ```
       */
      throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Declarations can only be declared inside a block", node.thenStatement);
    }
    env.enterScope();
    const thenBlock = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.thenStatement, env);
    env.leaveScope();
    if (!node.elseStatement) {
      return {
        returningStatement: thenBlock.returningStatement === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.No ? _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.No : _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Sometimes,
        inferredType: thenBlock.inferredType
      };
    }
    env.enterScope();
    const elseBlock = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.elseStatement, env);
    env.leaveScope();
    return {
      returningStatement: _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.both(thenBlock.returningStatement, elseBlock.returningStatement),
      inferredType: _types__WEBPACK_IMPORTED_MODULE_3__.UnionType.create([thenBlock.inferredType, elseBlock.inferredType]).simplify()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);