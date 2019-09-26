/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */

'use strict';

const assert = require('assert');
const index = require('../src/index.js').main;
const util = require('../src/util.js');

describe('Index Tests', () => {
  it('index function is present', async () => {
    const result = await index({
      GOOGLE_CLIENT_EMAIL: util.email, 
      GOOGLE_PRIVATE_KEY: util.key, 
      GOOGLE_PROJECT_ID: util.projectid,
      params: { limit: 10 }
    });
  }).timeout(2000);

  it('index function returns an object', async () => {
    const result = await index({
      GOOGLE_CLIENT_EMAIL: util.email, 
      GOOGLE_PRIVATE_KEY: util.key, 
      GOOGLE_PROJECT_ID: util.projectid,
      params: { limit: 10 }
    });
    assert.equal(typeof result, 'object');
    assert.ok(Array.isArray(result.body.results));
  }).timeout(2000);

  it('index function returns 500 on error', async () => {
    const result = await index({
      GOOGLE_CLIENT_EMAIL: util.email, 
      GOOGLE_PRIVATE_KEY: 'util.key', 
      params: { limit: 10 }
    });
    assert.equal(typeof result, 'object');
    assert.equal(result.statusCode, 500)
  }).timeout(2000);

  
});
