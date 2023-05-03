"use strict";
(self["webpackChunkthree_default"] = self["webpackChunkthree_default"] || []).push([[485],{

/***/ 9051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7187);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6073);
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Component = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Component, _EventEmitter);
  var _super = _createSuper(Component);
  function Component(_ref) {
    var _this;
    var element = _ref.element,
      elements = _ref.elements;
    _classCallCheck(this, Component);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "addChildren", function (data, addTo) {
      return lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(data, function (entry, key) {
        // ❔ is existing element -> add element
        if (entry instanceof window.HTMLElement || entry instanceof window.NodeList) {
          addTo[key] = entry;
        } else if (Array.isArray(entry)) {
          // ❔ is Array -> addChildren (recursion)

          var folder = _this.findParentArray(entry, data); // (parent, child)
          addTo[folder] = {};
          _this.addChildren(entry, addTo[folder]);
          return;
        } else {
          // ❔ is String -> querySelect elements
          if (typeof entry === 'string') addTo[key] = _this.element ? _this.element.querySelectorAll(entry) : document.querySelectorAll(entry);

          // ❔ is Object -> addChildren -> recursion
          if (_typeof(entry) === 'object') {
            var _folder = _this.findParent(data, entry).toString(); // (parent, child)

            addTo[_folder] = {};
            _this.addChildren(entry, addTo[_folder]);
            return;
          }
          if (addTo[key].length === 0) {
            // If entry doesn't exist (the NodeList is empty) we set it to null
            addTo[key] = null;
          } else if (addTo[key].length === 1) {
            // If the returned NodeList contains only 1 element, we querySelector that element
            addTo[key] = _this.element ? _this.element.querySelector(entry) : document.querySelector(entry);
          }
        }
      });
    });
    _this.selector = element;
    _this.selectorChildren = _objectSpread({}, elements);
    _this.createComponent();
    _this.create();
    // this.addEventListeners();
    return _this;
  }
  _createClass(Component, [{
    key: "createComponent",
    value: function createComponent() {
      if (this.selector instanceof window.HTMLElement) {
        this.element = this.selector;
      } else {
        var _document$querySelect;
        this.element = (_document$querySelect = document.querySelector(this.selector)) !== null && _document$querySelect !== void 0 ? _document$querySelect : null;
      }
      this.elements = {};
      this.addChildren(this.selectorChildren, this.elements);
    }
  }, {
    key: "create",
    value: function create() {}

    // finds the parent object name
  }, {
    key: "findParent",
    value: function findParent(obj, parent) {
      for (var key in obj) {
        if (_typeof(obj[key]) === 'object') {
          if (obj[key] === parent) {
            return key;
          } else {
            var result = this.findParent(obj[key], parent);
            if (result) {
              return key + '.' + result;
            }
          }
        }
      }
      return null;
    }

    // finds the parent object name (but for array)
  }, {
    key: "findParentArray",
    value: function findParentArray(arr) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      for (var key in parent) {
        var item = parent[key];
        if (Array.isArray(item) && item === arr) {
          return key;
        }
      }
      return null;
    }

    // when adding elements, always parses the "this.element". if it doesn't exist, then parses the entire document tree trying to find and query select elements. O(1) when ideal; O(n) when deeply nested;
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {}
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {}
  }]);
  return Component;
}((events__WEBPACK_IMPORTED_MODULE_0___default()));


/***/ }),

/***/ 1743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Experience)
});

// EXTERNAL MODULE: ./node_modules/three/build/three.module.js
var three_module = __webpack_require__(9477);
// EXTERNAL MODULE: ./node_modules/gsap/index.js + 2 modules
var gsap = __webpack_require__(6358);
// EXTERNAL MODULE: ./app/classes/Component.js
var Component = __webpack_require__(9051);
;// CONCATENATED MODULE: ./app/classes/Canvas.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Three


