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
/* harmony import */ var D_GDrive_Programmation_TypeScript_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../accept */ 3630);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);





const visit = /*#__PURE__*/function () {
  var _ref = (0,D_GDrive_Programmation_TypeScript_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let t;
    if (node.expression) {
      t = yield _accept__WEBPACK_IMPORTED_MODULE_3__.TypeChecker.accept(node.expression, env);
    } else {
      t = _types__WEBPACK_IMPORTED_MODULE_1__.VoidType.create();
    }
    const retType = env.getReturnType();
    if (!retType) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__.TypecheckingFailure("Cannot return outside of a function", node);
    }
    if (!retType.contains(t)) {
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_4__.TypecheckingFailure(`Cannot return type '${t}' from function with return type '${retType}'`, node);
    }
    return {
      doesReturn: _utils_Bool3__WEBPACK_IMPORTED_MODULE_2__.Bool3.True,
      inferredType: t
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);