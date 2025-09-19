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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(usersService, jwtService, configService) {
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.configService = configService;
        }
        // This is a placeholder for a real OTP validation service (e.g., Twilio Verify)
        AuthService_1.prototype.validateOtp = function (phoneNumber, otp) {
            return __awaiter(this, void 0, void 0, function () {
                var isTestUser, isMagicOtp;
                return __generator(this, function (_a) {
                    isTestUser = phoneNumber === '9876543210';
                    isMagicOtp = otp === '123456';
                    return [2 /*return*/, isTestUser && isMagicOtp];
                });
            });
        };
        AuthService_1.prototype.login = function (phoneNumber, otp) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid, user, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validateOtp(phoneNumber, otp)];
                        case 1:
                            isValid = _a.sent();
                            if (!isValid) {
                                throw new common_1.UnauthorizedException('Invalid OTP or phone number.');
                            }
                            return [4 /*yield*/, this.usersService.findByPhoneNumber(phoneNumber)];
                        case 2:
                            user = _a.sent();
                            if (!!user) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.usersService.createUser(phoneNumber)];
                        case 3:
                            user = _a.sent();
                            _a.label = 4;
                        case 4: return [4 /*yield*/, this.getTokens(user.id, user.phoneNumber)];
                        case 5:
                            tokens = _a.sent();
                            return [4 /*yield*/, this.updateRefreshTokenHash(user.id, tokens.refreshToken)];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, tokens];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // To logout, we clear the refresh token hash from the user's record
                    return [2 /*return*/, this.usersService.update(userId, { hashedRefreshToken: null })];
                });
            });
        };
        AuthService_1.prototype.refreshTokens = function (userId, refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var user, refreshTokenMatches, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            if (!user || !user.hashedRefreshToken) {
                                throw new common_1.ForbiddenException('Access Denied');
                            }
                            return [4 /*yield*/, bcrypt.compare(refreshToken, user.hashedRefreshToken)];
                        case 2:
                            refreshTokenMatches = _a.sent();
                            if (!refreshTokenMatches) {
                                throw new common_1.ForbiddenException('Access Denied');
                            }
                            return [4 /*yield*/, this.getTokens(user.id, user.phoneNumber)];
                        case 3:
                            tokens = _a.sent();
                            return [4 /*yield*/, this.updateRefreshTokenHash(user.id, tokens.refreshToken)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, tokens];
                    }
                });
            });
        };
        AuthService_1.prototype.updateRefreshTokenHash = function (userId, refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var salt, hashedRefreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bcrypt.genSalt()];
                        case 1:
                            salt = _a.sent();
                            return [4 /*yield*/, bcrypt.hash(refreshToken, salt)];
                        case 2:
                            hashedRefreshToken = _a.sent();
                            return [4 /*yield*/, this.usersService.update(userId, { hashedRefreshToken: hashedRefreshToken })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.getTokens = function (userId, phoneNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, _a, accessToken, refreshToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            payload = { sub: userId, phoneNumber: phoneNumber };
                            return [4 /*yield*/, Promise.all([
                                    // Sign the Access Token with its specific secret and expiration
                                    this.jwtService.signAsync(payload, {
                                        secret: this.configService.get('JWT_ACCESS_SECRET'),
                                        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
                                    }),
                                    // Sign the Refresh Token with its own secret and expiration
                                    this.jwtService.signAsync(payload, {
                                        secret: this.configService.get('JWT_REFRESH_SECRET'),
                                        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), accessToken = _a[0], refreshToken = _a[1];
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                }];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
// import { Injectable, UnauthorizedException } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { ConfigService } from '@nestjs/config'
// import * as bcrypt from 'bcrypt'
// import { UsersService } from '../users/users.service'
// import { CreateUserDto } from '../users/dto/create-user.dto'
// @Injectable()
// export class AuthService {
//     constructor(
//         private usersService: UsersService,
//         private jwtService: JwtService,
//         private configService: ConfigService,
//     ) { }
//     async validateUser(email: string, password: string): Promise<any> {
//         const user = await this.usersService.findByEmail(email)
//         if (user && await bcrypt.compare(password, user.password)) {
//             const { password, ...result } = user
//             return result
//         }
//         return null
//     }
//     async register(createUserDto: CreateUserDto) {
//         const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
//         const user = await this.usersService.create({
//             ...createUserDto,
//             password: hashedPassword,
//         })
//         const { password, ...result } = user
//         return this.generateTokens(result)
//     }
//     async login(user: any) {
//         return this.generateTokens(user)
//     }
//     async refreshToken(refreshToken: string) {
//         try {
//             const payload = this.jwtService.verify(refreshToken, {
//                 secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
//             })
//             const user = await this.usersService.findById(payload.sub)
//             if (!user) {
//                 throw new UnauthorizedException('Invalid refresh token')
//             }
//             const { password, ...result } = user
//             return this.generateTokens(result)
//         } catch (error) {
//             throw new UnauthorizedException('Invalid refresh token')
//         }
//     }
//     private generateTokens(user: any) {
//         const payload = { email: user.email, sub: user.id }
//         return {
//             accessToken: this.jwtService.sign(payload),
//             refreshToken: this.jwtService.sign(payload, {
//                 secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
//                 expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
//             }),
//             user,
//         }
//     }
// }
