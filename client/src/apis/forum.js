import { gql } from "@apollo/client";

export const GET_POSTS = gql
`   query GetAllPosts {
    getAllPosts {
      id
      description
      time
      likesCount
      commentsCount
      user {
        id
        name
        profileImage
      }
    }
  }
  `;
  export const LIKE_POST_MUTATION= gql
  `    mutation LikePost($id: ID!, $user: ID!) {
    LikePost(id: $id, user: $user) {
      description
    }
  }
    `;
 
    export const CREATE_COMMENT_MUTATION = gql
    `  mutation CreateComment($commentInput: CommentInput!, $post: ID!, $user: ID!) {
      createComment(CommentInput: $commentInput, post: $post, user: $user) {
        description
      }
    }
      `;
 
      export const GET_COMMENTS_BY_POST = gql
      `  query GetCommentsByPostId($id: ID!) {
        getCommentsByPostId(id: $id) {
          id
          description
          time
           
          user {
            name
            profileImage
          }
        }
      }
        `;
     
    
        export const GET_POST = gql
        ` query GetPost($id: ID!) {
          getPost(id: $id) {
            id
            description
            time
            likesCount
            user {
              id
              name
              email
              profileImage
            }
            commentsCount
          }
        }
          `;
       
          export const CREATE_POST_MUTATION = gql
          ` 
          mutation CreatePost($postInput: PostInput) {
            createPost(postInput: $postInput) {
              description
            }
          }
       
            `;
       

            export const LIKED_POST = gql
            ` 
            query Query($isLikedId: ID!, $user: ID!) {
              isLiked(id: $isLikedId, user: $user)
            }
         
              `;
         
           
         
        