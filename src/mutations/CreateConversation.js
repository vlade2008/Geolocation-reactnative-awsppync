import gql from 'graphql-tag'

export default gql`
  mutation CreateConversation(
    $id: ID!,
    $userId: String!,
    $name: String!,
    $message:String!,
    $createdAt:String!
  ) {
    createConversation(input: {
      id: $id,
      userId: $userId,
      name: $name,
      message:$message,
      createdAt:$createdAt
    }) {
      id
      userId
      name
      message
      createdAt
    }
  }
`
