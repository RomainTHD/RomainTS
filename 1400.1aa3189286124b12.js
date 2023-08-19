"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[1400],{

/***/ 1400:
/*!*******************************************************************!*\
  !*** ../src/typechecker/visitor/type/PropertySignatureVisitor.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils */ 6435);




const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    let pType;
    if (node.type) {
      pType = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.type, env);
    } else {
      pType = _types__WEBPACK_IMPORTED_MODULE_2__.AnyType.create();
    }
    const e = yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.name, env);
    }));
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.assert)(e.identifier !== undefined, "identifier is undefined");
    const name = e.identifier;
    return {
      name,
      pType
    };
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);