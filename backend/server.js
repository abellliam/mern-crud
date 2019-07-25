const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Routes = express.Router();
const PORT = 4000;

let CLIENT = require("./client.model");
let TRANSACTION = require("./transaction.model")
let RATE = require("./rate.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established succesfully");
});

Routes.route("/transaction").get(function(req, res) {
    TRANSACTION.find(function(err, items) {
        if(err) {
            res.status(400).send(err);
        } else {
            res.json(items);
        }
    });
});

Routes.route("/transaction/delete").post(function(req, res) {
    TRANSACTION.deleteOne({_id: req.body.id})
    .then(item => {res.status(200).json({[item]: 'item deleted successfully'})})
    .catch(err => {res.status(400).send('Deletion failed')});
});

Routes.route("/transaction/add").post(function(req, res) {
    let item = new TRANSACTION(req.body);
    item.save()
        .then(item => {
            res.status(200).json({[item]: 'item added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});

Routes.route("/transaction/update/:id").post(function(req, res) {
    TRANSACTION.findById(req.params.id, function(err, item) {
        if (!item) {
            res.status(404).send('data is not found');
        } else {
            for(let prop in req.body) {
                item[prop] = req.body[prop]
            }
            item.save().then(item => {
                res.json('Item updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

Routes.route("/transaction/month/:month").get(function(req, res) {
    TRANSACTION.find({date: new RegExp(`-${req.params.month}-`)}).sort({date: -1})
    .exec(function(err, items) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(items);
        }
    })
})

Routes.route("/transaction/:id").get(function(req, res) {
    let id = req.params.id;
    TRANSACTION.findById(id, function(err, item) {
        res.json(item);
    });
});

Routes.route("/rate").get(function(req, res) {
    RATE.find(function(err, items) {
        if(err) {
            res.status(400).send(err);
        } else {
            res.json(items);
        }
    });
});

Routes.route("/rate/delete").post(function(req, res) {
    RATE.deleteOne({_id: req.body.id})
    .then(item => {res.status(200).json({[item]: 'item deleted successfully'})})
    .catch(err => {res.status(400).send('Deletion failed')});
});

Routes.route("/rate/add").post(function(req, res) {
    let item = new RATE(req.body);
    item.save()
        .then(item => {
            res.status(200).json({[item]: 'item added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});

Routes.route("/rate/update/:id").post(function(req, res) {
    RATE.findById(req.params.id, function(err, item) {
        if (!item) {
            res.status(404).send('data is not found');
        } else {
            for(let prop in req.body) {
                item[prop] = req.body[prop]
            }
            item.save().then(item => {
                res.json('Item updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

Routes.route("/rate/last").get(function(req, res) {
    RATE.find().sort({ '_id': -1 }).limit(1).exec(function(err, item) {
       res.json(item[0]);
   });
});

Routes.route("/rate/:id").get(function(req, res) {
    let id = req.params.id;
    RATE.findById(id, function(err, item) {
        res.json(item);
    });
});

Routes.route("/").get(function(req, res) {
    CLIENT.find(function(err, items) {
        if(err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

Routes.route("/delete").post(function(req, res) {
    CLIENT.deleteOne({_id: req.body.id})
    .then(item => {res.status(200).json({[item]: 'item deleted successfully'})})
    .catch(err => {res.status(400).send('Deletion failed')});
});

Routes.route("/add").post(function(req, res) {
    let item = new CLIENT(req.body);
    item.save()
        .then(item => {
            res.status(200).json({[item]: 'item added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});

Routes.route("/update/:id").post(function(req, res) {
    CLIENT.findById(req.params.id, function(err, item) {
        if (!item) {
            res.status(404).send('data is not found');
        } else {
            for(let prop in req.body) {
                item[prop] = req.body[prop]
            }
            item.save().then(item => {
                res.json('Item updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

Routes.route("/update").post(function(req, res) {
    items = JSON.parse(JSON.stringify(req.body));
    for (let i = 0; i < items.length; i++) {
        let error;
        CLIENT.findById(items[i]._id, function(err, item) {
            if (!item) {
                error = {code: 404, message: 'Data not found'};
            } else {
                for(let prop in items[i]) {
                    item[prop] = items[i][prop]
                }
                item.save().then(item => {
                })
                .catch(err => {
                    error = {code: 400, message: 'Update not possible'}
                });
            }
        });
        if (error) {
            res.status(error.code).send(error.message);
            break;
        }
    }
    res.json('Item updated');
})

Routes.route("/:id").get(function(req, res) {
    let id = req.params.id;
    CLIENT.findById(id, function(err, item) {
        res.json(item);
    });
});

app.use("/crud", Routes);

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}...`);
});
