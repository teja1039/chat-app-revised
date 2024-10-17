import { gql } from "@apollo/client";

const GET_CONTACTS = gql`
  query getContacts {
    getUsers {
      id: _id
      name
      profileImg: profileImgUrl
    }
  }
`;

const ADD_CONTACT = gql`
  mutation AddContact($userId: ID!, $name: String!, $profileImgUrl: String) {
    addUser(userId: $userId, name: $name, profileImgUrl: $profileImgUrl)
  }
`;

const DELETE_CONTACT = gql`
  mutation DeleteContact($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

const GET_MESSAGES = gql`
  query getMessages($userId: ID!) {
    getMessagesOfUser(userId: $userId) {
      id: _id
      content
      sentTime: time
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation addMessage(
    $userId: ID!
    $messageId: ID!
    $content: String!
    $time: String!
  ) {
    addMessage(
      userId: $userId
      messageId: $messageId
      content: $content
      time: $time
    )
  }
`;

const DELETE_MESSAGE = gql`
  mutation deleteMessage($userId: ID!, $messageId: ID!) {
    deleteMessage(userId: $userId, messageId: $messageId)
  }
`;

const UPDATE_MESSAGE = gql`
  mutation updateMessage($userId: ID!, $messageId: ID!, $content: String!) {
    deleteMessage(userId: $userId, messageId: $messageId, content: $content)
  }
`;

export {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_MESSAGES,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
};
