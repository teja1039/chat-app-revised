import { ApolloServer } from "apollo-server";
import db from "./db/connection.js";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      return await db.collection("users").findOne({ _id: userId });
    },

    getMessagesOfUser: async (_, { userId }) => {
      const user = await db
        .collection("users")
        .findOne({ _id: userId }, { projection: { messages: 1 } });
      const messageIdList = (await user.messages) ?? [];
      const messageList = [];

      const messagePromises = messageIdList.map((element) =>
        db.collection("messages").findOne({ _id: element })
      );
    
      const resolvedMessages = await Promise.all(messagePromises);
      messageList.push(...resolvedMessages.filter(Boolean));

      return messageList;
    },
  },

  Mutation: {
    addUser: async (_, { userId, name, profileImgUrl = "DefaultVaule" }) => {
      await db
        .collection("users")
        .insertOne({ _id: userId, name, profileImgUrl, messages: [] });

      return "User added";
    },

    addMessage: async (_, { userId, messageId, content, time }) => {
      await db
        .collection("messages")
        .insertOne({ _id: messageId, content, time });

      await db
        .collection("users")
        .updateOne({ _id: userId }, { $push: { messages: ObjectId.createFromTime(messageId) } });

      return "Message added";
    },

    deleteUser: async (_, { userId }) => {
      await db.collection("users").deleteOne({ _id: userId });
      return "User deleted";
    },

    deleteMessage: async (_, { userId, messageId }) => {
      await db.collection("messages").deleteOne({ _id: messageId });
      await db
        .collection("users")
        .updateOne({ _id: userId }, { $pull: { messages: ObjectId.createFromTime(messageId) } });

      return "Message Deleted";
    },

    updateMessage: async (_, { messageId, content }) => {
      await db
        .collection("messages")
        .updateOne({ _id: messageId }, { $set: { content } });
      return await db.collection("messages").findOne({ _id: messageId });
    },
  },
};

const __dirname = path.resolve(path.dirname(""));
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.resolve(__dirname, "src/schema.graphql"),
    "utf-8"
  ),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
