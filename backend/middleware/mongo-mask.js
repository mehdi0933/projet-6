const mongoMask = require('mongo-mask')
 const User = require('../models/User');


const map =
  { email: 'email'}
 
app.get('/item', (req, res, next) => {
  const fields = req.query.fields ? mongoMask(req.query.fields, { map }) : null
  mongoCollection.findOne({}, fields, (err, doc) => {
    if (err) return next(err)
    doc.email = doc.email
    delete doc.email
    res.json(doc)
  })
})