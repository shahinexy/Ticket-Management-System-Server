const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

//middlewear
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Ticket-Management-System-Server is running')
})

app.listen(port, ()=>{
    console.log(`Ticket-Management-System-Server is running on port ${port}`);
})