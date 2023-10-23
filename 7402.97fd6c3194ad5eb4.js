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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _utils_Logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/Logger */ 2675);




const logger = _utils_Logger__WEBPACK_IMPORTED_MODULE_3__.LoggerFactory.create("EqualsTokenVisitor");
function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const left = env.getData("left", true);
    const right = env.getData("right", true);
    if (!left.identifier) {
      // `0 = ...;`
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("The left-hand side of an assignment expression must be a variable or a property access", node);
    }
    const variable = env.lookup(left.identifier);
    if (variable) {
      if (variable.builtin) {
        if (env.config.strictMode) {
          throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Cannot assign to builtin '${left.identifier}'`, node);
        } else {
          logger.warn(`Suspicious assignment to builtin '${left.identifier}'`);
        }
      } else if (!variable.isMutable) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Cannot assign to constant '${left.identifier}'`, node);
      } else if (!variable.vType.contains(right.eType)) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Type '${left.eType}' is not assignable to type '${variable.vType}'`, node);
      }
    } else {
      // `x = 0` where `x` is not declared. Valid in non-strict mode
      if (env.config.strictMode) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Variable ${left.identifier} not found`, node);
      } else {
        logger.warn(`Variable '${left.identifier}' not found, declaring it`);
        if (right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.LiteralType) {
          env.add(left.identifier, {
            vType: right.eType.literal.vType,
            isLocal: false,
            isMutable: true
          });
        } else {
          env.add(left.identifier, {
            vType: right.eType,
            isLocal: false,
            isMutable: true
          });
        }
      }
    }
    if (right.eType instanceof _types__WEBPACK_IMPORTED_MODULE_2__.LiteralType) {
      return {
        eType: right.eType.literal.vType
      };
    }
    return {
      eType: right.eType
    };
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);