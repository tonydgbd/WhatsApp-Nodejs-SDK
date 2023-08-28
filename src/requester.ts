/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import HttpsClient from './httpsClient';
import Logger from './logger';
import { HttpMethodsEnum } from './types/enums';
import { GeneralHeaderInterface, RequesterClass } from './types/requester';

const LIB_NAME = 'REQUESTER';
const LOG_LOCAL = false;
const LOGGER = new Logger(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);

export default class Requester implements RequesterClass {
	client: Readonly<HttpsClient>;
	accessToken: Readonly<string>;
	phoneNumberId: Readonly<number>;
	businessAcctId: Readonly<string>;
	appId: Readonly<string>;
	apiVersion: Readonly<string>;
	userAgent: Readonly<string>;
	host: Readonly<string>;
	protocol: Readonly<string> = 'https:';
	port: Readonly<number> = 443;

	constructor(
		host: string,
		apiVersion: string,
		phoneNumberId: number,
		accessToken: string,
		businessAcctId: string,
		appId: string,
		userAgent: string,
	) {
		this.client = new HttpsClient();
		this.host = host;
		this.apiVersion = apiVersion;
		this.phoneNumberId = phoneNumberId;
		this.accessToken = accessToken;
		this.businessAcctId = businessAcctId;
		this.appId = appId;
		this.userAgent = userAgent;
	}

	buildHeader(contentType: string): GeneralHeaderInterface {
		const headers: GeneralHeaderInterface = {
			'Content-Type': contentType,
			'Authorization': `Bearer ${this.accessToken}`,
			'User-Agent': this.userAgent,
		};
		return headers;
	}

	buildCAPIPath(endpoint: string): string {
		console.log(this.businessAcctId);
		if (endpoint.startsWith('media@'))
			return `/${this.apiVersion}/${endpoint.split('@')[1]}`;
		else if (endpoint.startsWith('template@'))
			return `/${this.apiVersion}/${this.appId}/${endpoint.split('@')[1]}`;
		return `/${this.apiVersion}/${this.phoneNumberId}/${endpoint}`;
	}

	async sendCAPIRequest(
		method: HttpMethodsEnum,
		endpoint: string,
		timeout?: number,
		body?: any,
	) {
		const contentType = 'application/json';

		LOGGER.log(
			`${method} : ${this.protocol.toLowerCase()}//${this.host}:${
				this.port
			}/${this.buildCAPIPath(endpoint)}`,
		);

		return await this.client.sendRequest(
			this.host,
			this.port,
			this.buildCAPIPath(endpoint),
			method,
			this.buildHeader(contentType),
			timeout || 20000,
			method == 'POST' || method == 'PUT' ? body : undefined,
		);
	}
}
