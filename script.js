const mongoose = require('mongoose')
const Person = require('./Person')

//database connection
mongoose
  .connect(
    'mongodb+srv://tawiahjustin:eItn1SfKuHO14iua@cluster0.lqzjdce.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('connection established')
  })
  .catch((error) => {
    console.log('error connecting ' + error.message)
  })

// Create and Save a Record of a Model
const person = new Person({
  name: 'Kyle',
  age: 28,
  favoriteFoods: ['rice', 'bean'],
})
person.save().then((docs) => {
  console.log(docs)
})

//Create Many Records with model.create()
//Create several people with Model.create(), using the function argument arrayOfPeople

const createManyDocuments = async () => {
  try {
    let arrayOfPeople = await Person.create([
      { name: 'Kyle', age: 28, favoriteFoods: ['food', 'food'] },
      { name: 'Mark', age: 20, favoriteFoods: ['rice', 'bean'] },
      { name: 'Jude', age: 15, favoriteFoods: ['Beans', 'Beans'] },
    ])
    return arrayOfPeople
  } catch (err) {
    throw err
  }
}
createManyDocuments()

//Use model.find() to Search Your Database
Person.find({ name: 'Kyle' }).then((docs) => console.log(docs))

//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ favoriteFoods: 'rice' }).then((docs) => console.log(docs))

//Use model.findById() to Search Your Database By \_id

const personId = '646a29ca400c5b25607ff395'
Person.findById(personId)
  .then((docs) => console.log(docs))
  .catch((err) => console.log(err))

//Perform Classic Updates by Running Find, Edit, then Save
Person.findById(personId)
  .then((docs) => console.log(docs))
  .catch((err) => console.log(err))

//Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate({ name: 'Jude' }, { age: 20 }, { new: true })
  .then((docs) => console.log(docs))
  .catch((err) => console.log(err))
//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove(personId)
  .then((docs) => console.log(docs))
  .catch((err) => console.log(err))

//MongoDB and Mongoose - Delete Many Documents with model.remove()
// La méthode remove() montre des erreur. Au lieu de cela, j'ai utilisé la méthode deleteMany() pour obtenir la même fonctionnalité
Person.deleteMany({ name: 'Mary' }).then((docs) => console.log(docs))

//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: 'rice' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec()
  .then((docs) => console.log(docs))
  .catch((err) => console.log(err))
