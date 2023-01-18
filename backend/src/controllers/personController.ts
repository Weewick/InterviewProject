import { Request, Response } from 'express';

import examplePerson from '../data/examplePerson.json';
import personSchema from '../models/schema'

const getPerson = (req: Request, res: Response) => {
    const person = examplePerson;
    const schema = personSchema;
    
    res.status(200).json({
        schema: schema,
        person: person
    });
};

export = getPerson;