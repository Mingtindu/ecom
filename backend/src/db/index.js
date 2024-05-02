import mongoose, { connect } from 'mongoose';
import DB_NAME from '../constant';
const connectDB = async ()=>{
    try{
        const connectIns = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Connection successfull: MONGODB is connected ${connectIns.connection.host}`);

    }catch(err){
        console.log(`Mongodb connection failed err:: ${err}`);

    }

}

export default connectDB