var Canvas = /*#__PURE__*/function (_Component) {
  _inherits(Canvas, _Component);
  var _super = _createSuper(Canvas);
  function Canvas(el) {
    var _this;
    _classCallCheck(this, Canvas);
    _this = _super.call(this, {
      element: el
    });
    _defineProperty(_assertThisInitialized(_this), "destroy", function () {
      // Traverse scene
      _this.scene.traverse(function (child) {
        if (child instanceof three_module/* Mesh */.Kj0) {
          child.geometry.dispose();
          for (var key in child.material) {
            var value = child.material[key];
            if (value && typeof value.dispose === 'function') {
              value.dispose();
            }
          }
        }
      });

      // Controls
      if (_this.camera.controls) _this.camera.controls.dispose();
      _this.renderer.dispose();
    });
    _this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    _this.sizes.aspect = _this.sizes.width / _this.sizes.height;
    _this.createScene();
    _this.createRenderer();
    return _this;
  }

  /**
   * Camera & Scene
   */
  _createClass(Canvas, [{
    key: "createScene",
    value: function createScene() {
      this.scene = new three_module/* Scene */.xsS();
    }
  }, {
    key: "createRenderer",
    value: function createRenderer() {
      this.renderer = new three_module/* WebGLRenderer */.CP7({
        canvas: this.element,
        alpha: true
      });

      // this.renderer.setClearColor(0xf1f1f1);
      // this.renderer.setClearColor(0x050505);

      this.renderer.outputEncoding = three_module/* LinearEncoding */.rnI;
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }, {
    key: "onResize",
    value: function onResize() {
      console.log('canvas');
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;
      this.sizes.aspect = this.sizes.width / this.sizes.height;
    }
  }]);
  return Canvas;
}(Component/* default */.Z);

;// CONCATENATED MODULE: ./app/utils/threeCover.js
// Function is used to get the aspect ratio of the texture.
// It returns an { x: Number, y: Number } object, which can be used on UVs to map the texture
// Similar to what object-fit: cover does in CSS, but for GLSL shaders

var threeCover = function threeCover(texture, aspect) {
  var imageAspect = texture.image.width / texture.image.height;
  if (imageAspect > aspect) {
    return {
      x: imageAspect / aspect,
      y: 1
    };
  } else {
    return {
      x: 1,
      y: aspect / imageAspect
    };
  }
};
;// CONCATENATED MODULE: ./shared/shaders/image.vert
/* harmony default export */ const shaders_image = ("// varying vec2 vUv;\r\n// uniform vec2 uOffset;\r\n\r\n#define M_PI 3.1415926535897932384626433832795\r\n\r\n// vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {\r\n// \tposition.x = position.x + (sin(uv.y * M_PI) * offset.x);\r\n// \tposition.y = position.y + (sin(uv.x * M_PI) * offset.y);\r\n// \treturn position;\r\n// }\r\n\r\n// void main()\r\n// {\r\n// \t// vec4 modelPosition = modelMatrix * vec4(position, 1.0);\r\n// \t// vec4 viewPosition = viewMatrix * modelPosition;\r\n// \t// vec4 projectedPosition = projectionMatrix * viewPosition;\r\n\t\r\n// \t// gl_Position = projectedPosition;\r\n\r\n// \tvec3 newPosition = position;\r\n// \tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\r\n\r\n// \tvUv = uv;\r\n// }\r\n\r\nvarying vec2 vUv;\r\nuniform float uProgress;\r\nuniform vec2 uZoomScale;\r\n\r\nvoid main() {\r\n\tvUv = uv;\r\n\tvec3 pos = position;\r\n\tfloat angle = uProgress * M_PI / 2.;\r\n\tfloat wave = cos(angle);\r\n\tfloat c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;\r\n\tpos.x *= mix(1., uZoomScale.x + wave * c, uProgress);\r\n\tpos.y *= mix(1., uZoomScale.y + wave * c, uProgress);\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );\r\n}");
;// CONCATENATED MODULE: ./shared/shaders/image.frag
/* harmony default export */ const shared_shaders_image = ("uniform sampler2D uTexture;\r\nuniform vec2 uResolution; // 1, 1\r\nuniform vec2 uZoomScale; // 1, 1\r\nuniform vec2 uImageRes; // tex.source.data.width & height\r\n\r\nuniform vec2 uScale;\r\nuniform vec2 uOffset;\r\n\r\nvarying vec2 vUv;\r\n\r\nvec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {\r\n\tfloat r = texture2D(textureImage,uv + offset).r;\r\n\tvec2 gb = texture2D(textureImage,uv).gb;\r\n\treturn vec3(r,gb);\r\n}\r\n\r\n/*------------------------------\r\nBackground Cover UV\r\n--------------------------------\r\nu = basic UV\r\ns = screensize\r\ni = image size\r\n------------------------------*/\r\nvec2 CoverUV(vec2 u, vec2 s, vec2 i) {\r\n\tfloat rs = s.x / s.y; // Aspect screen size\r\n\tfloat ri = i.x / i.y; // Aspect image size\r\n\tvec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st\r\n\tvec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset\r\n\treturn u * s / st + o;\r\n}\r\n\r\nvoid main() {\r\n\tvec2 uv = CoverUV(vUv, uResolution, uImageRes);\r\n\t// vec3 tex = texture2D(uTexture, uv).rgb;\r\n\tvec3 color = rgbShift(uTexture, uv, uOffset);\r\n\tgl_FragColor = vec4( color, 1.0 );\r\n}\r\n\r\n// void main() {\r\n\r\n// \tfloat uvx, uvy;\r\n// \tif (uScale.x > uScale.y) {\r\n// \t\tuvx = vUv.x  / uScale.x;\r\n// \t\tuvy = vUv.y / uScale.y;\r\n// \t} else {\r\n// \t\tuvx = vUv.x / uScale.x;\r\n// \t\tuvy = vUv.y / uScale.y;\r\n// \t}\r\n\r\n// \tvec2 newuv = vec2(uvx, uvy);\r\n\r\n// \tvec3 color = rgbShift(uTexture, newuv, uOffset);\r\n// \t// vec4 image = texture2D(uTexture, newuv);\r\n\r\n// \tgl_FragColor = vec4(color, 1.0);\r\n// }");
;// CONCATENATED MODULE: ./app/components/Canvas/Elements.js
function Elements_typeof(obj) { "@babel/helpers - typeof"; return Elements_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Elements_typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Elements_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Elements_defineProperty(obj, key, value) { key = Elements_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Elements_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Elements_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Elements_toPropertyKey(descriptor.key), descriptor); } }
function Elements_createClass(Constructor, protoProps, staticProps) { if (protoProps) Elements_defineProperties(Constructor.prototype, protoProps); if (staticProps) Elements_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Elements_toPropertyKey(arg) { var key = Elements_toPrimitive(arg, "string"); return Elements_typeof(key) === "symbol" ? key : String(key); }
function Elements_toPrimitive(input, hint) { if (Elements_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Elements_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Three


// Utils


// Shaders


var Element = /*#__PURE__*/function () {
  function Element(_ref) {
    var scene = _ref.scene,
      sizes = _ref.sizes;
    Elements_classCallCheck(this, Element);
    this.textureLoader = new three_module/* TextureLoader */.dpR();
    this.scene = scene;
    this.sizes = sizes;
    this.meshes = [];
    this.uniforms = {
      uSpeed: {
        value: 0
      },
      uOffset: {
        value: new three_module/* Vector2 */.FM8(0.0, 0.0)
      }
    };
  }
  Elements_createClass(Element, [{
    key: "createMeshes",
    value: function createMeshes(imageBounds) {
      var _this = this;
      // Create a mesh for each image and add it to the scene
      var loadTexturesPromises = imageBounds.map(function (obj, index) {
        return new Promise(function (resolve) {
          _this.textureLoader.load(obj.src, function (texture) {
            var aspect = threeCover(texture, obj.bounds.width / obj.bounds.height);
            resolve({
              obj: obj,
              texture: texture,
              aspect: aspect,
              index: index
            });
          });
        });
      });
      Promise.all(loadTexturesPromises).then(function (loadedData) {
        loadedData.forEach(function (_ref2) {
          var obj = _ref2.obj,
            texture = _ref2.texture,
            aspect = _ref2.aspect,
            index = _ref2.index;
          // console.log('i: ' + index, texture, aspect);
          var material = new three_module/* ShaderMaterial */.jyz({
            uniforms: _objectSpread(_objectSpread({}, _this.uniforms), {}, {
              uProgress: {
                value: 0
              },
              // Texture
              uTexture: {
                value: texture
              },
              // Scale Res
              uScale: {
                value: aspect
              },
              uZoomScale: {
                value: new three_module/* Vector2 */.FM8(1.0, 1.0)
              },
              uResolution: {
                value: new three_module/* Vector2 */.FM8(1.0, 1.0)
              },
              // 1, 1
              uImageRes: {
                value: {
                  x: texture.source.data.width,
                  y: texture.source.data.height
                }
              }
            }),
            // wireframe: true,
            vertexShader: shaders_image,
            fragmentShader: shared_shaders_image
          });
          var geometry = new three_module/* PlaneGeometry */._12(obj.bounds.width, obj.bounds.height);
          var mesh = new three_module/* Mesh */.Kj0(geometry, material);
          var x = (obj.bounds.left + obj.bounds.right) / 2;
          var y = (obj.bounds.top + obj.bounds.bottom + window.scrollY * 2) / 2;
          _this.meshes.push(mesh);
          _this.scene.add(mesh);
          mesh.position.set(x - _this.sizes.width / 2, -y + _this.sizes.height / 2, -1);
        });
        if (_this.meshes.length === imageBounds.length) {
          _this.isReady = true;
          // Workaround to avoid lag, renders all objects at all times. Not the best performance
          _this.scene.traverse(function (obj) {
            return obj.frustumCulled = false;
          });
        } // fin
      });
    }
  }, {
    key: "updateMeshes",
    value: function updateMeshes(imageBounds) {
      var _this2 = this;
      this.meshes.map(function (mesh, i) {
        var x = (imageBounds[i].bounds.left + imageBounds[i].bounds.right) / 2;
        var y = (imageBounds[i].bounds.top + imageBounds[i].bounds.bottom + window.scrollY * 2) / 2;
        mesh.position.set(x - _this2.sizes.width / 2, -y + _this2.sizes.height / 2, -1);
      });
    }
  }]);
  return Element;
}();

;// CONCATENATED MODULE: ./app/components/Canvas/Camera.js
function Camera_typeof(obj) { "@babel/helpers - typeof"; return Camera_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Camera_typeof(obj); }
function Camera_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Camera_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Camera_toPropertyKey(descriptor.key), descriptor); } }
function Camera_createClass(Constructor, protoProps, staticProps) { if (protoProps) Camera_defineProperties(Constructor.prototype, protoProps); if (staticProps) Camera_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Camera_toPropertyKey(arg) { var key = Camera_toPrimitive(arg, "string"); return Camera_typeof(key) === "symbol" ? key : String(key); }
function Camera_toPrimitive(input, hint) { if (Camera_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Camera_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Three

var Camera = /*#__PURE__*/function () {
  function Camera(_ref) {
    var sizes = _ref.sizes;
    Camera_classCallCheck(this, Camera);
    this.instance = new three_module/* OrthographicCamera */.iKG(sizes.width / -2, sizes.width / 2, sizes.height / 2, sizes.height / -2, 1, 1000);

    // this.camera.fov = 2 * (180 / Math.PI) * Math.atan(planeSize / (2 * 1));
    this.instance.position.set(0, -window.scrollY, 10);
  }
  Camera_createClass(Camera, [{
    key: "resizeCamera",
    value: function resizeCamera(sizes) {
      this.instance.left = sizes.width / -2;
      this.instance.right = sizes.width / 2;
      this.instance.top = sizes.height / 2;
      this.instance.bottom = sizes.height / -2;
      this.instance.updateProjectionMatrix();
    }
  }]);
  return Camera;
}();

// EXTERNAL MODULE: ./node_modules/dat.gui/build/dat.gui.module.js
var dat_gui_module = __webpack_require__(4376);
;// CONCATENATED MODULE: ./app/components/Canvas/Debug.js
function Debug_typeof(obj) { "@babel/helpers - typeof"; return Debug_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Debug_typeof(obj); }
function Debug_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Debug_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Debug_toPropertyKey(descriptor.key), descriptor); } }
function Debug_createClass(Constructor, protoProps, staticProps) { if (protoProps) Debug_defineProperties(Constructor.prototype, protoProps); if (staticProps) Debug_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Debug_toPropertyKey(arg) { var key = Debug_toPrimitive(arg, "string"); return Debug_typeof(key) === "symbol" ? key : String(key); }
function Debug_toPrimitive(input, hint) { if (Debug_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Debug_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Debug = /*#__PURE__*/function () {
  function Debug(variables) {
    Debug_classCallCheck(this, Debug);
    this.active = window.location.hash === '#debug';
    this.variables = variables; // we point to actual variables in debugObject

    this.gui = new dat_gui_module/* GUI */.XS();
    if (!this.active) {
      this.gui.hide();
    } else {
      this.create();
    }
  }
  Debug_createClass(Debug, [{
    key: "create",
    value: function create() {
      var _this = this;
      this.gui.add(this.variables, 'progress').min(0).max(1).step(0.001).onFinishChange(function () {
        _this.variables.progressTarget = _this.variables.progress;
      });
      this.variables.runProgress = function () {
        // Forward & Backward progress
        var value = _this.variables.progress < 1 ? 1 : 0;
        gsap/* default.to */.ZP.to(_this.variables, {
          progress: value,
          duration: 1,
          ease: 'expo.out'
        });
      };
      this.gui.add(this.variables, 'runProgress');
    }
  }]);
  return Debug;
}();

// EXTERNAL MODULE: ./app/utils/utils.js
var utils = __webpack_require__(3376);
// EXTERNAL MODULE: ./node_modules/three/examples/jsm/loaders/GLTFLoader.js + 1 modules
var GLTFLoader = __webpack_require__(3867);
// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__(5161);
var map_default = /*#__PURE__*/__webpack_require__.n(map);
;// CONCATENATED MODULE: ./app/classes/Model.js
function Model_typeof(obj) { "@babel/helpers - typeof"; return Model_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Model_typeof(obj); }
function Model_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Model_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Model_toPropertyKey(descriptor.key), descriptor); } }
function Model_createClass(Constructor, protoProps, staticProps) { if (protoProps) Model_defineProperties(Constructor.prototype, protoProps); if (staticProps) Model_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Model_toPropertyKey(arg) { var key = Model_toPrimitive(arg, "string"); return Model_typeof(key) === "symbol" ? key : String(key); }
function Model_toPrimitive(input, hint) { if (Model_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Model_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Three



var Model = /*#__PURE__*/function () {
  function Model(_ref) {
    var model = _ref.model,
      material = _ref.material,
      textures = _ref.textures,
      scene = _ref.scene,
      sizes = _ref.sizes;
    Model_classCallCheck(this, Model);
    this.textures = textures;
    this.textureLoader = new three_module/* TextureLoader */.dpR();
    this.scene = scene;
    this.sizes = sizes;
    this.gltfLoader = new GLTFLoader/* GLTFLoader */.E();
  }
  Model_createClass(Model, [{
    key: "loadTextures",
    value: function loadTextures(textures) {
      var _this = this;
      return new Promise(function (resolve) {
        var promises = map_default()(textures, function (value, key) {
          return new Promise(function (resolve, reject) {
            _this.textureLoader.load(value, function (texture) {
              var object = {};
              object[key] = texture;
              resolve(object);
            }, undefined, function (err) {
              reject(err);
            });
          });
        });
        Promise.all(promises).then(function (loadedData) {
          map_default()(loadedData, function (object) {
            // We mutate this.textures with actual textures
            _this.textures[Object.keys(object)] = Object.values(object)[0];
          });
        }).then(function () {
          return resolve();
        })["catch"](function (error) {
          return console.error('Textures could not be loaded.');
        });
      });
    }
  }, {
    key: "onResize",
    value: function onResize() {}
  }]);
  return Model;
}();

;// CONCATENATED MODULE: ./app/components/Canvas/Models/Roza.js
function Roza_typeof(obj) { "@babel/helpers - typeof"; return Roza_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Roza_typeof(obj); }
function Roza_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Roza_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Roza_toPropertyKey(descriptor.key), descriptor); } }
function Roza_createClass(Constructor, protoProps, staticProps) { if (protoProps) Roza_defineProperties(Constructor.prototype, protoProps); if (staticProps) Roza_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Roza_toPropertyKey(arg) { var key = Roza_toPrimitive(arg, "string"); return Roza_typeof(key) === "symbol" ? key : String(key); }
function Roza_toPrimitive(input, hint) { if (Roza_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Roza_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Roza_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) Roza_setPrototypeOf(subClass, superClass); }
function Roza_setPrototypeOf(o, p) { Roza_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Roza_setPrototypeOf(o, p); }
function Roza_createSuper(Derived) { var hasNativeReflectConstruct = Roza_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Roza_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Roza_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Roza_possibleConstructorReturn(this, result); }; }
function Roza_possibleConstructorReturn(self, call) { if (call && (Roza_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return Roza_assertThisInitialized(self); }
function Roza_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function Roza_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function Roza_getPrototypeOf(o) { Roza_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Roza_getPrototypeOf(o); }


var Roza = /*#__PURE__*/function (_Model) {
  Roza_inherits(Roza, _Model);
  var _super = Roza_createSuper(Roza);
  function Roza(data) {
    var _this;
    Roza_classCallCheck(this, Roza);
    _this = _super.call(this, data);
    _this.path = data.modelPath;
    _this.textures = {
      color: 'images/textures/MCh_S_12_Rzezba_Popiersie_Rozy_Loewenfeld.jpg',
      normal: 'images/textures/MCh_S_12_Rzezba_Popiersie_Rozy_Loewenfeld_.jpg'
    };
    _this.loadTextures(_this.textures).then(_this.loadModel.bind(Roza_assertThisInitialized(_this)));
    return _this;
  }
  Roza_createClass(Roza, [{
    key: "loadModel",
    value: function loadModel() {
      var _this2 = this;
      var footerBounds = document.querySelector('footer').getBoundingClientRect();
      this.gltfLoader.load(this.path, function (gltf) {
        // Mesh
        _this2.model = gltf.scene.children[0].children[0].children[0].children[0];

        // Material
        var material = new three_module/* MeshBasicMaterial */.vBJ({
          // roughness: 0.7,
          map: _this2.textures.color
          // normalMap: this.textures.normal,
          // wireframe: true,
        });

        _this2.model.material = material;

        // Rotation
        _this2.model.rotation.x = Math.PI * 0.5;
        _this2.model.rotation.y = -Math.PI;

        // Position
        var x = (footerBounds.left + footerBounds.right) / 2;
        var y = (footerBounds.top + footerBounds.bottom + window.scrollY * 2) / 2;
        _this2.model.position.set(x - _this2.sizes.width / 2, -y + _this2.sizes.height / 2, -140);

        // Scale
        _this2.modelScale = Math.max(0.65, _this2.sizes.aspect * 0.4);
        console.log(_this2.modelScale);
        _this2.model.scale.set(_this2.modelScale, _this2.modelScale, _this2.modelScale);
        _this2.model.geometry.center();

        // Add to scene
        _this2.scene.add(_this2.model);
      });
    }
  }, {
    key: "onResize",
    value: function onResize() {
      if (this.model) {
        var footerBounds = document.querySelector('footer').getBoundingClientRect();

        // Position
        var x = (footerBounds.left + footerBounds.right) / 2;
        var y = (footerBounds.top + footerBounds.bottom + window.scrollY * 2) / 2;
        this.model.position.set(x - this.sizes.width / 2, -y + this.sizes.height / 2, -140);

        // Scale
        this.modelScale = Math.max(0.65, this.sizes.aspect * 0.4);
        this.model.scale.set(this.modelScale, this.modelScale, this.modelScale);
      }
    }
  }]);
  return Roza;
}(Model);

;// CONCATENATED MODULE: ./app/components/Canvas/Lights.js
function Lights_typeof(obj) { "@babel/helpers - typeof"; return Lights_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Lights_typeof(obj); }
function Lights_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Lights_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Lights_toPropertyKey(descriptor.key), descriptor); } }
function Lights_createClass(Constructor, protoProps, staticProps) { if (protoProps) Lights_defineProperties(Constructor.prototype, protoProps); if (staticProps) Lights_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Lights_toPropertyKey(arg) { var key = Lights_toPrimitive(arg, "string"); return Lights_typeof(key) === "symbol" ? key : String(key); }
function Lights_toPrimitive(input, hint) { if (Lights_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Lights_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Three

var Lights = /*#__PURE__*/function () {
  function Lights(_ref) {
    var scene = _ref.scene;
    Lights_classCallCheck(this, Lights);
    this.scene = scene;
    this.createLights();
  }
  Lights_createClass(Lights, [{
    key: "createLights",
    value: function createLights() {
      this.ambientLight = new three_module/* AmbientLight */.Mig(0xffffff, 1);
      this.directionalLight = new three_module/* DirectionalLight */.Ox3(0xffffff, 0.7);
      this.directionalLight.position.x = 2;
      this.directionalLight.castShadow = true;
      this.scene.add(this.ambientLight, this.directionalLight);
    }
  }]);
  return Lights;
}();

;// CONCATENATED MODULE: ./app/components/Canvas/Experience.js
function Experience_typeof(obj) { "@babel/helpers - typeof"; return Experience_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Experience_typeof(obj); }
function Experience_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Experience_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Experience_toPropertyKey(descriptor.key), descriptor); } }
function Experience_createClass(Constructor, protoProps, staticProps) { if (protoProps) Experience_defineProperties(Constructor.prototype, protoProps); if (staticProps) Experience_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Experience_toPropertyKey(arg) { var key = Experience_toPrimitive(arg, "string"); return Experience_typeof(key) === "symbol" ? key : String(key); }
function Experience_toPrimitive(input, hint) { if (Experience_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Experience_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Experience_getPrototypeOf(object); if (object === null) break; } return object; }
function Experience_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) Experience_setPrototypeOf(subClass, superClass); }
function Experience_setPrototypeOf(o, p) { Experience_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Experience_setPrototypeOf(o, p); }
function Experience_createSuper(Derived) { var hasNativeReflectConstruct = Experience_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Experience_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Experience_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Experience_possibleConstructorReturn(this, result); }; }
function Experience_possibleConstructorReturn(self, call) { if (call && (Experience_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return Experience_assertThisInitialized(self); }
function Experience_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function Experience_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function Experience_getPrototypeOf(o) { Experience_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Experience_getPrototypeOf(o); }
// Three



// Libraries


// Classes



// Canvas Components




// Utils



// 3D Models


// Shaders




// Scene & renderer are created in Canvas.js class
var Experience = /*#__PURE__*/function (_Canvas) {
  Experience_inherits(Experience, _Canvas);
  var _super = Experience_createSuper(Experience);
  function Experience(el) {
    var _this;
    Experience_classCallCheck(this, Experience);
    _this = _super.call(this, el);
    _this.speed = 0;
    // this.createGSAP()
    _this.createGui();
    _this.models = _this.loadModels();
    _this.isReady = false; // update method is called only when true

    _this.camera = new Camera({
      sizes: _this.sizes
    });
    _this.scene.add(_this.camera.instance);
    _this.meshes = [];
    _this.elements = new Element({
      scene: _this.scene,
      sizes: _this.sizes
    });

    // this.controls = new OrbitControls(this.camera, this.element);
    // this.controls.enableDamping = true;

    _this.lights = new Lights({
      scene: _this.scene
    });
    _this.mouse = new three_module/* Vector2 */.FM8();
    _this.isTouch = false;
    _this.clock = new three_module/* Clock */.SUY();
    _this.oldElapsedTime = 0;
    _this.addEventListeners();
    _this.onResize();
    return _this;
  }

  /**
   * Utility
   */
  Experience_createClass(Experience, [{
    key: "createGSAP",
    value: function createGSAP() {
      this.timeline = gsap/* default.timeline */.ZP.timeline();
      this.xSetter = gsap/* default.quickSetter */.ZP.quickSetter('.dot', 'y', 'px');
      gsap/* default.utils.pipe */.ZP.utils.pipe(gsap/* default.utils.clamp */.ZP.utils.clamp(0, 100),
      //make sure the number is between 0 and 100
      gsap/* default.utils.snap */.ZP.utils.snap(5),
      //snap to the closest increment of 5
      gsap/* default.quickSetter */.ZP.quickSetter('.dot', 'y', 'px') //apply it to the #id element's x property and append a "px" unit
      );
    }
  }, {
    key: "createGui",
    value: function createGui() {
      /* Add all variables to debugObject*/
      this.debugObject = {};
      this.debugObject.progress = 0;
      this.debugObject.progressTarget = 0;
      this.debug = new Debug(this.debugObject);
    }

    /**
     * Textures & Models
     */
  }, {
    key: "loadModels",
    value: function loadModels() {
      return [this.roza = new Roza({
        scene: this.scene,
        sizes: this.sizes,
        modelPath: 'models/roza.glb'
      })];
    }

    // This method is called in app.js at onPreloaded()
  }, {
    key: "updateImages",
    value: function updateImages(imageBounds) {
      if (this.elements.meshes.length === 0) {
        this.elements.createMeshes(imageBounds);
        this.isReady = true;
      } else {
        this.elements.updateMeshes(imageBounds);
      }
    }

    /**
     * Elements & Lights
     */
  }, {
    key: "update",
    value: function update() {
      // green box setter
      // this.xSetter(this.position * 200);

      // RGB Shift
      this.elements.uniforms.uOffset.value.set(0.0, this.speed);

      // Rotation on Model
      // if (this.models.length)
      // if (this.models.length > 0) this.models[0].rotation.x = this.speed;
      this.models[0].model.rotation.z = this.elapsedTime;
      // Tick
      this.elapsedTime = this.clock.getElapsedTime();
      this.deltaTime = this.elapsedTime - this.oldElapsedTime;
      this.oldElapsedTime = this.elapsedTime;

      // Controls update
      // this.controls.update();

      // Scene
      this.renderer.render(this.scene, this.camera.instance);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      // Update sizes
      _get(Experience_getPrototypeOf(Experience.prototype), "onResize", this).call(this);

      // Update camera
      this.camera.resizeCamera(this.sizes);

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Update elements
      this.elements.sizes = this.sizes;

      // Update models
      if (this.models) {
        this.models.map(function (model) {
          model.onResize();
        });
      }
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;
      // window.addEventListener('wheel', (event) => {
      // 	this.speed = event.deltaY * 0.0003;
      // });
      // Handle mouse events
      window.addEventListener('mousemove', function (event) {
        _this2.mouse.x = event.clientX / _this2.sizes.width - 0.5;
        _this2.mouse.y = -(event.clientY / _this2.sizes.height) + 0.5;
      });

      // Handle touch events
      window.addEventListener('touchstart', function (event) {
        _this2.isTouch = true;
        updateTouchPosition(event);
      });
      window.addEventListener('touchmove', function (event) {
        if (_this2.isTouch) {
          updateTouchPosition(event);
        }
      });
      window.addEventListener('touchend', function () {
        _this2.isTouch = false;
      });
      var updateTouchPosition = function updateTouchPosition(event) {
        if (event.touches.length > 0) {
          var touchEvent = event.touches[0];
          _this2.mouse.x = touchEvent.clientX / _this2.sizes.width - 0.5;
          _this2.mouse.y = -(touchEvent.clientY / _this2.sizes.height) + 0.5;
        }
      };
    }
  }]);
  return Experience;
}(Canvas);


/***/ }),

