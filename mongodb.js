// CRUD operations
const { MongoClient, ObjectId } = require("mongodb");

const urlConnection = "mongodb://127.0.0.1:27017";

const databaseName = "task-Manager";
MongoClient.connect(
  urlConnection,
  { useNewUrlParser: true },
  (error, client) => {
    const db = client.db(databaseName);
    //create operation

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       title: "Clean the Room",
    //       desc: "Clean The Room and tie the coth",
    //     },
    //     {
    //       title: "Learn MangoDb",
    //       desc: "Wathch the entire section today",
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(`Error while inserting ${error}`);
    //     }
    //     console.log(result);
    //   }
    // );

    // --> Read Operations

    // db.collection("tasks").findOne(
    //   { id: new ObjectID("62407aceb48a1e12144c2226") },
    //   (error, result) => {
    //     if (error) {
    //       return console.log(`Error while finding ${error}`);
    //     }
    //     console.log(result);
    //   }
    // );

    // Update Operation

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectId("6240778e4c54cc2c9f78409d"),
    //     },
    //     {
    //       $set: {
    //         name: "Ahmed",
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.matchedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Delete operation

    db.collection("users")
      .deleteMany({
        // _id: ObjectId("6240778e4c54cc2c9f78409d"),
        name: "Ahmed",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
