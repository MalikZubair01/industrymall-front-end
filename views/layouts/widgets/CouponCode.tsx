import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function CouponCode({ dataR }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://dashboard.industrymall.net/api/homeapi"
  //       );
  //       setData(response.data);
  //       console.log("my data", data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Row className="custom-container flex justify-content-center">
      {data?.coupons.map((coupon, index) => (
        <Col
          key={index}
          lg={3}
          className="m-2"
          style={{
            backgroundColor: "rgb(216, 230, 241,1)",
            borderStyle: "dashed",
            borderColor: "black",
            position: "relative",
          }}
        >
          <FontAwesomeIcon
            icon={faScissors}
            style={{
              position: "absolute",
              top: "-20",
              left: "20%",
              transform: "translateX(-50%)",
              color: "black",
              cursor: "pointer",
              fontSize: "2rem",
            }}
          />

          <Row>
            <Col lg={5}>
              <div>
                <div
                  style={{
                    fontSize: "90px",
                    color: "blue",
                  }}
                >
                  {Math.round(coupon.percentage)}
                  <span
                    className="text-danger text-center"
                    style={{
                      fontSize: "50px",
                      verticalAlign: "super",
                    }}
                  >
                    %
                  </span>
                </div>
                <span className="flex text-uppercase justify-content-center text-center text-secondary">
                  coupon
                </span>
                <div
                  className="text-uppercase text-center"
                  style={{
                    borderStyle: "dotted",
                    borderColor: "darkblue",
                    fontSize: "15px",
                  }}
                >
                  {coupon.coupon_code}
                </div>
              </div>
            </Col>

            <Col lg={7}>
              <div
                className="parent position-relative"
                style={{ backgroundColor: "white" }}
              >
                <div className="text-center justify-content-center align-items-center p-3">
                  <div className="text-secondary" style={{ fontSize: "15px" }}>
                    Discount on Purchase
                    {coupon.discount_type}
                  </div>
                  <div className="text-uppercase" style={{ fontSize: "20px" }}>
                    {coupon.coupon_title}
                  </div>
                  <div
                    style={{
                      color: "rgba(216, 230, 241, 1)",
                      fontSize: "15px",
                    }}
                  >
                    Minimum Purchase ($) :{coupon.minimum_purchase}
                  </div>

                  <div>
                    <div>
                      <span className="fw-bold" style={{ fontSize: "15px" }}>
                        Start Date :
                      </span>
                      <span
                        style={{
                          color: "darken(rgba(0, 0, 0, 0.7), 20%)",
                        }}
                      >
                        {coupon.start_date}
                      </span>
                    </div>
                    <div>
                      <span className="fw-bold" style={{ fontSize: "15px" }}>
                        End Date :
                      </span>
                      <span
                        style={{
                          color: "darken(rgba(0, 0, 0, 0.7), 20%)",
                        }}
                      >
                        {coupon.end_date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <div className="position-absolute top-0 start-2">
                      <div
                        className="rounded-circle "
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#eeeeee",
                        }}
                      ></div>
                      <div
                        className="vr"
                        style={{
                          borderLeft: "1px dotted #yourColor", // Replace #yourColor with your desired color code
                          height: "100%",
                          margin: "0 10px", // Adjust the margin as needed
                        }}
                      ></div>
                    </div>

                    <div className="position-absolute bottom-0 start-2">
                      <div
                        className="rounded-circle rounded-circle "
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "#eeeeee",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}

export default CouponCode;
