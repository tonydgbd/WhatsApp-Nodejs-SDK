/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { WAConfigType } from './types/config';
import { WhatsAppClass } from './types/WhatsApp';
import * as SDKEnums from './types/enums';
import { semanticVersionString } from './types/version';
import Requester from './requester';
import MessagesAPI from './api/messages';
import PhoneNumbersAPI from './api/phoneNumbers';
import TwoStepVerificationAPI from './api/twoStepVerification';
import WebhooksAPI from './api/webhooks';
export default class WhatsApp implements WhatsAppClass {
    config: WAConfigType;
    sdkVersion: Readonly<semanticVersionString>;
    requester: Readonly<Requester>;
    readonly messages: MessagesAPI;
    readonly phoneNumbers: PhoneNumbersAPI;
    readonly twoStepVerification: TwoStepVerificationAPI;
    readonly webhooks: WebhooksAPI;
    static readonly Enums: typeof SDKEnums;
    constructor(senderNumberId?: number);
    version(): semanticVersionString;
    private userAgent;
    updateTimeout(ms: number): boolean;
    updateSenderNumberId(phoneNumberId: number): boolean;
    updateAccessToken(accessToken: string): boolean;
}
