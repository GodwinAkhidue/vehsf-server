import express from 'express';
import get_one from './get-one/route.js';

const hero = express();
hero.use('', get_one);

export default hero;