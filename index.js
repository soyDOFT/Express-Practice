const express = require('express'); //imports express module
const app = express(); // starts express
const PORT = process.env.PORT || 8080; // Decides port based on environment variables or sets to default
//Mock database
const database = [
    {
        'id': 1,
        'name': 'John'
    },
    {
        'id': 2,
        'name': 'Jaylin'
    },
    {
        'id': 3,
        'name': 'Joselyn'
    }
];
const bodyParser = require('body-parser');
app.use(express.json()); //enable JSON parse in request body
app.use(bodyParser.json());

//Handle get http requests
app.get('/api/data', (req, res) => { //Handler function
    if (!database) res.status(404).send('Error getting database'); // error handling
    setTimeout(() => res.send(database), 1000); // Send response back after delay
})

//Handle get http requests
app.post('/api/data', (req, res) => { //Handler function
    const data = req.body; // get data from postman
    if (!data) res.status(404).send('Error getting data'); // error handling
    database.push(data); //add data to database
    setTimeout(() => res.send(database), 1000); //send response back after delay
})

//Handle get http requests
app.put('/api/data/:element', (req, res) => { //Handler function
    //Find index of request in database
    const index = database.findIndex((obj) => {
        return obj.id === parseInt(req.params.element, 10);
    });
    if (index === -1) res.status(404).send('data does not exist'); //error handling
    database[index] = req.body; //replace data with request body
    setTimeout(() => res.send(database), 1000); //send response back after delay
})

//Handle get http requests
app.delete('/api/data/:element', (req, res) => { //Handler function
    //Find index of request
    const index = database.findIndex((obj) => {
        return obj.id === parseInt(req.params.element, 10);
    });
    if (index === -1) res.status(404).send('data does not exist'); //error handling
    database.splice(index, 1); //remove data from response
    setTimeout(() => res.send(database), 1000); //send response back
})
//Add listener to express app
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));