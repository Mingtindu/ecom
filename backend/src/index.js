import app from './app.js'
import connectDB from './db/index.js'
import cors from 'cors'
app.use(cors())
connectDB().then(async()=>{
    app.listen(process.env.port || 8000,()=>{
        console.log(`App is listening on port 8000`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);

})