'use strict';

import app from '../index';
import chai from 'chai';
import request from 'supertest';
import data from './support/test-data/phone-numbers';
import chaiHttP  from 'chai-http';
chai.use(chaiHttP);
const api = new request(app);
const expect = chai.expect;
const should = chai.should();
const baseUrl = '/phone-number-generator/api'

describe('Phone Numbers : /phonenumbers', () => {
      describe('create phone numbers', () => {
        it('POST: Can generate phone numbers', async () => {
            const res = await api
            .post(`${baseUrl}/phonenumbers/`)
            .send(
              data.phoneNumberGenerator
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(201)
            expect(res.body).should.be.a('Object')
            expect(res.body).should.have.property('status');
            expect(res.body.status).to.be.eql('success');
            expect(res.body.data.PhoneNumbers.message).to.be.eql(`Successfully generated ${data.phoneNumberGenerator.NumberToGenerate} numbers`);
        })

        it('POST: Cannot generate more than 10,000 phone numbers', async () => {
             const res = await api
             .post(`${baseUrl}/phonenumbers/`)
             .send(
               data.phoneNumberLimit
             )
             .set('Accept', 'application/json')
             expect(res).to.have.status(400)
             expect(res.body).should.be.a('Object')
             expect(res.body.status).to.be.eql('fail');
             expect(res.body.data.message).to.be.eql(`Oops You have exceeded the 10,000  number generation limit`);
         })

         it('POST: Cannot save files to an external storage', async () => {
         await api
          .post(`${baseUrl}/phonenumbers/`)
          .send(
            data.phoneNumberGenerator
          )
          const res = await api
          .post(`${baseUrl}/phonenumbers/save`)
          .set('Accept', 'application/json')
          expect(res).to.have.status(201)
          expect(res.body).should.be.a('Object')
          expect(res.body.status).to.be.eql('success');
          expect(res.body.data.message).to.be.eql(`successfully saved phone numbers to file storage`);
      })

        it('GET: Can get generated phone numbers', async () => {
             await api
             .post(`${baseUrl}/phonenumbers/`)
             .send(
               data.phoneNumberGenerator
             )
             const response = await api
             .get(`${baseUrl}/phonenumbers/`)
             
             .set('Accept', 'application/json')
             expect(response).to.have.status(200)
             expect(response.body).should.be.a('Object')
             expect(response.body.status).to.be.eql('success');
             expect(response.body.data.PhoneNumbers).to.have.property('numbersGenerated');
             expect(response.body.data.PhoneNumbers).to.have.property('largestGeneratedNumber');
             expect(response.body.data.PhoneNumbers).to.have.property('smallestGeneratedNumber');
             expect(response.body.data.PhoneNumbers).to.have.property('generateNumbers');
         })

         it('GET: Can sort generated numbers in acending order', async () => {
             await api
             .post(`${baseUrl}/phonenumbers/`)
             .send(
               data.phoneNumberGenerator
             )
             const response = await api
             .get(`${baseUrl}/phonenumbers/ascending`)
             
             .set('Accept', 'application/json')
             expect(response).to.have.status(200)
             expect(response.body).should.be.a('Object')
             expect(response.body.status).to.be.eql('success');
             expect(response.body.data.PhoneNumbers).to.have.property('numbersGenerated');
             expect(response.body.data.PhoneNumbers).to.have.property('largestGeneratedNumber');
             expect(response.body.data.PhoneNumbers).to.have.property('smallestGeneratedNumber');
             expect(response.body.data.PhoneNumbers).to.have.property('generateNumbers');
         })

         it('GET: Can sort generated numbers in descending order', async () => {
         
             await api
             .post(`${baseUrl}/phonenumbers/`)
             .send(
               data.phoneNumberGenerator
             )
             const response = await api
             .get(`${baseUrl}/phonenumbers/descending`)
             
             .set('Accept', 'application/json')
             expect(response).to.have.status(200)
             expect(response.body).should.be.a('Object')
             expect(response.body.status).to.be.eql('success');
             expect(response.body.data.PhoneNumbers).to.have.property('numbersGenerated');
             expect(response.body.data.PhoneNumbers).to.have.property('largestGeneratedNumber');
             expect(response.body.data.PhoneNumbers).to.have.property('smallestGeneratedNumber');
             expect(response.body.data.PhoneNumbers).to.have.property('generateNumbers');
         })

         it('Delete: Can delete generated phone numbers', async () => {
             await api
             .post(`${baseUrl}/phonenumbers/`)
             .send(
               data.phoneNumberGenerator
             )
             const response = await api
             .delete(`${baseUrl}/phonenumbers/`)
             
             .set('Accept', 'application/json')
             expect(response).to.have.status(200)
             expect(response.body).should.be.a('Object')
             expect(response.body.status).to.be.eql('success');
             expect(response.body.data.message).to.be.eql('Successfully cleared the phone number storage');
         })
    });
});