"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2995],{

/***/ 2995:
/*!*********************************************************************!*\
  !*** ../src/typechecker/visitor/statement/ForOfStatementVisitor.ts ***!
  \*********************************************************************/
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
    const e = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.expression, env);
    if (!(e.eType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.ArrayType)) {
      // FIXME: Will break for `number[] | string[]`
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Type '${e.eType.toString()}' is not iterable`, node.expression);
    }
    yield env.withChildData({
      varDeclType: e.eType.baseType
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.initializer, env);
    }));
    const res = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.statement, env);
    env.leaveScope();
    return {
      returningStatement: _utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.min(_utils_Bool3__WEBPACK_IMPORTED_MODULE_3__.Bool3.Sometimes, res.returningStatement),
      inferredType: res.inferredType
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);