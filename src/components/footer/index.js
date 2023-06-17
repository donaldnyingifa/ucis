import React, { useRef, useState } from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo2 from "../../images/fg.png";
import insta from "../../images/social/insta.svg";
import youtu from "../../images/social/youtube.svg";
import fb from "../../images/social/facebook.svg";
import twit from "../../images/social/twitter.svg";
import { InfinitySpin } from "react-loader-spinner";
import './footer.scss'

export default function Footer() {
  const emailRef = useRef();

  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");

  function handleJoin(e) {
    e.preventDefault();
    if (emailRef.current.value.length < 5) {
      setErr(
        (err = "Please enter a valid email ")
      );
      return;
    }
    setLoading(true);

    // const l = "http://localhost:5001/bomchi-39029/us-central1/app/api/email";
    const s =
      "https://us-central1-bomchi-39029.cloudfunctions.net/app/api/email";
    fetch(s, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setErr(
          (err = "Thanks for signing up 😬")
        );
        // use => this.email.current.value, ref={this.email} instead of dom
        document.getElementById("email").reset();
        setLoading(false);
      })
      .catch((err) => {
        setLoading((loading = false));
        console.log(err);
      });
  }
  return (
    <>
      <Row className="footer">
        <Col sm>
          <div className="fm">
            <Image src={logo2} width="300px" />
          </div>
        </Col>

        <Col sm>
          <div className="fm fu">
            <h3 className>Follow us</h3>
            <a
              href="https://www.instagram.com/nimc_ng"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <Image src={insta} width="50px" />
            </a>
            <br />

            <a
              href="https://web.facebook.com/nimc.ng"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <Image src={fb} width="50px" />
            </a>

            <br />

            <a
              href="https://www.youtube.com/channel/UCRjeenGpZNJRXXk9l-tpquQ"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <Image src={youtu} width="50px" />
            </a>

            <br />

            <a
              href="https://twitter.com/nimc_ng"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <Image src={twit} width="50px" />
            </a>

          </div>
        </Col>

        <Col sm>
          <div className="fm">
            <h3>Footer Menu</h3>
            <ul className="fm1">
              <li>
                <Link to="/"> HOME</Link>
              </li>

              <li>
                <Link to="/dashboard">
                  {" "}
                  ENROLLMENT DASHBOARD
                </Link>
              </li>
              <li>
                <Link to="/login">
                  {" "}
                  STAFF LOGIN
                </Link>
              </li>
              <li>
                <Link to="/faq">
                  {" "}
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/id">
                  <Button> GENERATE ID </Button>
                </Link>
              </li>
            </ul>
          </div>
        </Col>

        <Col sm>
          <div className="fm">
            <h3>Sign up for our newsletter </h3>
            <Form
              id="email"
              onSubmit={handleJoin}
            >
              <Form.Control
                ref={emailRef}
                className="mb"
                size="lg"
                type="email"
                placeholder="Email Address"
                required
              />
              <div
                className="d-grid gap-2"
                style={{ marginBottom: "20px", marginTop: "5px" }}
              >
                {err.length > 0 && <p>{err}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  variant="secondary"
                  size="lg"
                >
                  {loading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <InfinitySpin
                        type="ThreeDots"
                        color="#fff"
                        height="30"
                        width="30"
                      />
                    </div>
                  ) : (
                    "JOIN"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <div className="footer-text">
          <p style={{ marginTop: "3px" }}>
            © 2023 NIMC | Developed by{" "}
            <span>Mike Johnson</span>
          </p>
        </div>
      </Row>
    </>
  );
}
