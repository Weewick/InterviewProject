import express, { Router } from 'express';
import getData from '../controllers/dataController'

const router: Router = express.Router();

router.get('/', getData);

export = router;