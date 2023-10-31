"use strict";
(self["webpackChunkromaints"] = self["webpackChunkromaints"] || []).push([[4873],{

/***/ 4873:
/*!************************************************************************!*\
  !*** ../src/typechecker/visitor/declaration/EnumDeclarationVisitor.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visit: () => (/* binding */ visit)
/* harmony export */ });
/* harmony import */ var _home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typescript */ 6674);
/* harmony import */ var typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ 2429);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../types */ 2122);
/* harmony import */ var _types_EnumType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../types/EnumType */ 3707);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils */ 6435);
/* harmony import */ var _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/IllegalStateException */ 7430);
/* harmony import */ var _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/NotImplementedException */ 7971);








function visit(_x, _x2) {
  return _visit.apply(this, arguments);
}
function _visit() {
  _visit = (0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (node, env) {
    const name = (yield env.withChildData({
      resolveIdentifier: false
    }, /*#__PURE__*/(0,_home_runner_work_RomainTS_RomainTS_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(node.name, env);
    }))).identifier;
    (0,_utils__WEBPACK_IMPORTED_MODULE_5__.assert)(name, "name is unset");
    let exported = false;
    if (node.modifiers) {
      for (const mod of node.modifiers) {
        if (mod.kind === (typescript__WEBPACK_IMPORTED_MODULE_1___default().SyntaxKind).ExportKeyword) {
          exported = true;
        } else {
          throw new _utils_NotImplementedException__WEBPACK_IMPORTED_MODULE_7__.NotImplementedException();
        }
      }
    }
    let next = 0;
    const idSeen = new Set();
    const members = [];
    for (const member of node.members) {
      const m = yield ___WEBPACK_IMPORTED_MODULE_2__.TypeChecker.accept(member, env);
      (0,_utils__WEBPACK_IMPORTED_MODULE_5__.assert)(m.identifier, "identifier is unset");
      if (idSeen.has(m.identifier)) {
        throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Duplicate enum member '${m.identifier}'`, member);
      }
      let t;
      if (m.eType instanceof _types__WEBPACK_IMPORTED_MODULE_3__.UndefinedType) {
        if (next === null) {
          throw new ___WEBPACK_IMPORTED_MODULE_2__.TypecheckingFailure(`Enum member '${m.identifier}' must have an initializer`, member);
        }
        t = _types__WEBPACK_IMPORTED_MODULE_3__.LiteralType.create({
          vType: _types__WEBPACK_IMPORTED_MODULE_3__.NumberType.create(),
          value: next
        });
        next++;
      } else {
        if (!(m.eType instanceof _types__WEBPACK_IMPORTED_MODULE_3__.LiteralType)) {
          throw new _utils_IllegalStateException__WEBPACK_IMPORTED_MODULE_6__.IllegalStateException("Enum member must be a literal");
        }
        t = m.eType;
        if (m.eType.literal.vType instanceof _types__WEBPACK_IMPORTED_MODULE_3__.NumberType) {
          next = m.eType.literal.value + 1;
        } else if (m.eType.literal.vType instanceof _types__WEBPACK_IMPORTED_MODULE_3__.StringType) {
          next = null;
        }
      }
      members.push({
        name: m.identifier,
        pType: t
      });
      idSeen.add(m.identifier);
    }
    const enumType = _types_EnumType__WEBPACK_IMPORTED_MODULE_4__.EnumType.create(name, members);
    env.add(name, {
      vType: enumType,
      isMutable: false,
      isLocal: false,
      isFromCurrentScope: false
    });
    env.addType(name, enumType, exported);
  });
  return _visit.apply(this, arguments);
}

/***/ }),

/***/ 3707:
/*!********************************!*\
  !*** ../src/types/EnumType.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnumType: () => (/* binding */ EnumType)
/* harmony export */ });
/* harmony import */ var _PropertyAccessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropertyAccessor */ 9371);
/* harmony import */ var _UnionType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UnionType */ 6119);


class EnumType extends _PropertyAccessor__WEBPACK_IMPORTED_MODULE_0__.PropertyAccessor {
  name;
  backedType;
  constructor(name, properties) {
    super(properties);
    this.name = name;
    this.backedType = _UnionType__WEBPACK_IMPORTED_MODULE_1__.UnionType.create(properties.map(p => p.pType)).simplify();
  }
  equals(other) {
    if (!(other instanceof EnumType)) {
      return false;
    }
    return this.name === other.name;
  }
  contains(other) {
    return this.backedType.contains(other);
  }
  generalize() {
    return this;
  }
  getBuiltins() {
    return [];
  }
  toString() {
    const members = this.ownProperties.map(member => `${member.name}: ${member.pType.toString()}`).join(", ");
    return `enum ${this.name} { ${members}}`;
  }
  static create(name, properties) {
    return new EnumType(name, properties);
  }
}

/***/ })

}]);