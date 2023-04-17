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

export const CREATE_COMMUNITY = gql
    `   mutation CreateCommunity($name: String!, $description: String!) {
    createCommunity(name: $name, description: $description) {
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
 