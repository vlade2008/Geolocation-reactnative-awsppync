import gql from 'graphql-tag'

export default gql`
  mutation CreateConversation(
    $id: ID!,
    $userId: String!,
    $name: String!,
    $message:String,
    $createdAt:String
  ) {
    createCity(input: {
      id: $id,
      userId: userId,
      name: name,
      message:message,
      created:created
    }) {
      id
      userId
      name
      message
      created
    }
  }
`
