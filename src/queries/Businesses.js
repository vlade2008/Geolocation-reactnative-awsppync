import gql from 'graphql-tag';



export default gql`
query ListBusinesses {
    listBusinesses{
      items{
        name
        description
        address
        id
        type
        latitude
        longitude
        latitudeDelta
        longitudeDelta
      }
    }
}`;
