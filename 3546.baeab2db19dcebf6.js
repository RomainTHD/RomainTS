"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[3546],{

/***/ 3546:
/*!*************************************************************!*\
  !*** ../src/typechecker/visitor/other/IdentifierVisitor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);



function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    // Note that `undefined` is also an identifier
    if (node.text.trim() === "") {
      // `x = ;`
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure("Expected an expression", node);
    }
    const isPropertyAccess = env.getData("isPropertyAccess", false);
    const resolveIdentifier = env.getData("resolveIdentifier", true) && !isPropertyAccess;
    if (!resolveIdentifier) {
      // `x = 0`: `x` is a LValue
      return node.text;
    } else {
      // `x + 0`: `x` is a RValue
      const value = env.lookup(node.text);
      if (!value) {
        if (isPropertyAccess) {
          return _types__WEBPACK_IMPORTED_MODULE_1__.UndefinedType.create();
        } else if (env.lookupType(node.text)) {
          throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Identifier '${node.text}' is a type but is incorrectly used as a value`, node);
        } else {
          throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
        }
      }
      return value.vType;
    }
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);