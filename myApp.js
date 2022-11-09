require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name : {
      type: String,
     required: true
    },
    age :  Number,
    favoriteFoods : [String]
})

let Person = mongoose.model('Person', personSchema)


const createAndSavePerson = (done) => {
  let joey = new Person({name: 'Joey', age: 22, favoriteFoods: ['Pizza', 'Spaghetti']})
  joey.save((err, data) => {
    if(err){
      console.log(err)
    }
    done(null , data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople,(err, peopleCreated) => {
    if(err) return console.log(err)
    done(null ,peopleCreated);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find( {name: personName}, (err, findPersonByName) => {
    if(err) return console.log(err)
    done(null ,findPersonByName);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favorite: Person.food}, (err, favoriteFood) => {
    if(err) return console.log(err)
    done(null , favoriteFood);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, peopleID) => {
    if(err) return console.log(err)
    done(null , peopleID);
  }) 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, editFood) => {
    if(err) return console.log(err)
    editFood.favoriteFoods.push(foodToAdd)
    editFood.save((err, data) => {
      if(err) return console.log(err)
      done(null , data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  let newQuery = {name: personName}
  let newUpdate = {age: 20}
  let options = { new: true }
  Person.findOneAndUpdate(newQuery, newUpdate, options, (err, findPersonName) =>{
    if(err) return console.log(err)
    done(null , findPersonName);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, findPersonAndRemove) => {
    if(err) return console.log(err)
    done(null , findPersonAndRemove);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = {name: "Mary"};
  Person.remove(nameToRemove, (err, personToRemove) => {
    if(err) return console.log(err)
    done(null , personToRemove);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

