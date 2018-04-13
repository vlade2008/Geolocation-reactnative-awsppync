import gql from 'graphql-tag';



export default gql`
query ListConversation {
    listConversations{
      items{
        id
        userId
        name
        message
        createdAt
      }
    }
}`;
