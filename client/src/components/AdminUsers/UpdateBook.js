import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, CustomInput, FormGroup, Input } from "reactstrap";

const UPDATE_BOOK = gql`
  mutation UpdateBook($bookInput: ProductInput, $img: Upload) {
    updateProduct(productInput: $bookInput, img: $img) {
      image
    }
  }
`;
const CREATE_BOOK = gql`
  mutation Mutation($productInput: ProductInput, $image: Upload) {
    addProduct(productInput: $productInput, image: $image) {
      image
      description
    }
  }
`;

function UpdateBook(props) {
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [createBook] = useMutation(CREATE_BOOK);
  const handleSubmit = () => {
    if (props.id) {
      updateBook({
        variables: {
          bookInput: {
            id: book.id,
            name: book.title,
            description: book.desc,
            category: book.category,
            price: book.price * 1,
            stock: book.number * 1,
          },
          img: book.img,
        },
      }).then((res) => {
        props.setProduct({
          id: book.id,
          title: book.title,
          desc: book.desc,
          category: book.category,
          price: book.price * 1,
          number: book.number * 1,
          img: res.data.updateProduct.image,
        });
        props.refetch().then((res) => {
          props.toggle();
        });
      });
    } else {
      createBook({
        variables: {
          productInput: {
            name: book.title,
            description: book.desc,
            category: book.category,
            price: book.price * 1,
            stock: book.number * 1,
          },
          image: book.img,
        },
      }).then((res) => {
        props.refetch().then((res) => {
          props.toggle();
        });
      });
    }
  };
  const [book, setBook] = useState({
    id: props.id,
    title: props.title,
    desc: props.desc,
    number: props.number,
    category: props.category,
    price: props.price,
  });

  return (
    <form className="p-2">
      <Input
        className="mt-4 text-dark"
        placeholder="Name"
        type="text"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      <Input
        className="mt-4 text-dark"
        placeholder="Description"
        type="text"
        value={book.desc}
        onChange={(e) => setBook({ ...book, desc: e.target.value })}
      />
      <Input
        className="mt-4 text-dark"
        placeholder="Category"
        type="text"
        value={book.category}
        onChange={(e) => setBook({ ...book, category: e.target.value })}
      />
      <Input
        className="mt-4 text-dark"
        placeholder="Price"
        type="number"
        value={book.price}
        onChange={(e) => setBook({ ...book, price: e.target.value })}
      />
      <Input
        className="mt-4 text-dark"
        placeholder="Stock"
        type="number"
        value={book.number}
        onChange={(e) => setBook({ ...book, number: e.target.value })}
      />
      <FormGroup>
        <CustomInput
          type="file"
          id="exampleCustomFileBrowser"
          name="customFile"
          className="mt-4 text-dark"
          label={book.name || "choose an image file"}
          onChange={(e) => setBook({ ...book, img: e.target.files[0] })}
        />
      </FormGroup>
      {/* <Input className="mt-4" type="file"  /> */}
      <Button
        color="primary"
        disabled={
          book.title == "" ||
          book.desc == "" ||
          book.category == "" ||
          book.price == null ||
          book.number == null ||
          (book.id == null && book.img == null)
        }
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {props.id ? "Update" : "Create"}
      </Button>
      <Button color="secondary" onClick={() => props.toggle()}>
        Cancel
      </Button>
    </form>
  );
}

export default UpdateBook;
