import mongoose from 'mongoose';

type TInput = {
  dbUri: string;
}

const connect = async (input: TInput) => {
    const { dbUri } = input;
  
    try {
      await mongoose.connect(dbUri);
      console.log(`Successfully connected to ${dbUri}`)
    } catch (error) {
        console.log(`Failed to connect to MongoDB: ${error}`)
    }
  };
  
  export default connect;