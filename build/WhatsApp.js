"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production' ||
    process.env.TS_NODE_DEV === 'true') {
    Promise.resolve().then(() => __importStar(require('dotenv'))).then((dotenv) => dotenv.config());
}
const messages_1 = __importDefault(require("./api/messages"));
const phoneNumbers_1 = __importDefault(require("./api/phoneNumbers"));
const twoStepVerification_1 = __importDefault(require("./api/twoStepVerification"));
const webhooks_1 = __importDefault(require("./api/webhooks"));
const logger_1 = __importDefault(require("./logger"));
const requester_1 = __importDefault(require("./requester"));
const SDKEnums = __importStar(require("./types/enums"));
const utils_1 = require("./utils");
const version_1 = require("./version");
const LIB_NAME = 'WHATSAPP';
const LOG_LOCAL = false;
const LOGGER = new logger_1.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
const headerPrefix = 'WA_SDK';
class WhatsApp {
    constructor(senderNumberId) {
        this.sdkVersion = version_1.SDKVersion;
        this.config = (0, utils_1.importConfig)(senderNumberId);
        this.requester = new requester_1.default(this.config[SDKEnums.WAConfigEnum.BaseURL], this.config[SDKEnums.WAConfigEnum.APIVersion], this.config[SDKEnums.WAConfigEnum.PhoneNumberId], this.config[SDKEnums.WAConfigEnum.AccessToken], this.config[SDKEnums.WAConfigEnum.BusinessAcctId], this.config[SDKEnums.WAConfigEnum.AppId], this.userAgent());
        this.messages = new messages_1.default(this.config, this.requester);
        this.phoneNumbers = new phoneNumbers_1.default(this.config, this.requester);
        this.twoStepVerification = new twoStepVerification_1.default(this.config, this.requester);
        this.webhooks = new webhooks_1.default(this.config, this.requester, this.userAgent());
        LOGGER.log('WhatsApp Node.js SDK instantiated!');
    }
    version() {
        return this.sdkVersion;
    }
    userAgent() {
        const userAgentString = `${headerPrefix}/${this.version()} (Node.js ${process.version})`;
        return userAgentString;
    }
    updateTimeout(ms) {
        this.config[SDKEnums.WAConfigEnum.RequestTimeout] = ms;
        LOGGER.log(`Updated request timeout to ${ms}ms`);
        return true;
    }
    updateSenderNumberId(phoneNumberId) {
        this.config[SDKEnums.WAConfigEnum.PhoneNumberId] = phoneNumberId;
        LOGGER.log(`Updated sender phone number id to ${phoneNumberId}`);
        return true;
    }
    updateAccessToken(accessToken) {
        this.config[SDKEnums.WAConfigEnum.AccessToken] = accessToken;
        LOGGER.log(`Updated access token`);
        return true;
    }
}
WhatsApp.Enums = SDKEnums;
exports.default = WhatsApp;
