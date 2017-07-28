let mongodb = require('mongodb');
let express = require('express');
let bodyParser = require('body-parser');
let port = 3000;
let app = express();
app.use(bodyParser.json());
let router = express.Router();
let Database = require('./db');
Database.connect();

app.get('/', (req, res) => {
  let list;
  Database.db.collection('employees').find().toArray().then((result) => {
    for(let i = 0; i < result.length; i++) {
      if(i === 0) {
        list = '<ul><li>' + result[i].firstName + ' ' + result[i].lastName + ' - ' +  result[i].Title + '</li></ul>';
      } else {
        list += '<ul><li>' + result[i].firstName + ' ' + result[i].lastName + ' - ' +  result[i].Title + '</li></ul>';
      }
    }
    res.send(list);
  })
})


app.put('/', (req, res) => {
   let employee = req.body;
   employee._id = new mongodb.ObjectID(req.body._id);
  Database.db.collection('employees').save(employee).then((result) => {
     res.end();

  })
})

app.post('/', (req, res) => {
  let employee = req.body;
  employee._id = new mongodb.ObjectID();
 Database.db.collection('employees').save(employee).then((result) => {
    res.end();
  })
})


app.delete('/:id', (req, res) => {
  let employeeID = new mongodb.ObjectID(req.params['id']);
 Database.db.collection('employees').remove({_id:employeeID}).then((result) => {
    res.end();
  })
})




app.listen(port, function () {
  console.log('server connected');
})
