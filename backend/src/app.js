import express from 'express'

const app = express()
app.use('/',(req,res)=>{
    res.send("main ma pugeu hai hami ")

})
export default app