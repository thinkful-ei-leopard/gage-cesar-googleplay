const supertest = require('supertest');
const app = require('../src/app');
const expect = require('chai').expect;

describe('App module', () => {
  describe('GET /apps', () => {
    it('should return 200 and JSON data of apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
        });
    });
    it('should return 400 when the genres parameter is invalid', () => {
      return supertest(app)
        .get('/apps')
        .query({ genres: 'invalid'})
        .expect(400, 'You have queried an invalid genre. Please look at your "genres" param');
    })
  });
});