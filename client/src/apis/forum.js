import { gql } from "@apollo/client";

export const GET_POSTS = gql
`   query GetAllPosts($user: ID!) {
  getAllPosts(user: $user) {
    id
    title
    community
    description
    time
    commentsCount
    likesCount
    isLiked(user: $user)
    isPostedByCurrentuser(user: $user)
    user{
      id
      profileImage
      name
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
    export const REMOVE_LIKE_POST_MUTATION= gql
    `   mutation RemoveLikePost($id: ID!, $user: ID!) {
      removeLikePost(id: $id, user: $user) {
        description
        likesCount
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
        ` query GetPost($id: ID!, $user: ID! ) {
          getPost(id: $id, user: $user) {
            id
            description
            time
            title
            community
            likesCount
            user {
              id
              name
              email
              profileImage
            }
            commentsCount
            isLiked(user: $user)
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

            export const DELETE_POST_MUTATION = gql
          ` 
          mutation DeletePost($id: ID!) {
            deletePost(id: $id)
          }
     
       
            `;



         

           
           
         
        