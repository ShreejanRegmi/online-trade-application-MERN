if (process.env.NODE_ENV != "test") {
    process.env.NODE_ENV = "test";
}

let chai = require('chai');
let http = require('../server').http;
let request = require('supertest');
let jwt = require('jsonwebtoken');
let config = require('config');

const userCred = {
    email: 'hira@gmail.com',
    password: 'hira123'
}

// const _id = "5e3d883f6c8e243d1c2ec148";

// var authenticatedUser = request.agent(http);

let token = '';

before(() => {
    // const rootToken = jwt.sign({ id: _id }, config.get('jwtKey'));
    // token = `Bearer ${rootToken}`;

})

describe('Login API', () => {
    describe('POST /users/login', () => {

        it('should Login', () => {
            request(http).post('/users/login').send({ email: userCred.email, password: userCred.password }).then((res) => {
                token = `Bearer ${res.body.token}`;
            })
        })

        it('should not Login', (done) => {
            request(http).post('/users/login').send({ email: 'nouser@gmail.com', password: userCred.password }).expect(404, done);
        })

    })

})


describe('Furniture API', () => {
    describe('GET /profileFurnitures', () => {

        it('it should not GET all furnitures added by loggedin user', (done) => {
            request(http).get('/profileFurnitures').set('Authorization', 'no toekn').expect(401, done);
        })
    })

    describe('GET /furniture/:id', () => {
        const furid = "5e687ae971ecd817dc3f36d4";
        it('it should GET a single furniture', (done) => {
            request(http).get('/furniture/' + furid).expect(200, done);
        })
    })

    describe('POST /furniture', () => {
        it('it should not POST a furniture', (done) => {
            request(http).post('/furniture').send({}).expect(401, done);
        })
    })

    describe('POST /furniture', () => { //implementation remaining
        it('should POST furniture', () => {
            const furniture = {};
            furniture.should.be.a('object');
        })
    })

})

describe('Computer API', () => {
    describe('GET /profileComputers', () => {

        it('it should not GET all computers added by loggedin user', (done) => {
            request(http).get('/profileComputers').set('Authorization', 'no toekn').expect(401, done);
        })
    })

    describe('GET /comuter/:id', () => {
        const compid = "5e687b9d71ecd817dc3f36d7";
        it('it should GET a single computer', (done) => {
            request(http).get('/computer/' + compid).expect(200, done);
        })
    })

    describe('POST /computer', () => {
        it('it should not POST a computer', (done) => {
            request(http).post('/computer').send({}).expect(401, done);
        })
    })

    describe('POST /computer', () => { //implementation remaining
        it('should POST computer', () => {
            const computer = {};
            computer.should.be.a('object');
        })
    })

})

describe('Wishlist API', () => {

    describe('POST /wishlist', () => {
        it('should POST wishlist', () => { //implementation remaining
            const wishlist = {};
            wishlist.should.be.a('object');
        })

        it('it should not POST a wishlist', (done) => {
            request(http).post('/wishlist').send({}).expect(401, done);
        })
    })

    describe('GET /wishlist', () => {
        it('it should not GET wishlists', (done) => {
            request(http).get('/wishlist').expect(401, done);
        })
    })

    describe('DELETE /allWishlist', () => {
        it('it should not DELETE wishlists', (done) => {
            request(http).delete('/allWishlist').expect(401, done);
        })
    })

})

describe('User Registration/Update API', () => {
    describe('POST /users', () => {
        user = {
            firstname: 'firstname',
            lastname: 'lastname',
            email: 'email@email.com',
            address: 'address',
            password: 'password',
            phone: '1234567890'
        }
        user2 = {
            firstname: '',
            lastname: 'lastname',
            email: 'email@email.com',
            address: 'address',
            password: 'password',
            phone: '1234567890'
        }
        it('it should not POST a user', (done) => {
            request(http).post('/users').send(user2).expect(422, done);
        })
        it('it should POST a user', (done) => {
            request(http).post('/users').send(user).expect(201, done);
        })
    })

    describe('PATCH /users', () => {
        it('it should not PATCH a user', (done) => {
            request(http).patch('/users').send({}).expect(401, done);
        })
    })
    

})


