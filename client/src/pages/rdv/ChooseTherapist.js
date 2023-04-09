import React from "react";
import styles from './ChooseTherapist.module.scss'
import {
    Card,
    CardGroup,
    CardBlock,
    CardFooter,
    CardTitle,
    CardImg,
    CardText,
  } from 'react-bootstrap-card';
import { CardBody } from "reactstrap";


function ChooseTherapist(){
    

return(
    <div class={`${styles.bloc}`}>
        <div className="d-flex justify-content-center row">
            <div className="col-md-10">
                <div className="rounded">
                    <div className="table-responsive table-borderless"></div>
                    <CardGroup>
      <Card>
        <CardImg variant="top" src="holder.js/100px160" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </CardText>
        </CardBody>
        <CardFooter>
          <small className="text-muted">Last updated 3 mins ago</small>
        </CardFooter>
      </Card>
      <Card>
        <CardImg variant="top" src="holder.js/100px160" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </CardText>
        </CardBody>
        <CardFooter>
          <small className="text-muted">Last updated 3 mins ago</small>
        </CardFooter>
      </Card>
      <Card>
        <CardImg variant="top" src="holder.js/100px160" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </CardText>
        </CardBody>
        <CardFooter>
          <small className="text-muted">Last updated 3 mins ago</small>
        </CardFooter>
      </Card>
    </CardGroup>
    </div></div></div></div>
);
}
export default ChooseTherapist