import { Request, Response } from 'express';

import exampleData from '../data/exampleData.json';
import dataSchema from '../models/schema'
import Types, { validType } from '../types/types'

function checkValue(value: string, iteration: string): string[] {
    for (const type in Types) {
        if (value === type || value === type.concat("[]")) {
            return ["type", value, iteration];
        }
    }

    return ["value", value, iteration];
}

function split(array: string[][], object: any, iteration: number) {
    if (typeof object === 'object' && !Array.isArray(object)) {
        for (let [key, value] of Object.entries(object)) {  
            if (key !== "dataType") {
                array.push(checkValue(key, iteration.toString()));
            }
            split(array, value, iteration+1);
        }
    } else {
        array.push(checkValue(object, iteration.toString()));
    }
}

function compareDataWithSchema(data: string[][], schema: string[][]): boolean {  
    for (let i = 1; i < schema.length; i++) {
        if (schema[i-1][0] === "value" && schema[i][0] === "type") {
            let compareVal = +schema[i][2]-1;
           
            if (data[i-1][0] !== "value") {
                return false;
            }
            
            if (data[i-1][1] !== schema[i-1][1]) {
                return false;
            }

            if (data[i][2] !== compareVal.toString()) {
                return false;
            }

            for (const type in Types) {
                if (schema[i][1] === type) {
                    if (!validType(type as unknown as Types, data[i][1])) {
                        return false;
                    }
                } else if (schema[i][1] === type.concat("[]")) {
                    if (typeof data[i][1] === "string" || typeof data[i][1] === "number") {
                        return false;
                    }
                    
                    for (let j = 0; j < data[i][1].length; j++) {
                        if (!validType(type as unknown as Types, data[i][1][j])) {
                            return false;
                        }
                    }
                }
            }
        } else {
            for (let j = 0; j < 3; j++) {
                if (data[i][j] !== schema[i][j]) {
                    return false;
                }
            }
        }
    }

    return true;
}

const getData = (req: Request, res: Response) => {
    const data = exampleData;
    const schema = dataSchema;

    let dataResult: string[][] = [];
    let schemaResult: string[][] = [];

    for (let [key, value] of Object.entries(data)) {
        dataResult.push(checkValue(key, "0"));
        split(dataResult, value, 0);
        dataResult.push(["/"]);
    }

    for (let [key, value] of Object.entries(schema)) {
        schemaResult.push(checkValue(key, "0"));
        split(schemaResult, value, 0);
        schemaResult.push(["/"]);
    }

    console.log(dataResult);
    console.log(schemaResult);

    if (compareDataWithSchema(dataResult, schemaResult)) {
        res.status(200).json({
            schema: schema,
            data: data
        });
    } else {
        res.status(400).json({
            error: "data does not correspond with schema"
        })
    }
};

export = getData;