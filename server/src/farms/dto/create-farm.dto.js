"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var soilTypes = ['sandy', 'clayey', 'loamy'];
var irrigationSources = ['rain-fed', 'canal', 'borewell', 'pond'];
var CreateFarmDto = function () {
    var _a;
    var _farmName_decorators;
    var _farmName_initializers = [];
    var _farmName_extraInitializers = [];
    var _locationLat_decorators;
    var _locationLat_initializers = [];
    var _locationLat_extraInitializers = [];
    var _locationLon_decorators;
    var _locationLon_initializers = [];
    var _locationLon_extraInitializers = [];
    var _soilType_decorators;
    var _soilType_initializers = [];
    var _soilType_extraInitializers = [];
    var _irrigationSource_decorators;
    var _irrigationSource_initializers = [];
    var _irrigationSource_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateFarmDto() {
                this.farmName = __runInitializers(this, _farmName_initializers, void 0);
                this.locationLat = (__runInitializers(this, _farmName_extraInitializers), __runInitializers(this, _locationLat_initializers, void 0));
                this.locationLon = (__runInitializers(this, _locationLat_extraInitializers), __runInitializers(this, _locationLon_initializers, void 0));
                this.soilType = (__runInitializers(this, _locationLon_extraInitializers), __runInitializers(this, _soilType_initializers, void 0));
                this.irrigationSource = (__runInitializers(this, _soilType_extraInitializers), __runInitializers(this, _irrigationSource_initializers, void 0));
                __runInitializers(this, _irrigationSource_extraInitializers);
            }
            return CreateFarmDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _farmName_decorators = [(0, swagger_1.ApiProperty)({ example: 'Home Field' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _locationLat_decorators = [(0, swagger_1.ApiProperty)({ example: 28.6139 }), (0, class_validator_1.IsNumber)()];
            _locationLon_decorators = [(0, swagger_1.ApiProperty)({ example: 77.2090 }), (0, class_validator_1.IsNumber)()];
            _soilType_decorators = [(0, swagger_1.ApiProperty)({ example: 'loamy', enum: soilTypes }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(soilTypes)];
            _irrigationSource_decorators = [(0, swagger_1.ApiProperty)({ example: 'canal', enum: irrigationSources }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(irrigationSources)];
            __esDecorate(null, null, _farmName_decorators, { kind: "field", name: "farmName", static: false, private: false, access: { has: function (obj) { return "farmName" in obj; }, get: function (obj) { return obj.farmName; }, set: function (obj, value) { obj.farmName = value; } }, metadata: _metadata }, _farmName_initializers, _farmName_extraInitializers);
            __esDecorate(null, null, _locationLat_decorators, { kind: "field", name: "locationLat", static: false, private: false, access: { has: function (obj) { return "locationLat" in obj; }, get: function (obj) { return obj.locationLat; }, set: function (obj, value) { obj.locationLat = value; } }, metadata: _metadata }, _locationLat_initializers, _locationLat_extraInitializers);
            __esDecorate(null, null, _locationLon_decorators, { kind: "field", name: "locationLon", static: false, private: false, access: { has: function (obj) { return "locationLon" in obj; }, get: function (obj) { return obj.locationLon; }, set: function (obj, value) { obj.locationLon = value; } }, metadata: _metadata }, _locationLon_initializers, _locationLon_extraInitializers);
            __esDecorate(null, null, _soilType_decorators, { kind: "field", name: "soilType", static: false, private: false, access: { has: function (obj) { return "soilType" in obj; }, get: function (obj) { return obj.soilType; }, set: function (obj, value) { obj.soilType = value; } }, metadata: _metadata }, _soilType_initializers, _soilType_extraInitializers);
            __esDecorate(null, null, _irrigationSource_decorators, { kind: "field", name: "irrigationSource", static: false, private: false, access: { has: function (obj) { return "irrigationSource" in obj; }, get: function (obj) { return obj.irrigationSource; }, set: function (obj, value) { obj.irrigationSource = value; } }, metadata: _metadata }, _irrigationSource_initializers, _irrigationSource_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateFarmDto = CreateFarmDto;
