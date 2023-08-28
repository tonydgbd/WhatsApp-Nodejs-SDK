/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RequesterResponseInterface } from '../types/requester';
import BaseAPI from './base';
import * as pn from '../types/phoneNumbers';
export default class PhoneNumbersAPI extends BaseAPI implements pn.phoneNumbersClass {
    private readonly commonMethod;
    requestCode(body: pn.RequestCodeObject): Promise<RequesterResponseInterface<pn.PhoneNumbersResponseObject>>;
    verifyCode(body: pn.VerifyCodeObject): Promise<RequesterResponseInterface<pn.PhoneNumbersResponseObject>>;
}
