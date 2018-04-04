import gql from 'graphql-tag';



export default gql`

  # fragment ListBusinessesTypeFragment on BusinessType {
  #   name
  #   id
  #   businessID
  # }
  #
  #
  # fragment ListBusinessesFragment on Business {
  #   name
  #   description
  #   address
  #   id
  #   type
  # }
query ListBusinesses {
    listBusinesses{
      items{
        name
        description
        address
        id
      }
    }
}`;
