var express = require('express');

var app = express();

app.get('/user', function (req, res) {
	res.send('hello');
});

app.get('/user/:id', function (req, res) {
	res.send('the user id is: ' + req.params.id);
});

app.put('/user', function (req, res) {
	res.send('hello');
});

app.delete('/user/:id', function (req, res) {
	res.send('hello');
});

app.post('/user/:id', function (req, res) {
	res.send('hello');
});

app.get('/user/:id/table', function (req, res) {
	res.send('hello');
});






app.get('/hello/:name/:lastName', function (req, res) {
	res.send('hello ' + req.params.name + req.params.lastName + ' end');
});

app.get('/user/:library/:floor/:room', function (req, res) {
	res.send('retrieving the table-map of room: ' + req.params.room + ' in floor: ' + req.params.floor + ' in library: ' + req.params.library);
});

app.get('', function (req, res) {
	res.send('hello get()');
});


app.listen(3000);


// hostname: table-app.com
// routes:
//   user:
//		- GET /user - index
//		- GET /user/:id - show 
//		- PUT /user - create
//		- DELETE /user - delete
//		- POST /user/:id - update
//		- GET /user/reservation - get user reservation
//	 table:
//		- GET /table - index/list
//		- GET /table/:id - show 
//		- PUT /table - create
//		- DELETE /table - delete
//		- POST /table/:id - update
//		- POST /table/:id/reserve - reserve a table

// Requirements for Wednesday:
// 1. 	(A) a table sends a "post" request, whenever the status of its vacancy is changed - I should be able to update accordingly.
//		(B) when I want to change a table status (to serve a user who orders a table) - I send a request to the table (we still don't know how to implement on amit's side).

// 2.	(A)	from the app: getTablesMapInRoom(library, floor, room)
//		(B) from the app: order a table - orderATable(table_id, (optional) location )

// 3. 	How do things get connected to Azure? how do they "talk" to each other?
// 		how exactly does the server thing work again?? the file, where is it saved, how does the web page know where to look,
//			...how does Azure have to do with all of that, HOW DO WE GET TO A WORKING SYSTEM ??? WE CAN"T GET THE RPI TALK TO THE SERVER !!!
//		(A) What kind of responses can the server provide? what else other than "res.send()"?
//		(B) How do I test (or run) .post commands?...

//		(***) Amit managed to "talk" to nitzan's server. All he needs from me is the ip of my server (URI), and how to approach with requests....
//				I need to implement some methods for the server, and tell Amit and Nitzan what to do, what to provide when they ask something.
