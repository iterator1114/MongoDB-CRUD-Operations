// Mongodb Object
const mongodb = require('mongodb')
// Mongodb Initialisation
const MongoClient = mongodb.MongoClient
// ObjectID
const ObjectID = mongodb.ObjectID
// const { MongoClient, ObjectID } = require('mongodb')

// Two varaiables to coonect database
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'work-manager'

//Connecting
//MongoClient takes two argument => connectionURL, callbackFunction
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Failed to connect to database...")
    }

    // console.log("Connected Successfully!")

    // Database Reference
    db = client.db(databaseName)


    // CRUD Operations => Create, Read, Update, Delete


    // C => Create
    // InsertOne to the database
    // It takes two argument => Object to be inserted , Callback function
    db.collection('users').insertOne({
        name: 'Sujal',
        rollNo: 1900320100067,
        age: 20
    }, (error, result) => {
        if (error) {
            return console.log("Unable to InsertOne to the database")
        }
        // It gives the array of Inserted Objects
        console.log(result.ops)
    })

    // InsertMany to the database
    // It takes two argument => Object to be inserted , Callback function
    db.collection('users').insertMany([
        {
            name: 'Abhishek',
            rollNo: 1900320100005,
            age: 20
        }, {
            name: 'Vaibhav',
            rollNo: 1900320100006,
            age: 19
        }, {
            name: 'Kushagra',
            rollNo: 1900320100009,
            age: 19
        }
    ], (error, result) => {
        if (error) {
            return console.log("Unable to insertMany into the database");
        }
        console.log(result.ops);
    })




    // R => Read data
    // FindOne from the Database
    // FindOne takes two argument => Object(query), callback function
    /*
        Important Points on FindOne
        1) If finding document is not found it return Null, It does not give any error
        2) If documents have multiple values, It returns first one..
    */

    // Find by specific key
    db.collection('users').findOne({ name: 'Abhishek' }, (error, user) => {
        if (error) {
            return console.log("Unable to fetch User using name as key..");
        }
        console.log(user);
    })

    // Find by ObjectID
    db.collection('users').findOne({ _id: new ObjectID('60f2dc406dfe5e085003b26e') }, (error, user) => {
        if (error) {
            return console.log("Unable to fetch user using ObjectID..");
        }
        console.log(user)
    })

    // FindMany from the Database
    // FindMany takes two argument => Object(query) and its method
    /*
        Important Points on FindMany
        1) It does not include callback function.
        2) It return cursor(pointer) to data in database beacause of many possibilities and that method have callback function..
    */
    db.collection('users').find({ age: 20 }).toArray((error, users) => {
        if (error) {
            return console.log("Unable to fetch users from find");
        }
        console.log(users);
    })




    // U => update data
    // updateOne in database
    // UpdateOne takes three arguments => Object(query), updatedValue, callback/promises
    db.collection('users').updateOne({ _id: new ObjectID('60f2e53cb642cd0c74a3a9e6') }, {
        $set: {
            name: 'Bharti'
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log("Unable to updateOne in database..");
    })

    // updateMany in database
    // UpdateMany takes three arguments => Object(query), updatedValue, callback/promises
    db.collection('users').updateMany({ age: 20 }, {
        $set: {
            age: 30
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log("Unable to updateOne in database..");
    })




    // D => Delete data
    // deleteOne in database
    // deleteOne takes two arguments => Object(query), callback/promises
    db.collection('users').deleteOne({
        name: 'Bharti',
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Unable to delete user from deleteOne');
    })

    // deleteMany in database
    // deleteMany takes two arguments => Object(query), callback/promises
    db.collection('users').deleteMany({
        age: 19
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('Unable to delete users from deleteMany...');
    })
})
