"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[2982],{

/***/ 2982:
/*!************************************************************************!*\
  !*** ../src/typechecker/visitor/expression/TypeOfExpressionVisitor.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _accept__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../accept */ 3630);



const visit = /*#__PURE__*/function () {
  var _ref = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    yield _accept__WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.expression, env);
    return _types__WEBPACK_IMPORTED_MODULE_1__.UnionType.create([_types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "string"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "number"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "bigint"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "boolean"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "symbol"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "undefined"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "object"
    }), _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType.create({
      vType: _types__WEBPACK_IMPORTED_MODULE_1__.StringType.create(),
      value: "function"
    })]);
  });
  return function visit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);