import React from "react";
import { NextPage } from "next";
import { Row, Col, Media } from "reactstrap";

interface CollectionBannerProps {
  banner1: string;
  banner2: string;
  banner3: string;

}


const CollectionBannerList = ({ banner }) => {
  function transformImageUrl(apiImageUrl) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiImageUrl.replace(/ /g, '%20')}`;
  }
  const apiImageUrl = banner;
  const transformedImageUrl = transformImageUrl(apiImageUrl);  
  return (
    <Col md="4">
      <div className="collection-banner-main banner-1  p-right">
        <div className="collection-img">
          <Media src={transformedImageUrl} alt="dsfds" />
        </div>
      </div>
    </Col>
  );
};

const CollectionBanner: NextPage<CollectionBannerProps> = ({banner1,banner2,banner3}) => {

  return (
    <>
      <section className="custom-container collection-banner section-pt-space b-g-white ">
          <Row className="collection2">
            <CollectionBannerList banner={banner1} />
            <CollectionBannerList banner={banner2} />
            <CollectionBannerList banner={banner3} />
          </Row>
      </section>
    </>
  );
};

export default CollectionBanner;
