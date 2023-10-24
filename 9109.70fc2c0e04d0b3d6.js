"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[9109],{

/***/ 9109:
/*!**************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/ImportDeclarationVisitor.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);




function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const mod = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.moduleSpecifier, env);
    if (mod.isFromVariable) {
      throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure("Cannot import from a variable", node.moduleSpecifier);
    }
    const exports = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.typecheckFile(mod.eType.literal.value, {
      ...env.config,
      isRoot: false
    }, node.moduleSpecifier);
    if (!node.importClause) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__.NotImplementedException();
    }
    const typesToImport = yield ___WEBPACK_IMPORTED_MODULE_1__.TypeChecker.accept(node.importClause, env);
    typesToImport.forEach(imported => {
      if (!exports.has(imported)) {
        throw new ___WEBPACK_IMPORTED_MODULE_1__.TypecheckingFailure(`Cannot import non-exported type '${imported}', allowed imports are '${(0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayToString)([...exports.keys()])}'`, node.importClause);
      }
    });
    [...exports.entries()].forEach(([name, exported]) => {
      if (typesToImport.includes(name)) {
        if (exported.typeOnly) {
          env.addType(name, exported.eType);
        } else {
          env.add(name, {
            vType: exported.eType,
            isLocal: false,
            isMutable: false
          });
        }
      }
    });
    if (node.modifiers) {
      throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_3__.NotImplementedException();
    }
  });
  return _visit.apply(this, arguments);
}

/***/ })

}]);