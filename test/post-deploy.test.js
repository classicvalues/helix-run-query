/*
 * Copyright 2018 Adobe. All rights reserved.
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
const chai = require('chai');
const chaiHttp = require('chai-http');
const { createTargets } = require('./post-deploy-utils.js');

chai.use(chaiHttp);
const { expect } = chai;

createTargets().forEach((target) => {
  describe(`Post-Deploy Tests (${target.title()}) https://${target.host()}${target.urlPath()}`, () => {
    before(function beforeAll() {
      if (!target.enabled()) {
        this.skip();
      }
    });

    it('Most Visited', async () => {
      const path = `${target.urlPath()}/most-visited`;
      // eslint-disable-next-line no-console
      console.log(`testing ${target.host()}${path}`);
      await chai
        .request(target.host())
        .get(path)
        .then((response) => {
          expect(response).to.have.status(200);
          expect(response).to.have.header('Content-Type', /^application\/json/);
        }).catch((e) => {
          throw e;
        });
    }).timeout(60000);

    it('Service reports status', async () => {
      const path = `${target.urlPath()}/_status_check/healthcheck.json`;
      // eslint-disable-next-line no-console
      console.log(`testing ${target.host()}${path}`);
      await chai
        .request(target.host())
        .get(path)
        .then((response) => {
          expect(response).to.have.status(200);
          expect(response).to.have.header('Content-Type', /^application\/json/);
        }).catch((e) => {
          throw e;
        });
    }).timeout(10000);
  }).timeout(10000);
});
