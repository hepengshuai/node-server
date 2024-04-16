import express from 'express';
import bodyParser from 'body-parser';

export const add = (x, y) => x + y;

export const web = express();
web.use(bodyParser.json());

export const runWeb = (port) => {
    web.listen(port, () => console.log('Web server running on port', port));
}
