"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = __importDefault(require("got"));
var Zendesk = /** @class */ (function () {
    function Zendesk(_config) {
        this.config = _config;
        this.reqHeaders = {
            'content-type': 'application/json',
            accept: 'application/json'
        };
        this.domain = "https://" + _config.subdomain + ".zendesk.com/api/v2";
    }
    //
    // Groups
    //
    Zendesk.prototype.getGroups = function (groupId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, resArray, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = this.domain;
                        if (groupId !== undefined) {
                            url = url + "/groups/" + groupId + ".json";
                        }
                        else if (userId !== undefined) {
                            url = url + "/users/" + userId + "/groups.json";
                        }
                        else {
                            url = url + "/groups.json";
                        }
                        return [4 /*yield*/, this._zendeskRequest(url, { headers: this.reqHeaders }, 'groups')];
                    case 1:
                        resArray = _a.sent();
                        return [2 /*return*/, resArray];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.createGroup = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/groups.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    group: group
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, (JSON.parse(res.body)).group];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.updateGroup = function (groupId, group) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/groups/" + groupId + ".json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    group: group
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/groups/" + groupId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    // Group Membership
    //
    Zendesk.prototype.getGroupMemberships = function (groupId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = this.domain;
                        if (groupId !== undefined) {
                            url = url + "/groups/" + groupId + "/memberships.json";
                        }
                        else if (userId !== undefined) {
                            url = url + "/users/" + userId + "/group_memberships.json";
                        }
                        else {
                            url = url + "/group_memberships.json";
                        }
                        return [4 /*yield*/, this._zendeskRequest(url, { headers: this.reqHeaders })
                            // TODO: handle pagination
                        ];
                    case 1:
                        res = _a.sent();
                        // TODO: handle pagination
                        return [2 /*return*/, (JSON.parse(res.body)).group_memberships];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, err_5];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.createGroupMembership = function (groupMembership) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/group_memberships.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    group_membership: groupMembership
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_6 = _a.sent();
                        throw err_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteGroupMembership = function (groupMembershipId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/group_memberships/" + groupMembershipId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_7 = _a.sent();
                        throw err_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    // Organizations
    //
    Zendesk.prototype.getOrganizations = function (organizationId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/organizations.json", { headers: this.reqHeaders }, 'organizations')];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        err_8 = _a.sent();
                        throw err_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Searches for Zendesk organizations by name and returns an array of any matches.
     * Uses autocompletion, so the array of results is based off of orgs whose name starts
     * with the given name param.
     * @param {string} name friendly name of the organization
     */
    Zendesk.prototype.findOrganizations = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/organizations/autocomplete.json?name=" + name + "/", { headers: this.reqHeaders })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_9 = _a.sent();
                        throw err_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.createOrganization = function (organization) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/organizations.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    organization: organization
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_10 = _a.sent();
                        throw err_10;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.updateOrganization = function (organizationId, organization) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/organizations/" + organizationId + ".json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    organization: organization
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_11 = _a.sent();
                        throw err_11;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.upsertOrganization = function (organization) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/organizations/create_or_update.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    organization: organization
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, (JSON.parse(res.body)).organization];
                    case 2:
                        err_12 = _a.sent();
                        throw err_12;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteOrganization = function (organizationId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/organizations/" + organizationId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.body];
                    case 2:
                        err_13 = _a.sent();
                        throw err_13;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    // Views
    //
    Zendesk.prototype.getViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/views.json", { headers: this.reqHeaders }, 'views')];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        err_14 = _a.sent();
                        throw err_14;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: createView
    Zendesk.prototype.createView = function (view) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/views.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    view: view
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_15 = _a.sent();
                        throw err_15;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: updateView
    Zendesk.prototype.updateView = function (viewId, view) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/views/" + viewId + ".json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    view: view
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_16 = _a.sent();
                        throw err_16;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteView = function (viewId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/views/" + viewId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_17 = _a.sent();
                        throw err_17;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    // Triggers
    //
    Zendesk.prototype.getTriggers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/triggers.json", { headers: this.reqHeaders }, 'triggers')];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        err_18 = _a.sent();
                        throw err_18;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.createTrigger = function (trigger) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/triggers.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    trigger: trigger
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_19 = _a.sent();
                        throw err_19;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.updateTrigger = function (triggerId, trigger) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/triggers/" + triggerId + ".json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    trigger: trigger
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_20 = _a.sent();
                        throw err_20;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteTrigger = function (triggerId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/triggers/" + triggerId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_21 = _a.sent();
                        throw err_21;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    // Brands
    //
    Zendesk.prototype.getBrands = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/brands.json", { headers: this.reqHeaders }, 'brands')];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        err_22 = _a.sent();
                        throw err_22;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.createBrand = function (brand) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/brands.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    brand: brand
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_23 = _a.sent();
                        if (err_23.statusCode === 422) {
                            // TODO: make this better
                            throw new Error("Response code 422 (Unprocessable Entity). Response body: " + err_23.response.body);
                        }
                        throw err_23;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: updateBrand
    Zendesk.prototype.updateBrand = function (brandId, brand) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/brands/" + brandId + ".json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    brand: brand
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_24 = _a.sent();
                        throw err_24;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteBrand = function (brandId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/brands/" + brandId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_25 = _a.sent();
                        throw err_25;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    // Support Addresses
    //
    Zendesk.prototype.getSupportAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/recipient_addresses.json", { headers: this.reqHeaders }, 'recipient_addresses')];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        err_26 = _a.sent();
                        throw err_26;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.createSupportAddress = function (supportAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/recipient_addresses.json", {
                                headers: this.reqHeaders,
                                method: 'POST',
                                body: JSON.stringify({
                                    recipient_address: supportAddress
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_27 = _a.sent();
                        throw err_27;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.updateSupportAddress = function (supportAddressId, supportAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/recipient_addresses/" + supportAddressId + ".json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    recipient_address: supportAddress
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_28 = _a.sent();
                        throw err_28;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.verifySupportAddress = function (supportAddressId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/recipient_addresses/" + supportAddressId + "/verify.json", {
                                headers: this.reqHeaders,
                                method: 'PUT',
                                body: JSON.stringify({
                                    type: 'forwarding'
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_29 = _a.sent();
                        throw err_29;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype.deleteSupportAddress = function (supportAddressId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._zendeskRequest(this.domain + "/recipient_addresses/" + supportAddressId + ".json", {
                                headers: this.reqHeaders,
                                method: 'DELETE'
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, JSON.parse(res.body)];
                    case 2:
                        err_30 = _a.sent();
                        throw err_30;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Zendesk.prototype._zendeskRequest = function (url, options, paginationKey) {
        return __awaiter(this, void 0, void 0, function () {
            var res, responseBody, err_31;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        res = void 0;
                        if (!paginationKey) return [3 /*break*/, 4];
                        res = [];
                        responseBody = void 0;
                        _a.label = 1;
                    case 1:
                        if (!url) return [3 /*break*/, 3];
                        return [4 /*yield*/, got_1.default(url, __assign(__assign({}, options), { auth: this.config.username + ":" + this.config.password // take care of basic auth
                             }))];
                    case 2:
                        responseBody = _a.sent();
                        responseBody = JSON.parse(responseBody.body);
                        res = res.concat(responseBody[paginationKey]);
                        url = responseBody.next_page;
                        return [3 /*break*/, 1];
                    case 3: return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, got_1.default(url, __assign(__assign({}, options), { auth: this.config.username + ":" + this.config.password // take care of basic auth
                         }))];
                    case 5:
                        res = _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, res];
                    case 7:
                        err_31 = _a.sent();
                        throw err_31;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Zendesk;
}());
exports.Zendesk = Zendesk;
