require('dotenv').config()

const mongoDBURI = `${process.env.MONGODB_URI}`

module.exports = mongoDBURI;