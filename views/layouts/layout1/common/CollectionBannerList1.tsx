import React from "react";

const CollectionBannerList1 = ({ banner }) => {
  function transformImageUrl(apiImageUrl) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiImageUrl.replace(
      / /g,
      "%20"
    )}`;
  }

  const apiImageUrl = banner;
  const transformedImageUrl = transformImageUrl(apiImageUrl);

  return (
    <div className="col-md-4">
      <div className="collection-banner-main banner-1 p-left">
        <div className="collection-img">
          <img
            src={transformedImageUrl}
            className="img-fluid bg-img"
            style={{ objectFit: "scale-down" }}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionBannerList1;
