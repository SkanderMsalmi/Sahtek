import { gql } from "@apollo/client";

export const GET_COMMUNITIES = gql
    `  query GetAllCommunities {
      getAllCommunities {
        id
        name
        color
        createdAt
        description
        members {
          id
        }
        
         
      }
    }
  `;
  export const GET_COMMUNITIES_BY_USER = gql
  `   query FindCommunityByUser($id: ID!) {
    findCommunityByUser(id: $id) {
      name
      id
      creator {
        id
      }
    }
  }
`;
 

export const CREATE_COMMUNITY = gql
    `  
    mutation CreateCommunity($name: String!, $description: String!, $creator: ID!) {
      createCommunity(name: $name, description: $description, creator: $creator) {
        id
        name
        createdAt
        description
      }
    }
  `;
export const DELETE_COMMUNITY = gql
    ` mutation DeleteCommunity($id: ID!) {
      deleteCommunity(id: $id) 
    }
  `;
export const JOIN_COMMUNITY = gql
    `   mutation JoinCommunity($id: ID!, $userId: ID!) {
    joinCommunity(id: $id, userId: $userId) {
      description
      name
      id
    }
  }
  `;
  export const UPDATE_COMMUNITY = gql
    `  mutation UpdateCommunity($id: ID!, $description: String, $name: String) {
      updateCommunity(id: $id, description: $description, name: $name) {
        description
        name
        id
      }
    }
  `;


 

  export const POSTS_BY_COMMUNITY = gql
  `    query FindPostByCommunity($id: ID!, $user: ID!) {
    findPostByCommunity(id: $id) {
      id
      description
      time
      title
      community {
        id
        name
        color
      }
      
      user {
        id
        name
        profileImage
      }
      like{
        id
      }
      comments{
        id
      }
     
      isLiked(user: $user)
      
    }
  }
`;
export const COMMUNITY = gql
`  query Community($id: ID!, $user: ID!) {
  community(id: $id) {
    name
    color
    description
    members {
      id
    }
    posts {
      description
      id
      time
      title
      user {
        id
        profileImage
        name
      }
      like{
        id
      }
      comments{
        id
      }
      isLiked(user: $user)
     
    }
  }
}
`;

export const LEAVE_COMMUNITY = gql
    ` 
    mutation LeaveCommunity($id: ID!, $userId: ID!) {
      leaveCommunity(id: $id, userId: $userId) {
        description
       
      }
    }
  `;
 
 