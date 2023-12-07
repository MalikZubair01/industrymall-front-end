import { NextPage } from "next";
import { Media } from "reactstrap";
import Link from "next/link";
import { useSelector } from "react-redux";
// import { MenuState } from "store/menu/reducers";
import { useEffect, useState } from "react";

type CollectionBannerProps = {
  cat: any;
};

const imageStyles: React.CSSProperties = {
  objectFit: "cover",
  cursor: "pointer",
};

function transformImageUrl(apiImageUrl) {
  if (!apiImageUrl) {
    return "";
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/`;
  const url = `${baseUrl}${apiImageUrl.replace(/ /g, "%20")}`;
  return url;
}
const CollectionBanner: NextPage<CollectionBannerProps> = ({ cat }) => {
  // const menu  = useSelector((state :MenuState) => state.menus);
//   const [colletction, setColletction] = useState([]);

//  useEffect(()=>{

//   const colletction =[]

//   for(let m in menu){
//     for(let c in m.categories){
//       if(cat.id === c.id){
//         setColletction(c.sub_categories)
//       }
//     }
//   }
//  },[cat,menu])
  return (
    <div className="top-banner-wrapper">
      <a href="#">
        <Media src={transformImageUrl(cat.img)} className="img-fluid" alt="" />
      </a>
      <div className="top-banner-content small-section">
        <h1>{ cat.name}</h1>

        {/* {cat.sub_categories ? (
          <div className="top-banner-content small-section">
            {cat.sub_categories.length > 8 ? (
              <div
                id="carouselExample"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  {cat.sub_categories.map((subCategory, i) => (
                    <div
                      className={`carousel-item ${i === 0 ? "active" : ""}`}
                      key={i}
                    >
                      {cat.sub_categories
                        .slice(i * 8, (i + 1) * 8)
                        .map((sub, j) => (
                          <Link
                            href={`/collections/leftsidebar?sub_category=${sub.id}`}
                            key={j}
                          >
                            <div
                              className="d-flex flex-column align-items-center justify-content-center"
                              style={{ float: "left", width: "12.5%" }}
                            >
                              <img
                                src={transformImageUrl(sub.img)}
                                alt={sub.name}
                                className="img-fluid mb-2 rounded-circle shadow"
                                style={imageStyles}
                                width="100"
                                height="100"
                              />
                              <p className="name text-center">
                                {sub.name.substring(0, 12)}{" "}
                                {sub.name.length > 12 && "..."}
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExample"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExample"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            ) : (
              <div className="d-flex">
                {cat.sub_categories.map((sub, j) => (
                  <Link
                    href={`/collections/leftsidebar?sub_category=${sub.id}`}
                    key={j}
                  >
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{ float: "left", width: "12.5%" }}
                    >
                      <img
                        src={transformImageUrl(sub.img)}
                        alt={sub.name}
                        className="img-fluid mb-2 rounded-circle shadow"
                        style={imageStyles}
                        width="100"
                        height="100"
                      />
                      <p className="name text-center">
                        {sub.name.substring(0, 12)}{" "}
                        {sub.name.length > 12 && "..."}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">No Sub categories available</div>
        )} */}


      </div>
    </div>
  );
};
export default CollectionBanner;
