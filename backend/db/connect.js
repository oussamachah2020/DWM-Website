const mongoose = require('mongoose')

const connection = async () => {
    try {     
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connected => ${conn.connection.host}`.underline.blue);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;