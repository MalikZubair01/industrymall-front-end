import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Slider from "react-slick";
import { useApiData } from "helpers/data/DataContext";
import Link from "next/link";

interface data {
  menus: any;
}

const TopCategory: NextPage<data> = ({menus}) => {
  const menusData = menus ;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (menusData) {
      const allCategories = [];
  
      for (const menu of menusData) {
        if (menu.categories && menu.categories.length > 0) {
          for (const category of menu.categories) {
            allCategories.push(category);
          }
        }
      }
  
      setCategories(allCategories);
    }
  }, [menusData]);

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3500,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 12, // Default to 12 for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // Screen width up to 1200px (you can adjust as needed)
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // Screen width up to 992px
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Screen width up to 768px
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // Screen width up to 576px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const transformImageUrl = (apiImageUrl) => {
    const transformedUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/${apiImageUrl.replace(/ /g, "%20")}`;
    return transformedUrl;
  };

  const imageStyles: React.CSSProperties = {
    objectFit: "cover",
    cursor: "pointer",
  };

  return (
    <div className="custom-container">
      <Slider {...sliderSettings}>
        {categories.length > 0 ? (
          categories.map((category, i) => (
            <Link
              href={`/collections/leftsidebar?category=${category.id}`}
              style={{}}
            >
              <div
                key={i}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <img
                  src={transformImageUrl(category.imageforapp)}
                  alt={category.name}
                  className="img-fluid mb-2 rounded-circle shadow"
                  style={imageStyles}
                  width="100"
                  height="100"
                />
                <p
                  className="name text-center"
                  style={{
                    
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 2, // Number of lines to show
                      textOverflow: "ellipsis",
                    
                  }}
                >
                  {category.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center"></div>
        )}
      </Slider>
    </div>
  );
};

export default TopCategory;
