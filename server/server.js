import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)

mongoose.connection.on('error', (err)=>{
  throw new Error( `Unable to connect to the database: ${config.mongoUri}.
   The error is ${err} `)
})


app.listen(config.port, (err)=>{
  if(err){
    return console.log("Error listening on server", err);
  }
  console.log("server started on port %s", config.port);
})
