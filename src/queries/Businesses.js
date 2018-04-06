import gql from 'graphql-tag';



export default gql`
query ListBusinesses {
    listBusinesses{
      items{
        name
        description
        address
      }
    }
}`;