/***/ 5211:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Preloader)
/* harmony export */ });
/* harmony import */ var _classes_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9051);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6358);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var Preloader = /*#__PURE__*/function (_Component) {
  _inherits(Preloader, _Component);
  var _super = _createSuper(Preloader);
  function Preloader() {
    var _this;
    _classCallCheck(this, Preloader);
    _this = _super.call(this, {
      element: document.querySelector('.preloader'),
      elements: {
        images: document.querySelectorAll('[data-src]'),
        imagesBg: document.querySelectorAll('[data-src-bg]')
      }
    });
    _this.length = 0;
    _this.createLoader();
    return _this;
  }
  _createClass(Preloader, [{
    key: "createLoader",
    value: function createLoader() {
      var _this2 = this;
      this.elements.imagesBg.forEach(function (img) {
        img.onload = function (_) {
          return _this2.onAssetLoaded();
        };
        img.style.backgroundImage = "url(".concat(img.getAttribute('data-src-bg'), ")");
        _this2.onAssetLoaded();
      });
      this.elements.images.forEach(function (img) {
        img.onload = function (_) {
          return _this2.onAssetLoaded();
        };
        img.src = img.getAttribute('data-src');
      });
    }
  }, {
    key: "onAssetLoaded",
    value: function onAssetLoaded() {
      this.length++;
      var imageLength = 0;
      if (this.elements.images) {
        imageLength += this.elements.images.length;
      }
      if (this.elements.imagesBg) {
        imageLength += this.elements.imagesBg.length;
      }
      var percent = this.length / imageLength;
      if (percent === 1) {
        setTimeout(this.onLoaded.bind(this), 1000);
      }
    }
  }, {
    key: "onLoaded",
    value: function onLoaded() {
      this.emit('completed');
    }
  }, {
    key: "hide",
    value: function hide() {
      gsap__WEBPACK_IMPORTED_MODULE_1__/* ["default"].fromTo */ .ZP.fromTo(this.element, {
        autoAlpha: 1
      }, {
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power4.out'
      }).then(this.destroy.bind(this));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.element.parentNode.removeChild(this.element);
    }
  }]);
  return Preloader;
}(_classes_Component__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);


