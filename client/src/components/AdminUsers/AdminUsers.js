import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Modal, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import Book from "./Book.js";
import styles from "./Book.module.scss";
import { useEffect, useState } from "react";
import UpdateBook from "./UpdateBook.js";
const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      gender
      name
      role
      verified
      profileImage
    }
  }
`;
function AdminUsers() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);

  //   const toggle = () => setModal(!modal);
  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers);
    }
  }, [data]);
  if (loading) return <Spinner />;
  return (
    <div>
      <h2>Users</h2>

      <article className={styles.bookList}>
        {users.map((user) => {
          return (
            <Book
              img={user.profileImage}
              refetch={refetch}
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              dateOfBirth={user.dateOfBirth}
              verified={user.verified}
            />
          );
        })}
      </article>
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Product</ModalHeader>
        <UpdateBook toggle={toggle} refetch={refetch} />
        <ModalFooter></ModalFooter>
      </Modal> */}
    </div>
  );
}

export default AdminUsers;
