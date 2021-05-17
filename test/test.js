const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);


describe('Testiranje servera', function () {
    let grad = { id: 90, naziv: 'Istambul', broj_stanovnika: 99999 };

    describe('GET', () => {

        it('GET /api/grad', (done) => {
            chai.request(app)
                .get('/gradovi')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('naziv');
                    done();
                });
        });
    });

    describe('POST', () => {

        it('POST /api/grad', (done) => {

            chai.request(app)
                .post('/grad')
                .send(grad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('naziv');
                    done();
                });
        });
    });

    describe('/GET/:id ', () => {
        it('it should GET a gradovi given the id', (done) => {
            chai.request(app)
                .get('/gradovi/' + grad.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('naziv').eql('Istambul');
                    done();
                });
        });

    });


    describe('/PUT/:id ', () => {
        it('it should PUT a gradovi given the id', (done) => {
            chai.request(app)
                .put('/gradovi/' + grad.id)
                .send({ naziv: "Kiseljak", broj_stanovnika: "999412" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Updated!');
                    done();
                });
        });

    });


    describe('/DELETE/:id ', () => {
        it('it should DELETE a grad given the id', (done) => {
            chai.request(app)
                .delete('/gradovi/' + grad.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('Deleted!');
                    done();
                });
        });

    });


});