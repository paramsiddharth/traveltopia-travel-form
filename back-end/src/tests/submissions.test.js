/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const chai = require('chai');
const http = require('chai-http');

const should = chai.should();
const expect = chai.expect;

chai.use(http);

const Submission = require('../models/submission');
const app = require('../index');

let state = {};

describe('GET /api/submissions', () => {
  it('should retrieve all submissions', async () => {
    const resp = await chai.request(app)
      .get('/api/submissions')
      .send();
    
    state.submissions = resp.body.submissions;

    resp.should.have.status(200);
    resp.body.submissions.should.be.a('array');
    resp.body.total.should.be.a('number');
    resp.body.page.should.be.a('number');
  });
});

describe('GET /api/submissions/:id', () => {
  it('should retrieve a submission', async () => {
    if (state.submissions.length > 0) {
      const [{ _id: id }] = state.submissions;
      console.log('Retrieving submission ID', id);

      const resp = await chai.request(app)
        .get('/api/submissions/' + id)
        .send();

      resp.should.have.status(200);
      resp.body.should.be.a('object');
      resp.body.should.have.property('_id').eql(id);
      resp.body.should.have.property('name');
      resp.body.should.have.property('email');
      resp.body.should.have.property('destination');
      resp.body.should.have.property('travellerCount');
      resp.body.should.have.property('budgetPerPerson');
    } else {
      console.log('Skipping (0 submissions)');
    }
  });
});

describe('POST /api/submissions', () => {
  const data = {
    name:            'Param Siddharth',
    email:           'me@paramsid.com',
    destination:     'India',
    travellerCount:  1,
    budgetPerPerson: 1500
  };

  it('should create a new submission', async () => {
    const resp = await chai.request(app)
      .post('/api/submissions')
      .send(data);

    state.newSubmission = resp.body;

    resp.should.have.status(200);
    resp.body.should.be.a('object');
    resp.body.should.have.property('_id');
    resp.body.should.have.property('name');
    resp.body.should.have.property('email');
    resp.body.should.have.property('destination');
    resp.body.should.have.property('travellerCount');
    resp.body.should.have.property('budgetPerPerson');
  });

  it('should retrieve the same submission', async () => {
    const resp = await chai.request(app)
      .get('/api/submissions')
      .send();

    resp.should.have.status(200);
    expect(resp.body.submissions).to.be.a('array');
    expect(resp.body.submissions[0]).to.have.property('_id').eql(state.newSubmission._id);
    expect(resp.body.submissions[0]).to.be.eql(state.newSubmission);
  });

  it('should retrieve the same submission uniquely', async () => {
    const resp = await chai.request(app)
      .get('/api/submissions/' + state.newSubmission._id)
      .send();

    resp.should.have.status(200);
    resp.body.should.be.a('object');
    resp.body.should.have.property('_id').eql(state.newSubmission._id);
    resp.body.should.be.eql(state.newSubmission);
  });
});

describe('GET /api/csv', () => {
  it('should retrieve a CSV file', async () => {
    const resp = await chai.request(app)
      .get('/api/csv')
      .send();
    
    resp.should.have.status(200);
    expect(resp.header['content-type']).to.match(/^text\/csv/);
  });
});