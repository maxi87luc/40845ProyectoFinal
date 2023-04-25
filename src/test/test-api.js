import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

import {testAddProduct, testSignin } from './httpclient.js'

const api = request('http://localhost:8080')

describe('Test api productos', () => {
    describe('GET /api/productos/all', () => {
      beforeEach(async () => {
        testAddProduct()
      });
  
      it('should return 200 OK and a array of products', async () => {
        const response = await api.get('/api/productos/all');
  
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.an('array');
        
      });
    });
  
    
    
})
