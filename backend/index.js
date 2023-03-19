const express = require('express');
const bodyParser = require('body-parser')
const { checkStatus } = require('./helpers/checkStatus')
const { sendNotifications } = require('./helpers/webhook')

const PORT = 8080;

const app = express();
app.use(express.json())
app.use(bodyParser.json())

app.post('/__space/v0/actions', async (req,res) => {

  const event = res.body.event 

  if(event === "check"){
    try{
      await checkStatus()
      console.info("Successfully checked.")
      res.end()
    }catch(e){
      console.error(e.message)
    }
    return
  }

  if(event === "notify"){
    try{
      await sendNotifications()
      console.info("Notified!")
    }catch(e){
      console.error(e.message)
    }
    return
  }

})

checkStatus()
sendNotifications()

app.listen(PORT);