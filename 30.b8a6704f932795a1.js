"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[30],{

/***/ 2011:
/*!************************************************************!*\
  !*** ../src/typechecker/visitor/statement/BlockVisitor.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/Bool3 */ 3738);





const visit = /*#__PURE__*/function () {
  var _ref = (0,C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.False;
    let inferredType = _types__WEBPACK_IMPORTED_MODULE_2__.UnionType.get([]);
    for (const stmt of node.statements) {
      const res = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(stmt, env);
      (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(res !== undefined, "Statement return is undefined");
      if (!env.config.allowUnreachableCode && doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.True) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("Unreachable code detected", stmt);
      }
      if (res.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.True) {
        doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.True;
        if (res.inferredType !== null) {
          inferredType.add(res.inferredType);
        }
        // We coud just return here since we know that the rest of the statements are unreachable
      } else if (doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.False && res.doesReturn === _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Maybe) {
        doesReturn = _utils_Bool3__WEBPACK_IMPORTED_MODULE_4__.Bool3.Maybe;
        if (res.inferredType !== null) {
          inferredType.add(res.inferredType);
        }
      }
    }
    return {
      doesReturn,
      inferredType: inferredType.types.length === 0 ? null : inferredType.simplify()
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);