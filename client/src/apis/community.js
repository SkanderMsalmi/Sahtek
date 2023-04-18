import { gql } from "@apollo/client";

export const GET_COMMUNITIES = gql
    `  query GetAllCommunities {
    getAllCommunities {
      id
      name
      createdAt
      description
      
    }
  }
  `;
  export const GET_COMMUNITIES_BY_USER = gql
  `   query FindCommunityByUser($id: ID!) {
    findCommunityByUser(id: $id) {
      name
      id
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
    `   mutation DeleteCommunity($deleteCommunityId: ID!) {
    deleteCommunity(id: $deleteCommunityId)
  }
  `;
export const JOIN_COMMUNITY = gql
    `   mutation JoinCommunity($joinCommunityId: ID!, $userId: ID!) {
    joinCommunity(id: $joinCommunityId, userId: $userId) {
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
        name
      }
      
      user {
        name
        profileImage
      }
      commentsCount
      likesCount
      isLiked(user: $user)
      isPostedByCurrentuser(user: $user)
    }
  }
`;
 
 