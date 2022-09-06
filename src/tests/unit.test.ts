import 'jest';
import express, { Application } from 'express';
import { faker } from '@faker-js/faker';
// import dotenv from 'dotenv';
import * as supertestRequest from 'supertest';
const request = require('supertest');

// import * as express from 'express';
import { App } from '../app';

let app: Application = express();

describe('status integration tests', () => {
  beforeAll(async () => {
  });
  beforeEach(async () => {
  });
  it('hello world', async () => {
    await request(app)
      .get('/')
      .expect(200)
  });
});
