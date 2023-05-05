const arithmeticController = require('../api/controllers/arithmeticController');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('Arithmetic Controller', () => {
  describe('GET /calculate', () => {
    it('should add two numbers', (done) => {
      chai.request(server)
        .get('/calculate?operation=add&operand1=1&operand2=2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result').eql(3);
          done();
        });
    });

    it('should subtract two numbers', (done) => {
      chai.request(server)
        .get('/calculate?operation=subtract&operand1=4&operand2=2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result').eql(2);
          done();
        });
    });

    it('should multiply two numbers', (done) => {
      chai.request(server)
        .get('/calculate?operation=multiply&operand1=3&operand2=4')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result').eql(12);
          done();
        });
    });

    it('should divide two numbers', (done) => {
      chai.request(server)
        .get('/calculate?operation=divide&operand1=10&operand2=2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result').eql(5);
          done();
        });
    });

    it('should return 400 if operation is not specified', (done) => {
      chai.request(server)
        .get('/calculate?operand1=1&operand2=2')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Unspecified operation');
          done();
        });
    });

    it('should return 400 if operand1 is invalid', (done) => {
      chai.request(server)
        .get('/calculate?operation=add&operand1=abc&operand2=2')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.have.property('error').eql('Unspecified operation');
        })
      });

      it('should return 400 if operand2 is invalid', (done) => {
        chai.request(server)
          .get('/calculate?operation=add&operand1=1&operand2=xyz')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Invalid operand2: xyz');
            done();
          });
      });
      
      it('should return 400 if both operands are invalid', (done) => {
        chai.request(server)
          .get('/calculate?operation=add&operand1=abc&operand2=xyz')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Invalid operand1: abc');
            done();
          });
      });
    });
  });     
