"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[400],{

/***/ 1400:
/*!*******************************************************************!*\
  !*** ../src/typechecker/visitor/type/PropertySignatureVisitor.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);



const visit = /*#__PURE__*/function () {
  var _ref = (0,C_WSL_romaints_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let mType;
    if (node.type) {
      mType = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.type, env);
    } else {
      mType = _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.get();
    }
    env.setValueSide(___WEBPACK_IMPORTED_MODULE_1__.ValueSide.LValue);
    let name = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    env.setValueSide(___WEBPACK_IMPORTED_MODULE_1__.ValueSide.RValue);
    return _types__WEBPACK_IMPORTED_MODULE_2__.ObjectType.get([{
      mType,
      name
    }]);
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);