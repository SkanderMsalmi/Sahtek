import { gql } from "@apollo/client";

export const GET_POSTS = gql
`   query FindPostByUserCommunities($user: ID!) {
  findPostByUserCommunities(id: $user) {
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
    isPostedByCurrentuser(user: $user)
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
            comments{
              id
            }
            like{
              id
            }
            user {
              id
              name
              email
              profileImage
            }
            
            
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



         

           
           
         
        