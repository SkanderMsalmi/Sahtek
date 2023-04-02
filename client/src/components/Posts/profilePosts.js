import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Label, FormGroup, Input, Row, Col, Button, Spinner } from "reactstrap";

const PROFILE_POSTS_QUERY = gql`
  query FindPostByUser($id: ID!) {
    findPostByUser(id: $id) {
      description
      like
      time
    }
  }
`;

function ProfilePosts(props) {
  let { id } = useParams();
  const { data, loading, error } = useQuery(PROFILE_POSTS_QUERY, {
    variables: { id: id ? id : props.user.id },
  });
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (data.findPostByUser?.length === 0)
    return (
      <div>
        <h3 className="text-muted">No posts yet :(</h3>
        <Button className="btn-round" color="warning">
          Find posts
        </Button>
      </div>
    );

  return (
    <Row>
      <Col className="ml-auto mr-auto">
        <ul className="list-unstyled follows">
          {data.findPostByUser.map((p) => {
            return (
              <>
                <li>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                      <img
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={require("../../assets/img/faces/clem-onojeghuo-2.jpg")}
                      />
                    </Col>
                    <Col className="mr-auto" lg="7" md="4" xs="4">
                      <h6 style={{ textAlign: "left" }}>
                        Flume <br />
                      </h6>
                      <p style={{ textAlign: "left" }}>{p.description}</p>
                      <small style={{ textAlign: "left" }}>{p.like} 👍</small>
                      <small style={{ textAlign: "right" }}>{p.time}</small>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                      <FormGroup check>
                        <Label check>
                          <Input
                            defaultChecked
                            defaultValue=""
                            type="checkbox"
                          />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </li>
                <hr />
              </>
            );
          })}
        </ul>
      </Col>
    </Row>
  );
}
export default ProfilePosts;
