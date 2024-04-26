import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB est déjà connecté...')
        return
    }
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName : "share_prompt",
          useNewUrlParser: true,
          useUnifiedTopology: true,
          
      })  
      isConnected = true
        console.log('Connexion à MongoDB réussie...')
    } catch (error) {
        console.log('Erreur de connexion à MongoDB...')
    }
}