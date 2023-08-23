"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nock_1 = __importDefault(require("nock"));
const enums_1 = require("../types/enums");
const requester_1 = __importDefault(require("../requester"));
describe('HTTP requester tests', () => {
    const sdkConfig = global.sdkConfig;
    const basePath = `/${sdkConfig.CLOUD_API_VERSION}/${sdkConfig.WA_PHONE_NUMBER_ID}`;
    const request = new requester_1.default(sdkConfig.WA_BASE_URL, sdkConfig.CLOUD_API_VERSION, sdkConfig.WA_PHONE_NUMBER_ID, sdkConfig.CLOUD_API_ACCESS_TOKEN, sdkConfig.WA_BUSINESS_ACCOUNT_ID, 'test-user-agent');
    const default_response_body = { success: false };
    let scope;
    afterEach(() => {
        nock_1.default.cleanAll();
        nock_1.default.restore();
        nock_1.default.activate();
    });
    it('Send a unsupported endpoint request', async () => {
        scope = (0, nock_1.default)(`https://${sdkConfig.WA_BASE_URL}`)
            .get(/.*/)
            .delay(200)
            .delayBody(200)
            .delayConnection(200)
            .reply(400, default_response_body);
        const response = await request.sendCAPIRequest(enums_1.HttpMethodsEnum.Get, `${basePath}/test`, sdkConfig.REQUEST_TIMEOUT);
        expect(response.statusCode()).toStrictEqual(400);
        const respBody = await response.responseBodyToJSON();
        expect(respBody).toStrictEqual(default_response_body);
        scope.isDone();
    });
});
