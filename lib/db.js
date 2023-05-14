import MongoClient from "mongodb/lib/mongo_client";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://rlawlsyoung:1q2w3e4r@udemycluster.o9wuh6s.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}
