import { gql, useMutation } from "@apollo/client";
import styles from "./Book.module.scss";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import UpdateBook from "./UpdateBook";
const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productInput: ProductInput, $img: Upload) {
    updateProduct(productInput: $productInput, img: $img) {
      stock
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;
function Book(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [product, setProduct] = useState({
    id: props.id,
    img: props.img,
    title: props.title,
    desc: props.desc,
    number: props.number,
    category: props.category,
    price: props.price,
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const deleteProductHandler = () => {
    deleteProduct({
      variables: {
        deleteProductId: product.id,
      },
    }).then((res) => {
      props.refetch();
    });
  };
  const updateStock = () => {
    updateProduct({
      variables: {
        productInput: {
          id: product.id,
          stock: product.number + 1,
        },
      },
    }).then((res) => {
      setProduct({ ...product, number: res.data.updateProduct.stock });
    });
  };

  return (
    <>
      <article className={styles.book}>
        <span
          className={styles.action}
          style={{ cursor: "pointer" }}
          onClick={() => updateStock()}
        >
          <i class="fa-solid fa-plus"></i>
        </span>
        <span
          className={styles.action3}
          style={{ cursor: "pointer" }}
          onClick={() => toggle()}
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </span>
        <span
          className={styles.action2}
          style={{ cursor: "pointer" }}
          onClick={() => deleteProductHandler()}
        >
          <i class="fa-solid fa-trash"></i>
        </span>

        <img src={product.img} alt={product.title} />
        <h2>{product.title}</h2>
        <h3 className="h4 mt-1">{product.category}</h3>
        <h4 className="mt-2">{product.desc}</h4>
        <div className="d-flex justify-content-between">
          <small className="text-left d-block">{product.price}$</small>
          <small className="text-right d-block">{product.number} left</small>
        </div>
      </article>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Product</ModalHeader>
        <UpdateBook
          toggle={toggle}
          img={product.img}
          refetch={props.refetch}
          setProduct={setProduct}
          id={product.id}
          title={product.title}
          desc={product.desc}
          number={product.number}
          category={product.category}
          price={product.price}
        />
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}

export default Book;
