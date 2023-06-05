import { gql, useMutation } from "@apollo/client";
import styles from "./Book.module.scss";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import UpdateBook from "./UpdateBook";

const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;
function Book(props) {
  const [user, setUser] = useState({
    id: props.id,
    img: props.img,
    name: props.name,
    email: props.email,
    dateOfBirth: props.dateOfBirth,
    verified: props.verified,
  });
  console.log(user);
  const [deleteUser] = useMutation(DELETE_USER);
  const deleteUserHandler = () => {
    deleteUser({
      variables: {
        deleteUserId: user.id,
      },
    }).then((res) => {
      props.refetch();
    });
  };

  return (
    <>
      <article className={styles.book}>
        <span
          className={styles.action2}
          style={{ cursor: "pointer" }}
          onClick={() => deleteUserHandler()}
        >
          <i class="fa-solid fa-trash"></i>
        </span>

        <img src={user.img} alt={user.name} />
        <h2>{user.name}</h2>
        <h3 className="h4 mt-1">{user.gender}</h3>
        <h4 className="mt-2">{user.email}</h4>
        <div className="d-flex justify-content-between">
          {user.verified ? (
            <small className="text-left d-block">Verified</small>
          ) : (
            <small className="text-left d-block">Not Verified</small>
          )}
          <small className="text-right d-block">{user.dateOfBirth} </small>
        </div>
      </article>
    </>
  );
}

export default Book;
