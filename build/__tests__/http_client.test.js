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
const httpsClient_1 = __importDefault(require("../httpsClient"));
describe('HTTPS client tests', () => {
    const sdkConfig = global.sdkConfig;
    const basePath = `/${sdkConfig.CLOUD_API_VERSION}/${sdkConfig.WA_PHONE_NUMBER_ID}`;
    const reqHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sdkConfig.CLOUD_API_ACCESS_TOKEN}`,
    };
    const client = new httpsClient_1.default();
    let scope;
    afterEach(() => {
        nock_1.default.restore();
    });
    it('Send a POST request', async () => {
        scope = (0, nock_1.default)(`https://${sdkConfig.WA_BASE_URL}`, {
            reqheaders: {
                authorization: `Bearer ${sdkConfig.CLOUD_API_ACCESS_TOKEN}`,
            },
        })
            .post(/.*/)
            .delayConnection(100)
            .delay(200)
            .reply((uri, res_body) => {
            return [200, res_body];
        });
        const reqBody = { testKey: 'testValue' };
        const response = await client.sendRequest(sdkConfig.WA_BASE_URL, 443, `${basePath}/test`, enums_1.HttpMethodsEnum.Post, reqHeaders, sdkConfig.REQUEST_TIMEOUT, JSON.stringify(reqBody));
        expect(response.statusCode()).toEqual(200);
        const respBody = await response.responseBodyToJSON();
        expect(respBody).toStrictEqual(reqBody);
        scope.isDone();
    });
});
