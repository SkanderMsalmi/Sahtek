import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Row,
} from "reactstrap";

const SideBarMenu = ({
  categories,
  onCategoryChange,
  searchQuery,
  onSearchQueryChange,
  selectedCategories,
  onPriceChange,
  maxPrice,
}) => {
  const [isOpen, setIsNavOpen] = useState(false);

  return (
    <div className={`m-5 sidenav ${isOpen ? "open" : ""}`}>
      <Row>
        <Col>
          <Input
            type="text"
            placeholder="Search here ..."
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </Col>
        <Col>
          <Button> Search </Button>
        </Col>
        <Col>
          <FormGroup className="mx-2">
            <Label for="priceRange">Price Range:</Label>
            <Input
              type="range"
              name="priceRange"
              min="0"
              max="500"
              step="10"
              value={maxPrice}
              onChange={onPriceChange}
            />
          </FormGroup>
          <Row className="d-flex justify-content-center align-items-center m-2">
            <Col md="6" className="w-50">
              <p>{maxPrice} DT</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Nav vertical>
        <h4>Categories</h4>
        <Row className="m-4" md={"4"}>
          {categories &&
            categories.map((c, index) => (
              <FormGroup key={index}>
                <Label for={c}>
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    value={c}
                    checked={selectedCategories.includes(c)}
                    onChange={onCategoryChange}
                  />{" "}
                  {c}
                </Label>
              </FormGroup>
            ))}
        </Row>
      </Nav>
    </div>
  );
};

export default SideBarMenu;