/***/ }),

/***/ 3731:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ coverHome)
});

// EXTERNAL MODULE: ./app/classes/Component.js
var Component = __webpack_require__(9051);
// EXTERNAL MODULE: ./node_modules/gsap/index.js + 2 modules
var gsap = __webpack_require__(6358);
// EXTERNAL MODULE: ./app/utils/utils.js
var utils = __webpack_require__(3376);
;// CONCATENATED MODULE: ./app/components/Button.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Button = /*#__PURE__*/function (_Component) {
  _inherits(Button, _Component);
  var _super = _createSuper(Button);
  function Button(el) {
    var _this;
    _classCallCheck(this, Button);
    _this = _super.call(this, {
      element: el,
      elements: {
        el: '.btn',
        text: document.querySelector('.btn__text'),
        textInner: document.querySelector('.btn__text--inner')
      }
    });
    _this.renderedStyles = {
      tx: {
        previous: 0,
        current: 0,
        amt: 0.1
      },
      ty: {
        previous: 0,
        current: 0,
        amt: 0.1
      }
    };
    _this.isRunning = false;
    _this.isTouch = false;
    _this.state = {
      hover: false
    };
    _this.calculateBounds();
    _this.createMouse();
    _this.addEventListeners();
    _this.frameCount = 0;
    requestAnimationFrame(function () {
      return _this.render();
    });
    return _this;
  }
  _createClass(Button, [{
    key: "createMouse",
    value: function createMouse() {
      this.mousepos = {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "calculateBounds",
    value: function calculateBounds() {
      // size/position
      var bounds = this.elements.el.getBoundingClientRect();
      this.rect = {
        top: bounds.top + window.scrollY,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      };

      // the movement will take place when the distance from the mouse to the center of the button is lower than this value
      this.distanceToTrigger = this.rect.width * 0.8;
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;
      // Launches raf
      this.elements.el.addEventListener('mouseover', function () {
        if (!_this2.isRunning) {
          _this2.frameCount = 0;
          _this2.isRunning = true;
          _this2.render();
        }
      });

      // Handle resize events
      window.addEventListener('resize', this.onResize.bind(this));

      // Handle mouse events
      window.addEventListener('mousemove', function (e) {
        return _this2.mousepos = (0,utils/* getMousePos */.Me)(e);
      });

      // Handle touch events
      // window.addEventListener('touchstart', (event) => {
      // 	this.isTouch = true;
      // 	this.mousepos = getTouchPos(event);

      // 	if (!this.isRunning) {
      // 		this.frameCount = 0;
      // 		this.isRunning = true;
      // 		this.render();
      // 	}
      // });

      // window.addEventListener('touchmove', (event) => {
      // 	if (this.isTouch) {
      // 		this.mousepos = getTouchPos(event);
      // 	}
      // });

      // window.addEventListener('touchend', () => {
      // 	this.isTouch = false;
      // });
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this.winsize = (0,utils/* calcWinsize */.VA)();
      this.calculateBounds();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      if (!this.isRunning) return;
      var distanceMouseButton = (0,utils/* distance */.TE)(this.mousepos.x + window.scrollX, this.mousepos.y + window.scrollY, this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2);
      var x = 0;
      var y = 0;
      if (distanceMouseButton < this.distanceToTrigger) {
        if (!this.state.hover) {
          this.enter();
        }
        x = (this.mousepos.x + window.scrollX - (this.rect.left + this.rect.width / 2)) * 0.3;
        y = (this.mousepos.y + window.scrollY - (this.rect.top + this.rect.height / 2)) * 0.3;
      } else if (this.state.hover) {
        this.leave();
      }
      this.renderedStyles['tx'].current = x;
      this.renderedStyles['ty'].current = y;
      for (var key in this.renderedStyles) {
        this.renderedStyles[key].previous = (0,utils/* lerp */.t7)(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
      }
      this.elements.el.style.transform = "translate3d(".concat(this.renderedStyles['tx'].previous, "px, ").concat(this.renderedStyles['ty'].previous, "px, 0)");
      this.elements.text.style.transform = "translate3d(".concat(this.renderedStyles['tx'].previous * 0.5, "px, ").concat(this.renderedStyles['ty'].previous * 0.5, "px, 0)");
      requestAnimationFrame(function () {
        return _this3.render();
      });
      requestIdleCallback(function () {
        _this3.stopRender();
      });
    }
  }, {
    key: "stopRender",
    value: function stopRender() {
      if (!this.state.hover) {
        this.frameCount += 1;
        if (this.frameCount >= 90) this.isRunning = false;
        return;
      }
      this.frameCount = 0;
    }
  }, {
    key: "enter",
    value: function enter() {
      this.isRunning = true;
      this.state.hover = true;
      this.elements.el.classList.add('btn--hover');
      document.body.classList.add('active');
      gsap/* default.killTweensOf */.ZP.killTweensOf(this.elements.textInner);
      gsap/* default.timeline */.ZP.timeline().to(this.elements.textInner, {
        duration: 0.15,
        ease: 'Power2.easeIn',
        opacity: 0,
        x: '20%'
      }).to(this.elements.textInner, {
        duration: 0.2,
        ease: 'Expo.easeOut',
        opacity: 1,
        startAt: {
          x: '-20%'
        },
        x: '0%'
      });
    }
  }, {
    key: "leave",
    value: function leave() {
      this.state.hover = false;
      this.elements.el.classList.remove('btn--hover');
      document.body.classList.remove('active');
      gsap/* default.killTweensOf */.ZP.killTweensOf(this.elements.textInner);
      gsap/* default.timeline */.ZP.timeline().to(this.elements.textInner, {
        duration: 0.15,
        ease: 'Power2.easeIn',
        opacity: 0,
        x: '-20%'
      }).to(this.elements.textInner, {
        duration: 0.2,
        ease: 'Expo.easeOut',
        opacity: 1,
        startAt: {
          x: '20%'
        },
        x: '0%'
      });
    }
  }]);
  return Button;
}(Component/* default */.Z);

// EXTERNAL MODULE: ./node_modules/lodash/each.js
var each = __webpack_require__(6073);
var each_default = /*#__PURE__*/__webpack_require__.n(each);
;// CONCATENATED MODULE: ./app/pages/home/GallerySection.js
function GallerySection_typeof(obj) { "@babel/helpers - typeof"; return GallerySection_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, GallerySection_typeof(obj); }
function GallerySection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function GallerySection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, GallerySection_toPropertyKey(descriptor.key), descriptor); } }
function GallerySection_createClass(Constructor, protoProps, staticProps) { if (protoProps) GallerySection_defineProperties(Constructor.prototype, protoProps); if (staticProps) GallerySection_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function GallerySection_toPropertyKey(arg) { var key = GallerySection_toPrimitive(arg, "string"); return GallerySection_typeof(key) === "symbol" ? key : String(key); }
function GallerySection_toPrimitive(input, hint) { if (GallerySection_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (GallerySection_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function GallerySection_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) GallerySection_setPrototypeOf(subClass, superClass); }
function GallerySection_setPrototypeOf(o, p) { GallerySection_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return GallerySection_setPrototypeOf(o, p); }
function GallerySection_createSuper(Derived) { var hasNativeReflectConstruct = GallerySection_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = GallerySection_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = GallerySection_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return GallerySection_possibleConstructorReturn(this, result); }; }
function GallerySection_possibleConstructorReturn(self, call) { if (call && (GallerySection_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return GallerySection_assertThisInitialized(self); }
function GallerySection_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function GallerySection_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function GallerySection_getPrototypeOf(o) { GallerySection_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return GallerySection_getPrototypeOf(o); }


var GallerySection = /*#__PURE__*/function (_Component) {
  GallerySection_inherits(GallerySection, _Component);
  var _super = GallerySection_createSuper(GallerySection);
  function GallerySection() {
    GallerySection_classCallCheck(this, GallerySection);
    return _super.call(this, {
      element: '.gallery',
      elements: {
        images: '.gallery__image'
      }
    });
  }
  GallerySection_createClass(GallerySection, [{
    key: "getBounds",
    value: function getBounds() {
      var _this = this;
      return new Promise(function (resolve) {
        // Create Images Array
        if (!_this.imagesArray) {
          _this.imagesArray = new Array(_this.elements.images.length);
          each_default()(_this.elements.images, function (image, i) {
            return _this.imagesArray[i] = {
              bounds: image.getBoundingClientRect(),
              src: image.src
            };
          });
        }

        // Update Existing Images Array
        if (_this.imagesArray) {
          _this.imagesArray.map(function (image, i) {
            return image.bounds = _this.elements.images[i].getBoundingClientRect();
          });
        }

        // Return bounds to GallerySection.js -> app.js -> Experience.js
        resolve(_this.imagesArray);
      });
    }
  }]);
  return GallerySection;
}(Component/* default */.Z);

;// CONCATENATED MODULE: ./app/pages/home/index.js
function home_typeof(obj) { "@babel/helpers - typeof"; return home_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, home_typeof(obj); }
function home_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function home_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, home_toPropertyKey(descriptor.key), descriptor); } }
function home_createClass(Constructor, protoProps, staticProps) { if (protoProps) home_defineProperties(Constructor.prototype, protoProps); if (staticProps) home_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function home_toPropertyKey(arg) { var key = home_toPrimitive(arg, "string"); return home_typeof(key) === "symbol" ? key : String(key); }
function home_toPrimitive(input, hint) { if (home_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (home_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function home_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) home_setPrototypeOf(subClass, superClass); }
function home_setPrototypeOf(o, p) { home_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return home_setPrototypeOf(o, p); }
function home_createSuper(Derived) { var hasNativeReflectConstruct = home_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = home_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = home_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return home_possibleConstructorReturn(this, result); }; }
function home_possibleConstructorReturn(self, call) { if (call && (home_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return home_assertThisInitialized(self); }
function home_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function home_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function home_getPrototypeOf(o) { home_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return home_getPrototypeOf(o); }




var coverHome = /*#__PURE__*/function (_Component) {
  home_inherits(coverHome, _Component);
  var _super = home_createSuper(coverHome);
  function coverHome(el, cb) {
    var _this;
    home_classCallCheck(this, coverHome);
    _this = _super.call(this, {
      element: el,
      elements: {
        title: '.cover__title',
        list: 'li',
        desc: '.cover__desc--hidden',
        btn: '.btn'
      }
    });
    _this.callback = cb;
    _this.id = 'home';
    _this.animate();
    _this.onCreated();
    return _this;
  }
  home_createClass(coverHome, [{
    key: "animate",
    value: function animate() {
      var tl = gsap/* default.timeline */.ZP.timeline({
        duration: 1,
        ease: 'power4.out'
      });
      tl.from(this.element, {
        autoAlpha: 0
      }).from(this.elements.title, {
        autoAlpha: 0,
        y: 100,
        rotate: 2
      }).from(this.elements.list, {
        autoAlpha: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.7,
        rotate: 10
      }).from(this.elements.desc, {
        autoAlpha: 0,
        y: 40,
        duration: 0.7
      }, '-=0.5').from(this.elements.btn, {
        autoAlpha: 0
      }, '-=0.5');
    }
  }, {
    key: "onCreated",
    value: function onCreated() {
      var _this2 = this;
      this.button = new Button('#btn-gh');
      this.button = new Button('.describe__button');
      this.gallery = new GallerySection();
      this.gallery.getBounds().then(function (imageBounds) {
        // Return bounds to app.js -> Experience.js
        _this2.callback(imageBounds);
      });
    }
  }]);
  return coverHome;
}(Component/* default */.Z);


/***/ }),

/***/ 3376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ds": () => (/* binding */ debounce),
/* harmony export */   "Me": () => (/* binding */ getMousePos),
/* harmony export */   "TE": () => (/* binding */ distance),
/* harmony export */   "VA": () => (/* binding */ calcWinsize),
/* harmony export */   "t7": () => (/* binding */ lerp)
/* harmony export */ });
/* unused harmony exports map, getTouchPos, getRandomFloat */
var _this = undefined;
// Map number x from range [a, b] to [c, d]
var map = function map(x, a, b, c, d) {
  return (x - a) * (d - c) / (b - a) + c;
};

// Linear interpolation
var lerp = function lerp(a, b, n) {
  return (1 - n) * a + n * b;
};
var calcWinsize = function calcWinsize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

// Gets the mouse position
var getMousePos = function getMousePos(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
};

// Gets the touch position
var getTouchPos = function getTouchPos(e) {
  if (e.touches.length > 0) {
    return {
      x: e.touches[0].clientX / _this.sizes.width - 0.5,
      y: -(e.touches[0].clientY / _this.sizes.height) + 0.5
    };
  }
};
var distance = function distance(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;
  return Math.hypot(a, b);
};

// Generate a random float.
var getRandomFloat = function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
};

// Debounce
var debounce = function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
};


/***/ })

}]);
//# sourceMappingURL=485.1fae7e81.js.map