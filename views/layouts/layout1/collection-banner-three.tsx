import React from "react";
import { Col, Row, Media } from "reactstrap";
import CollectionBannerList1 from "./common/CollectionBannerList1";

interface CollectionBannerProps {
  ban1: any;
  ban2: any;
  ban3: any;
}
function transformImageUrl(apiImageUrl) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiImageUrl.replace(
    / /g,
    "%20"
  )}`;
}
const CollectionBannerList = ({ banner }) => {
 
  const apiImageUrl = banner;
  const transformedImageUrl = transformImageUrl(apiImageUrl);
  return (
    <Col md="4">
      <div className="collection-banner-main banner-1 p-left ">
        <div className="collection-img ">
          <Media
            src={transformedImageUrl}
            className="img-fluid bg-img"
            style={{ objectFit: "scale-down" }}
            alt="banner"
          />
        </div>
      </div>
    </Col>
  );
};

const CollectionBannerThree: React.FC<CollectionBannerProps> = ({
  ban1,
  ban2,
  ban3,
}) => {

  console.log(ban2);

  return (
    <section className="collection-banner section-pt-space b-g-white ">
      <div className="custom-container">
        <Row className="collection2">
          <CollectionBannerList banner={ban1} />
          {/*  */}
          <div className="d-flex col-4 bg-light justify-content-center align-items-center bg-white">
            <div className="col-6">
              <img src={transformImageUrl(ban2)} alt="not avaliable " />
              {/* <img src='/images/movile-pic.jpg' alt="not avaliable " /> */}
            </div>
            <div className="col-6 p-3">
              <h5 style={{ color: "#333", fontSize: "14px" }}>
                Download INDUSTRY MALL <br /> App Now!
              </h5>
              <p
                className="my-2"
                style={{
                  color: "#999",
                  fontSize: "12px",
                }}
              >
                Shopping quickly and easily with our app. Get a link to download
                the app on your phone
              </p>
              <div className="form my-2">
                <div
                  className="input-group my-2"
                  style={{ display: "flex", width: "100%" }}
                >
                  <input
                    type="text"
                    className="form-control form-control-sm ms-2"
                    placeholder="Email Address"
                    style={{
                      borderColor: "orange",
                      maxWidth: "fit-content",
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    id="basic-addon2"
                    style={{
                      backgroundColor: "orange",
                      borderColor: "orange",
                      color: "white",
                      minWidth: "fit-content",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                <div className="app-item-group" style={{ display: "flex" }}>
                  <div className="app-item">
                    <a href="#" rel="noopener noreferrer">
                      <img
                        src="/images/GooglePlay.png"
                        alt="Google Play"
                        className="img-fluid media"
                        style={{
                          width: "80px",
                          height: "40px",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </div>
                  <div className="app-item">
                    <a href="#" rel="noopener noreferrer">
                      <img
                        src="/images/AppStore.png"
                        alt="App Store"
                        className="img-fluid media"
                        style={{
                          width: "70px",
                          height: "40px",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <CollectionBannerList banner={ban3} />
        </Row>
      </div>
    </section>
  );
};

export default CollectionBannerThree;
