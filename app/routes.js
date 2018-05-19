var Todo = require('./models/todo');
console.log("Example is up now..")
var Twit = require('twit');
var config = require('../twitter/config')
var T = new Twit(config);
var params = { 
q: '#rcbvscsk',
 count: 4 
}

/*T.get('search/tweets', params,searchedData);

 function searchedData(err, data, response) {
  console.log(data);
}*/

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        params.q = req.body.text;
        T.get('search/tweets', params,searchedData);

        function searchedData(err, data, response) {
            /*console.log(data);
            console.log(err);
            console.log(response);*/
            // create a todo, information comes from AJAX request from Angular
            /*data.forEach(function(element) {
                Todo.create({
                text: element.text,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                getTodos(res);
            });
            });*/
            Todo.create({
                text: data.statuses[0].text,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                getTodos(res);
            });
        }

        

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
