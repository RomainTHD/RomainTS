"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[7402],{

/***/ 7402:
/*!**************************************************************!*\
  !*** ../src/typechecker/visitor/token/EqualsTokenVisitor.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);
/* harmony import */ var _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../TypecheckingFailure */ 3725);




const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_2__.LoggerFactory.create("EqualsTokenVisitor");
function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const left = env.getData("left");
    const right = env.getData("right");
    if (typeof left !== "string") {
      // `0 = ...;`
      // FIXME: Use a cleaner way to check if `left` is a LValue or a RValue
      throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure("The left-hand side of an assignment expression must be a variable or a property access", node);
    }
    const variable = env.lookup(left);
    if (variable) {
      if (variable.builtin) {
        if (env.config.strictMode) {
          throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure(`Cannot assign to builtin '${left}'`, node);
        } else {
          logger.warn(`Suspicious assignment to builtin '${left}'`);
        }
      } else if (!variable.isMutable) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure(`Cannot assign to constant '${left}'`, node);
      } else if (!variable.vType.contains(right)) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure(`Type '${right}' is not assignable to type '${variable.vType}'`, node);
      }
    } else {
      // `x = 0` where `x` is not declared. Valid in non-strict mode
      if (env.config.strictMode) {
        throw new _TypecheckingFailure__WEBPACK_IMPORTED_MODULE_3__.TypecheckingFailure(`Variable ${left} not found`, node);
      } else {
        logger.warn(`Variable '${left}' not found, declaring it`);
        if (right instanceof _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType) {
          env.add(left, {
            vType: right.literal.vType,
            isLocal: false,
            isMutable: true
          });
        } else {
          env.add(left, {
            vType: right,
            isLocal: false,
            isMutable: true
          });
        }
      }
    }
    if (right instanceof _types__WEBPACK_IMPORTED_MODULE_1__.LiteralType) {
      return right.literal.vType;
    }
    return right;
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);