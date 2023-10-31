"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9520],{

/***/ 9520:
/*!**********************************************************************!*\
  !*** ../src/typechecker/visitor/statement/ReturnStatementVisitor.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);





const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let t;
    if (node.expression) {
      t = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.expression, env);
    } else {
      t = {
        eType: _types__WEBPACK_IMPORTED_MODULE_2__.VoidType.create()
      };
    }
    const retType = env.getReturnType();
    if (!retType) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("Cannot return outside of a function", node);
    }
    if (!retType.contains(t.eType)) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Cannot return type '${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringify)(t)}' from function with return type '${retType}'`, node);
    }
    return {
      returningStatement: _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Yes,
      inferredType: t.eType
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);