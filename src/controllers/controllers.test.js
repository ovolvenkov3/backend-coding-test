// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
// eslint-disable-next-line node/no-unpublished-require
const {expect} = require('chai');
const app = require('../app');
const {
  FIELDS_TO_CHECK,
  RIDES_NOT_FOUND_ERROR,
  SAMPLE_REQUEST_BODY,
  SAMPLE_RESPONSE,
} = require('../../tests/instanceses');
const {NOT_FOUND} = require('../error/errorCodes');

describe('API controllers tests', () => {

  describe('/rides', () => {
    it('should return an error with no Rides found after GET request', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
        .expect(NOT_FOUND, done);
    });

    it('should return a new Rides entity after POST request', (done) => {
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

    it('should return Rides found after GET request', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => expect(res.body.length).to.eql(1))
        .expect(200, done);
    });
  });

  describe('/rides/:id', () => {
    it('should return a Rides entity with a specified ID after GET request', (done) => {
      request(app)
        .get(`/rides/1`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          expect(res.body).to.have.keys(...Object.keys(SAMPLE_RESPONSE));
          expect(res.body).to.include({'rideID': 1});
        })
        .expect(200, done);
    });

    it('should return an error after GET request for the Rides entity with wrong ID', (done) => {
      request(app)
        .get(`/rides/777`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => expect(res.body).to.eql(RIDES_NOT_FOUND_ERROR))
        .expect(404, done);
    });
  });

  describe('/health', () => {
    it('should return health after GET request', (done) => {
      request(app)
        .get('health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});