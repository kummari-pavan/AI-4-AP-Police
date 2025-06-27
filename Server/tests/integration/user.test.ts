import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();
describe('User APIs Test', () => {

  before(async () => {
    const clearCollections = async () => {
      for (const users in mongoose.connection.collections) {
        await mongoose.connection.collections[users].deleteMany({});
      }
    };

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_TEST || "Testing Purpose");
      await clearCollections();
    } else {
      await clearCollections();
    }
  });

  const userData = {
    name: 'Pavan',
    email: 'kpavan@gmail.com',
    username: 'pavan180185',
    password: 'pavan180185'
  };


  let token: string; 
  let createdNoteId:string;

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app.getApp())
        .post('/api/v1/users')
        .send(userData);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'User registered successfully');
    });
  });


  describe('User Login', () => {
    it('should log in an existing user successfully', async () => {
      const res = await request(app.getApp())
        .post('/api/v1/users/login')
        .send({ email: userData.email, password: userData.password });
  
      console.log('Login Response:', res.body); // Log the response to inspect it
  
      // Assuming token is directly under `res.body.data.token`
      token = res.body.user;
  
      expect(res.status).to.equal(200);
      expect(token).to.exist; // Ensure token exists before using it
    });
  });
  
  describe('Forgot Password', () => {
    it('should send a reset token to the user\'s email', async function() { 
        this.timeout(10000); // Increase timeout to 10 seconds

        const res = await request(app.getApp())
            .post('/api/v1/users/forgot-password')
            .send({ email: userData.email });

        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Reset token sent to email successfully');
    });
   });
});




