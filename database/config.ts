import mongoose from 'mongoose';

export const dbConnection = async () => {

    try {
        await mongoose.connect( String( process.env.MONGODB_CNN ) , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB online');
    } catch (error) {
        throw new Error('Error en DB');
    }

}



