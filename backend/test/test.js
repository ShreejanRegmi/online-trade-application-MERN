process.env.NODE_ENV = "test";
let chai = require('chai');
let chaiHttp = require('chai-http');
let http = require('../server').http;

//assertion style
chai.should();
chai.use(chaiHttp);

describe('Feedback API', () => {

    //test the GET all feedback route
    describe('GET /allFeedbacks', () => {

        it('It should GET all the feedbacks', (done) => {
            chai.request(http).get('/allFeedbacks').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })

        it('It should NOT GET all the feedbacks', (done) => {
            chai.request(http).get('/allFeedback').end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })

    })

    //test the GET last unreviewed feedback
    describe('GET /lastFeedback', () => {
        it('It should GET the latest unreviewed feedback', (done) => {
            chai.request(http).get('/lastFeedback').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    //test the GET all feedback number
    describe('GET /allFeedbacksNumber', () => {
        it('It should GET the total number of feedbacks present in the collection as an object', (done) => {
            chai.request(http).get('/allFeedbacksNumber').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
        })
    })

    //test POST create new feedback
    describe('POST /feedbacks', () => {

        it('It should POST a new feedback', (done) => {
            const feedback = {
                firstname: 'firstname',
                lastname: 'lastname',
                email: 'email@email.com',
                message: 'message'
            }
            chai.request(http).post('/feedbacks').send(feedback).end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                res.body.should.have.property('message');
                res.body.should.have.property('email');
                done();
            })
        })

        it('It should not POST a new feedback', (done) => {
            const feedback = {
                firstname: '',
                lastname: 'lastname',
                email: 'email@email.com',
                message: 'message'
            }
            chai.request(http).post('/feedbacks').send(feedback).end((err, res) => {
                res.should.have.status(400);
                done();
            })
        })

    })

})

/*
* Category API Testing
*/

describe('Category API', () => {

    describe('GET /categories', () => {

        it('It should GET all the categories', (done) => {
            chai.request(http).get('/categories').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })

        it('It should not GET all the categories', (done) => {
            chai.request(http).get('/categorie').end((err, res) => {
                res.should.have.status(404);
                done();
            })
        })
    })

})

