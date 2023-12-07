import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";

interface Coupon {
  percentage: number;
  discount_type: string;
  coupon_title: string;
  minimum_purchase: number;
  start_date: string;
  end_date: string;
  coupon_code: string;
}

interface CouponCodeProps {
  cpns: Coupon[];
}

const CouponCode: React.FC<CouponCodeProps> = ({ cpns }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyClick = (couponCode: string, index: number) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500); // Reset copied state after 1.5 seconds
  };

  return (
    <Row className="custom-container flex justify-content-center ">
      {cpns.map((coupon, index) => (
        <Col
          lg={2}
          key={index}
          className="m-2 "
          style={{
            borderStyle: "dashed",
            borderColor: "#D6D6D6",
            position: "relative",
            borderRadius: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faScissors}
            style={{
              position: "absolute",
              top: "-12",
              left: "30%",
              transform: "translateX(-50%)",
              color: "rgb(129, 172, 219)",

              cursor: "pointer",
              fontSize: "1.2rem",
              zIndex: "2",
            }}
          />

          <Row
            style={{
              backgroundColor: "rgb(226, 240, 255)",
            }}
          >
            <Col lg={3}>
              <div className="justify-content-center align-items-center text-center">
                <div
                  style={{
                    fontSize: "40px",
                    color: " rgb(129, 172, 219)",
                  }}
                >
                  {Math.round(coupon.percentage)}
                  <span
                    className="text-danger text-center"
                    style={{
                      fontSize: "20px",
                      verticalAlign: "super",
                    }}
                  >
                    %
                  </span>
                </div>
                <div className="justify-content-start  align-items-center mt-3">
                  <span
                    className=" text-uppercase    "
                    style={{ fontSize: "10px" }}
                  >
                    coupon
                  </span>

                  <div
                    className={`text-uppercase text-center   ${
                      copiedIndex === index ? "copied" : ""
                    }`}
                    onClick={() => handleCopyClick(coupon.coupon_code, index)}
                    style={{
                      backgroundColor:
                        copiedIndex === index ? "red" : "rgb(129, 172, 219)",
                      color: "white",
                      paddingRight: "60px",

                      width: "100%",
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "background-color 0.9s ease",
                      boxShadow:
                        copiedIndex === index
                          ? "0 9 9px rgba(255, 0, 0, 0.5)"
                          : "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
                    }}
                  >
                    {copiedIndex === index ? "Copied!" : coupon.coupon_code}
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={9}>
              <div
                className="parent position-relative"
                style={{ backgroundColor: "white" }}
              >
                <div className=" justify-content-center text-center align-items-center p-2">
                  <div className="text-secondary" style={{ fontSize: "15px" }}>
                    Discount on Purchase
                    {coupon.discount_type}
                  </div>
                  <div className="text-uppercase" style={{ fontSize: "20px" }}>
                    {coupon.coupon_title}
                  </div>
                  <div
                    style={{
                      color: "#0272bc",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
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
                <div className="row"></div>
              </div>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default CouponCode;
