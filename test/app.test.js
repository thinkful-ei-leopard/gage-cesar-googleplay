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
    });
    it('should return a sorted array if given a valid sort query', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: 'rating'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          let i = 1, sorted = true;
          while(sorted && i < res.body.length - 1) {
            sorted = sorted  && res.body[i].Rating <= res.body[i - 1].Rating;
            i++;
          }
          expect(sorted).to.be.true;
        })
    });
    it('should return 400 when the sort parameter is invalid', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: 'invalid'})
        .expect(400, 'The sort method you picked is invalid. Please make sure it is either by \'rating\' or by \'app\'');
    });
  });
});