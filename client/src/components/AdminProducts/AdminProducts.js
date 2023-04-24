
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Modal, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import Book from "./Book.js";
import styles from "./Book.module.scss"
import { useEffect, useState } from "react";
import UpdateBook from "./UpdateBook.js";
const GET_ALL_PRODUCTS = gql`
query GetAllProducts {
    getAllProducts {
        id
      category
      description
      name
      price
      stock
      image
    }
  }`
function AdminProducts() {
    const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    useEffect(() => {
        if (data) {
            setProducts(data.getAllProducts)
        }
    }, [data])
    if (loading) return <Spinner />;
    return (
        <div >
            <Button onClick={() => toggle()} color="primary" >Add new product</Button>

            <article className={styles.bookList}>
                {products.map((product) => {
                    return (
                        <Book img={product.image} refetch={refetch} key={product.id} id={product.id} title={product.name} desc={product.description} number={product.stock} category={product.category} price={product.price} />
                    )
                })}
            </article>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add Product</ModalHeader>
                <UpdateBook toggle={toggle} refetch={refetch} />
                <ModalFooter>

                </ModalFooter>
            </Modal>
        </div>

    )
}

export default AdminProducts;