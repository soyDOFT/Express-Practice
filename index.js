const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const database = [5];
app.use(express.json()); //enable JSON parse in request body

app.get('/api/data' , (req, res) => {
    if (!database) res.status(404).send('Error getting database')
    res.send(database);
})

app.post('/api/data' , (req, res) => {
    if (!database) res.status(404).send('Error getting database')
    else res.send(database);
})

app.put('/api/data/:element' , (req, res) => {
    const index = database.indexOf(req.params.element);
    if (index === -1) {
        res.status(404).send('Error putting data')
    }
    else {
        database[index] = req.body.value;
        res.send(database[index]);
    }
})

app.delete('/api/data/:element' , (req, res) => {
    if (!database) res.status(404).send('Error fetching database')
    res.send(database);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));