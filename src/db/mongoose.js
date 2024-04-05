import mongoose from "mongoose";

const Database = () => {
    mongoose.connect(process.env.MONGOURL).then(() => console.log(`DATABASE CONNECTED SUCCESFULLY`)).catch(error => {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1);
    });
}
export default Database;