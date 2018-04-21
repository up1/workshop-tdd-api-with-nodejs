/* eslint-env mocha */
'use strict';
// Configure the environment
const env = process.env.NODE_ENV || 'test';
const config = require('../knexfile')[env];
const server = require('../server/index');
const knex = require('knex')(config);

// Assertion library
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// For test
const PATH = '/api/beer';

describe('routes of beer', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });

  // First test case
  describe(`Try to GET ${PATH}`, () => {
    it('should return all beer from database', done => {
      chai
        .request(server)
        .get(`${PATH}`)
        .end((err, res) => {
          console.log(res);
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys(
            'id',
            'name',
            'description',
            'brand'
          );
          done();
        });
    });
  });

  // Second test case
  describe(`Try to GET ${PATH}/:id`, () => {
    it('should return a single beer', done => {
      chai
        .request(server)
        .get(`${PATH}/1`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.data.length.should.eql(1);
          res.body.data[0].should.include.keys(
            'id',
            'name',
            'description',
            'brand'
          );
          done();
        });
    });

    it('should return error when beer does not existed in database', done => {
      chai
        .request(server)
        .get(`${PATH}/100`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.error.should.eql('Beer does not exists');
          done();
        });
    });
  });
});
