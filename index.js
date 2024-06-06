const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
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
        'id:': 3,
        'name': 'Joselyn'
    }
];
const bodyParser = require('body-parser');
app.use(express.json()); //enable JSON parse in request body
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
    if (!database) res.status(404).send('Error getting database');
    setTimeout(() => res.send(database), 1000);
})

app.post('/api/data', (req, res) => {
    const data = req.body;
    if (!data) res.status(404).send('Error getting data');
    database.push(data);
    setTimeout(() => res.send(database), 1000);
})

app.put('/api/data/:element', (req, res) => {
    const index = database.findIndex((obj) => {
        return obj.id === req.params.element
    });
    if (index === -1) res.status(404).send('data does not exist');
    database[index] = req.body;
    setTimeout(() => res.send(database[index]), 1000);
})

app.delete('/api/data/:element', (req, res) => {
    const index = database.findIndex((obj) => {
        return obj.id === parseInt(req.params.element, 10);
    });
    console.log(index)
    if (index === -1) res.status(404).send('data does not exist');
    database.splice(index, 1);
    setTimeout(() => res.send(database), 1000);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));