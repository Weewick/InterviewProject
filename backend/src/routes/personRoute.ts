import express, { Router, Request, Response } from 'express';
import getPerson from '../controllers/personController'

const router: Router = express.Router();

router.get('/', getPerson);

export = router;