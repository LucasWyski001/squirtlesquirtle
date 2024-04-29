import { gql } from '@apollo/client'


export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      fountains
      saved
    }
  }
`;

export const QUERY_FOUNTAINS = gql`
  {
    fountains {
      _id
      lat
      lng
      address
      place
      city
      state
      datePosted
      image
      postAuthor
    }
  }
`;
