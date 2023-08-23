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
Object.defineProperty(exports, "__esModule", { value: true });
const u = __importStar(require("../utils"));
describe('Helper utilities', () => {
    const sdkConfig = global.sdkConfig;
    test('signature match', () => {
        const testBodyString = 'test';
        const knownSignature = '0c61947b610d4f45e65f3d680e26027121ec2413e77598bcb6cfc6e0d9888221';
        expect(u.generateXHub256Sig(testBodyString, sdkConfig.M4D_APP_SECRET)).toStrictEqual(knownSignature);
    });
    test('failed configuration import—sender number id', () => {
        expect(() => {
            u.importConfig();
        }).toThrowError('Missing WhatsApp sender phone number Id.');
    });
    test('failed configuration import—', () => {
        process.env.WA_PHONE_NUMBER_ID = sdkConfig.WA_PHONE_NUMBER_ID.toString();
        expect(() => {
            u.importConfig();
        }).toThrowError('Invalid configuration.');
    });
    it('successful configuration import', () => {
        process.env.WA_BASE_URL = sdkConfig.WA_BASE_URL;
        process.env.M4D_APP_ID = sdkConfig.M4D_APP_ID;
        process.env.M4D_APP_SECRET = sdkConfig.M4D_APP_SECRET;
        process.env.WA_BUSINESS_ACCOUNT_ID = sdkConfig.WA_BUSINESS_ACCOUNT_ID;
        process.env.CLOUD_API_ACCESS_TOKEN = sdkConfig.CLOUD_API_ACCESS_TOKEN;
        process.env.CLOUD_API_VERSION = sdkConfig.CLOUD_API_VERSION;
        process.env.WEBHOOK_ENDPOINT = sdkConfig.WEBHOOK_ENDPOINT;
        process.env.WEBHOOK_VERIFICATION_TOKEN =
            sdkConfig.WEBHOOK_VERIFICATION_TOKEN;
        process.env.LISTENER_PORT = sdkConfig.LISTENER_PORT.toString();
        process.env.DEBUG = sdkConfig.DEBUG.toString();
        process.env.REQUEST_TIMEOUT = sdkConfig.REQUEST_TIMEOUT.toString();
        expect(u.importConfig()).toEqual(sdkConfig);
    });
});
