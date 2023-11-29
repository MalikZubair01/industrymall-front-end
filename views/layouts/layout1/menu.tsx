import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Carousel from "react-bootstrap/Carousel";
import { Media } from "reactstrap";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Accordion from "react-bootstrap/Accordion";

type MenuProps = {
  meneData: any;
};

const Menu = ({ meneData }: MenuProps) => {
  const router = useRouter();
  const [menuData, setMenuData] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [banners, setBanners] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleMouseEnter = (index) => {
    setOpenMenuIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenMenuIndex(null);
  };

  function transformImageUrl(apiImageUrl) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiImageUrl.replace(
      / /g,
      "%20"
    )}`;
  }

  const handleClick = (id, type) => (e) => {
    e.preventDefault();
    if (type === "subcat") {
      router.push(`/collections/leftsidebar?sub_category=${id}`);
    }
    if (type === "cat") {
      router.push(`/collections/leftsidebar?category=${id}`);
    }
  };

  useEffect(() => {
    if (meneData && meneData.menus) {
      setMenuData(meneData.menus);
      setBanners(meneData.banners);
    }
  }, [meneData]);

  return (
    <div className="custom-container">
      {/* For large screens */}
      <div className="row">
        {/* 1st div - 25% */}
        <div className="col-lg-3">
          <div
            className="custom-menus mb-3 h-100 w-100"
            onMouseLeave={handleMouseLeave}
          >
            <div className="custom-input-group-text">
              <h4>Our Menu & Categories</h4>
            </div>
            {isMobile ? (
              <Accordion onMouseLeave={handleMouseLeave}>
                {Object.keys(menuData).map((menuKey, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>
                      <div
                        className="custom-text-black"
                        onMouseEnter={() => handleMouseEnter(index)}
                      >
                        <div
                          className="custom-text-black"
                          onMouseEnter={() => handleMouseEnter(index)}
                        >
                          <div
                            style={{
                              whiteSpace: "pre-line",
                              fontSize: "1.19em",
                              lineHeight: "1em",
                            }}
                          >
                            {menuData[menuKey].menu_name}
                          </div>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="side-menu-box">
                        {menuData[menuKey].categories?.map(
                          (category, categoryIndex) => (
                            <div
                              className="custom-side-menu-category"
                              key={categoryIndex}
                            >
                              <Dropdown.Item
                                onClick={() => handleClick(category.id, "cat")}
                                href={category.link}
                              >
                                <h5>{category.name}</h5>
                              </Dropdown.Item>
                              {category.sub_categories?.map(
                                (subcategory, subcategoryIndex) => (
                                  <Dropdown.Item
                                    key={subcategoryIndex}
                                    href={subcategory.link}
                                    onClick={() =>
                                      handleClick(subcategory.id, "subcat")
                                    }
                                  >
                                    {subcategory.name}
                                  </Dropdown.Item>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div
                className="custom-menus mb-3"
                onMouseLeave={handleMouseLeave}
              >
                {Object.keys(menuData).map((menuKey, index) => (
                  <DropdownButton
                    key={index}
                    drop="end"
                    className="custom-dropdown-menu"
                    show={openMenuIndex === index}
                    title={
                      <div
                        className="custom-text-black"
                        onMouseEnter={() => handleMouseEnter(index)}
                      >
                        <div
                          className="custom-text-black"
                          onMouseEnter={() => handleMouseEnter(index)}
                        >
                          <div
                            style={{
                              whiteSpace: "pre-line",
                              fontSize: "1.19em",
                              lineHeight: "1em",
                            }}
                          >
                            {menuData[menuKey].menu_name}
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div className="side-menu-box">
                      {menuData[menuKey].categories?.map(
                        (category, categoryIndex) => (
                          <div
                            className="custom-side-menu-category"
                            key={categoryIndex}
                          >
                            <Dropdown.Item
                              onClick={() => handleClick(category.id, "cat")}
                              href={category.link}
                            >
                              <h5>{category.name}</h5>
                            </Dropdown.Item>
                            {category.sub_categories?.map(
                              (subcategory, subcategoryIndex) => (
                                <Dropdown.Item
                                  key={subcategoryIndex}
                                  href={subcategory.link}
                                  onClick={() =>
                                    handleClick(subcategory.id, "subcat")
                                  }
                                >
                                  {subcategory.name}
                                </Dropdown.Item>
                              )
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </DropdownButton>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2nd div - 50% */}
        <div className="col-lg-6 d-none d-md-block">
          <div className="slider-top w-100">
            <Carousel>
              {banners.map((banner, index) => (
                <Carousel.Item key={index}>
                  <Media
                    className="d-block w-100"
                    src={transformImageUrl(banner.image)}
                    alt={`Banner ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>

        {/* 3rd div - 25% */}
        <div className="col-lg-3">
          <div className="menu-banners w-100 h-100">
            <Media
              className="d-block img-fluid h-100 w-100"
              src="/images/layout-2/slider/nextimg.jpeg"
              alt="Banner 1"
            />
          </div>
        </div>
      </div>

      {/* For mobile screens */}
      <div className="row d-md-none">
        {/* 1st div - 25% */}
        <div className="col-12 col-md-3">
          <div className="custom-menus mb-3" onMouseLeave={handleMouseLeave}>
            {/* ... your existing code ... */}
          </div>
        </div>

        {/* 2nd div - 100% */}
        <div className="col-12">
          <div className="slider-top w-100">
            <Carousel>
              {banners.map((banner, index) => (
                <Carousel.Item key={index}>
                  <Media
                    className="d-block w-100"
                    src={transformImageUrl(banner.image)}
                    alt={`Banner ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
