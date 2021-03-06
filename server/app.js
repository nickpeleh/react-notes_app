import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config.js';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/notes', (req, res) => {
	db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
	db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
	db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(config.listenPort, () => {
	console.log(`Server is up and running on port ${config.listenPort}`);
});