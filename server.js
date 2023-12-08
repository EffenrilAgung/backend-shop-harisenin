const express = require('express');
const path = require('path');

const testConnectionDatabase = require('./util/testConnectionDatabase');
const router = require('./routers');
const errorHandlerMiddleware = require('./middleware/handle-error');
const notFound = require('./middleware/not-found');

const app = express();
const port = process.env.PORT || 4000;
const routing = '/api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routing, router);

// Error Handling
app.use(errorHandlerMiddleware);
// Error Routing Not Found
app.use('*', notFound);

app.listen(port, async () => {
	testConnectionDatabase();
	console.log(`Example app listening on port ${port}`);
});
