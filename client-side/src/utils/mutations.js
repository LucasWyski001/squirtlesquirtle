import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_FOUNTAIN = gql`
  mutation addFountain($address: String!, $city: String!, $state: String!, $place: String) {
    addFountain(address: $address, city: $city, state: $state, place: $place) {
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

export const SAVE_FOUNTAIN = gql`
  mutation saveFountain($fountainId: ID!) {
    saveFountain(fountainId: $fountainId) {
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