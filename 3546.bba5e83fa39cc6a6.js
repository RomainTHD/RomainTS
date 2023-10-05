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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);



function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    // Note that `undefined` is also an identifier
    if (node.text.trim() === "") {
      // `x = ;`
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("Expected an expression", node);
    }
    const isPropertyAccess = env.getData("isPropertyAccess", true, false);
    const resolveIdentifier = env.getData("resolveIdentifier", true, true) && !isPropertyAccess;
    let t;
    let isMutable;
    const value = env.lookup(node.text);
    if (!resolveIdentifier) {
      // `x = 0`, where `x` is a LValue
      t = _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create();
      if (value) {
        isMutable = value.isMutable;
      }
    } else if (value) {
      // The identifier exists in the scope
      t = value.vType;
    } else if (isPropertyAccess) {
      // `x.y`, where `y` doesn't exist in `x`
      t = _types__WEBPACK_IMPORTED_MODULE_2__.UndefinedType.create();
    } else if (env.lookupType(node.text)) {
      // `I + 0`, where `I` is a type
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Identifier '${node.text}' is a type but is incorrectly used as a value`, node);
    } else {
      // `x + 0`, where `x` doesn't exist
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
    }
    return {
      eType: t,
      isFromVariable: true,
      isMutable,
      identifier: node.text
    };
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);