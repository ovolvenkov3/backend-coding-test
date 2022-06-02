'use strict';

// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const db = require('../src/dataBase/dataBase');

const app = require('../src/app');
const {SAMPLE_REQUEST_BODY, SAMPLE_RESPONSE, FIELDS_TO_CHECK, RIDES_NOT_FOUND_ERROR} = require("./instanceses");
// eslint-disable-next-line node/no-unpublished-require
const {expect} = require("chai");

describe('API tests', () => {
    before(() => {
        return db.createTables();
    });

    after(() => {
        return db.runAsync('DELETE FROM Rides');
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /swagger-docs', () => {
        it('should return documentation', (done) => {
            request(app)
              .get('/swagger-docs')
              .expect('Content-Type', /html/)
              .expect(301, done);
        });
    });

    describe('GET /rides', () => {
        it('should return Rides ', () => {
            request(app)
              .get('/rides')
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR));
        });
    });


    describe('POST /rides', () => {
        it('should return a new Rides ', (done) => {
            request(app)
              .post('/rides')
              .send(SAMPLE_REQUEST_BODY)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect((res) => {
                  expect(res.body).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
                  expect(res.body).to.include(FIELDS_TO_CHECK);
              })
              .expect(201, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return a Rides entity with a specified ID after GET request', (done) => {
            request(app)
              .get(`/rides/1`)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect((res) => {
                  expect(res.body[0]).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
                  expect(res.body[0]).to.include({'rideID': 1});
              })
              .expect(200, done);
        });

        it('should return an error after GET request for the Rides entity with wrong ID', (done) => {
            request(app)
              .get(`/rides/777`)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect((res) => expect(res.body.message).to.eql(RIDES_NOT_FOUND_ERROR.message))
              .expect(404, done);
        });
    });
});