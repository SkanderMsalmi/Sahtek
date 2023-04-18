import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {
  decrement,
  increment,
  deletefromCart,
  selectCart,
  selectCountAll,
  selectTotal,
  clearCart,
} from '../../store/shop/cartSlice';
export default function Cart() {
  const Total = useSelector(selectTotal);
  const cart=useSelector((state)=>state.cart.cart);
  //console.log(cart);
  const dispatch = useDispatch();
  function TotalPrice(price, q) {
    return Number(price * q).toString();
  }
  const addItemToCart = (p) => {
    dispatch(increment(p));
  };
  const clear = () => {
    dispatch(clearCart());
  };
  const RemoveItemFromCart = (p) => {
    dispatch(decrement(p));
  };
  const DeleteItem = (p) => {
    dispatch(deletefromCart(p));
  };
  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card">
          <div class="card-body p-4">

            <div class="row">

              <div class="col-lg-7">
                <h5 class="mb-3"><a href="#!" class="text-body"><i
                      class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr/>

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p class="mb-1">Shopping cart</p>
                  </div>
                 
                </div>
               
                <div class="card mb-3">
                {cart.map((item, key) => {
                        return (
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style={{width:"65px"}}/>
                        </div>
                        <div class="ms-3">
                          <h5>{item.name}</h5>
                          <p class="small mb-0">{item.description}</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                      <button
                                    className="RemoveItem"
                                    onClick={() => RemoveItemFromCart(item)}
                                  >-</button>
                        <div style={{width:"50px"}}>
                          <h5 class="fw-normal mb-0">{item.quantity}</h5>
                        </div>
                        <button
                                    className="AddItem"
                                    onClick={() => addItemToCart(item)}
                                  >+</button>
                        <div style={{width:"80px"}}>
                          <h5 class="mb-0">{item.price}</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i class="fas fa-trash-alt" onClick={() => deletefromCart(item.id)}></i></a>
                      </div>
                    </div>
                    <button
                                    className=""
                                    onClick={() => clear()}
                                  >Clear Card</button>
                  </div>
                
                );
            })}
              </div>
              <div class="col-lg-5">

                <div class="card bg-primary text-white rounded-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h5 class="mb-0">Card details</h5>
                     
                    </div>

                    {/* <p class="small mb-2">Card type</p>
                    <a href="#!" type="submit" class="text-white"><i
                        class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                    <a href="#!" type="submit" class="text-white"><i
                        class="fab fa-cc-visa fa-2x me-2"></i></a>
                    <a href="#!" type="submit" class="text-white"><i
                        class="fab fa-cc-amex fa-2x me-2"></i></a>
                    <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a> */}

                    

                    <hr class="my-4"/>

                    <div class="d-flex justify-content-between">
                      <p class="mb-2">Subtotal</p>
                      <p class="mb-2">{TotalPrice()}</p>
                    </div>

                    <div class="d-flex justify-content-between">
                      <p class="mb-2">Shipping</p>
                      <p class="mb-2">$20.00</p>
                    </div>

                    <div class="d-flex justify-content-between mb-4">
                      <p class="mb-2">Total(Incl. taxes)</p>
                      <p class="mb-2">${TotalPrice()+100} </p>
                    </div>

                    <button type="button" class="btn btn-info btn-block btn-lg">
                      <div class="d-flex justify-content-between">
                        <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </div>
                    </button>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
        {/* <Container className="h-100 py-5">
          <Row className="justify-content-center align-items-center h-100">
            <Col>
              <Card className="shopping-cart" style={{ borderRadius: "15px",width:'80%' }}>
                <Card.Body className="text-black">
                  <Row>
                    <Col lg="12" className="px-5 py-4">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Shopping Cart
                      </h3>
                      {cart.map((item, key) => {
                        return (
                          <div className="d-flex align-items-center mb-5">
                            <div className="flex-shrink-0">
                              <Card.Img
                                //src={require("../assets/images/" + item.img)}
                                
                                style={{ width: "150px" }}
                                alt="Generic placeholder image"
                              />
                            </div>

                            <div className="flex-grow-1 ms-3">
                            
                              <h5 tag="h5" className="text-primary">
                                {item.name}
                              </h5>
                              
                              <div className="d-flex align-items-center">
                                <p className="fw-bold mb-0 me-5 pe-3">
                                  {item.price} DT
                                </p>

                                {/* <div className="def-number-input number-input safari_only"> */}
                                  {/* <button
                                    className="RemoveItem"
                                    onClick={() => RemoveItemFromCart(item)}
                                  >-</button>
                                  
                                  <input
                                    className="quantity fw-bold text-black def-number-input number-input safari_only"
                                    min={0}
                                    value={item.quantity}
                                    type="number"
                                  />
                                  <button
                                    className="AddItem"
                                    onClick={() => addItemToCart(item)}
                                  >+</button>
                                  <p className="fw-bold mb-0 me-5 pe-3">
                                  Total Price : {item.quantity*item.price} DT
                                </p>
                                {/* </div> */}
                                {/* <button className="RemoveCart" onClick={()=>DeleteItem(item)}>X</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <hr
                        className="mb-4"
                        style={{
                          height: "2px",
                          backgroundColor: "#1266f1",
                          opacity: 1,
                        }}
                      />

                      <div
                        className="d-flex justify-content-between p-2 mb-2"
                        style={{ backgroundColor: "#e1f5fe" }}
                      >
                        <h5 tag="h5" className="fw-bold mb-0">
                          Total:
                        </h5>
                        <h5 tag="h5" className="fw-bold mb-0">
                          {Total} DT{" "}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container> */} 
        </div>
      </section>
    </>
  );
}