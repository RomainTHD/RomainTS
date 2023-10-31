"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2656],{

/***/ 2656:
/*!*************************************************************!*\
  !*** ../src/typechecker/visitor/other/EnumMemberVisitor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);




function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const name = (yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    }))).identifier;
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(name, "name is unset");
    let t = _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create();
    if (node.initializer) {
      t = (yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.initializer, env)).eType;
      const e = new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Enum member must be a number or a string, found '${t}'`, node.initializer);
      if (!(t instanceof _types__WEBPACK_IMPORTED_MODULE_2__.LiteralType)) {
        throw e;
      }
      if (!(t.literal.vType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.NumberType) && !(t.literal.vType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.StringType)) {
        throw e;
      }
    }
    return {
      identifier: name,
      eType: t
    };
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);