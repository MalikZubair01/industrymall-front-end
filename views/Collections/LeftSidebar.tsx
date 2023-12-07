import { Col, Row } from "reactstrap";
import { NextPage } from "next";
import Sidebar from "./Sidebar";
import NewProduct from "./NewProduct";
import Collection from "./Collection";
import { FilterContext } from "helpers/filter/filter.context";
import { useContext, useEffect, useState } from "react";
import { useApiData } from "helpers/data/DataContext";
import Slider from "react-slick";
import axios from "axios";

type LeftSidebarCollectionProps = {
  cat: any;
  sub_cat: any;
  menu: any;
};

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

interface ApiData {
  menus?: {
    [menuName: string]: {
      categories: {
        id: number;
        sub_categories: {
          id: number;
          name: any;
          products: any[];
        }[];
      }[];
    };
  };
  brands?: any[];
}

const findMinPrice = (products) => {
  return Math.min(
    ...products.map((product) => parseFloat(product.new_sale_price))
  );
};

const findMaxPrice = (products) => {
  return Math.max(
    ...products.map((product) => parseFloat(product.new_sale_price))
  );
};

const LeftSidebarCollection: NextPage<LeftSidebarCollectionProps> = ({
  sub_cat,
  cat,
  menu,
}) => {
  const { leftSidebarOpen } = useContext(FilterContext);
  const [products, setProducts] = useState([]);
  const [nonProductData, setNonProductData] = useState({});
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (menu) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/p_b_menu/${menu}`
          );
          setProducts(res.data.products);
        }
        if (cat) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/p_b_cat/${cat}`
          );
          setProducts(res.data.products);
          setNonProductData(res.data.category);
        }
        if (sub_cat) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/p_b_sub/${sub_cat}`
          );
          setProducts(res.data.products);
          setNonProductData(res.data.sub_cat);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch data when sub_cat changes
    fetchData();
  }, [sub_cat, cat, menu]);


  console.log("products", products);

  useEffect(() => {
    if (products.length > 0) {
      const minPrice = findMinPrice(products);
      const maxPrice = findMaxPrice(products);
      setPriceRange({ min: minPrice, max: maxPrice });
    }

    if (products.length > 0) {
      const minPrice = findMinPrice(products);
      const maxPrice = findMaxPrice(products);
      setPriceRange({ min: minPrice, max: maxPrice });
    }
  }, [products, sub_cat, cat, menu]);

  function transformImageUrl(apiImageUrl) {
    if (!apiImageUrl) {
      return ""; // or some default URL or error handling
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/`;
    return `${baseUrl}${apiImageUrl.replace(/ /g, "%20")}`;
  }

  return (
    <Row>
      <Col
        sm="3"
        style={{
          left: leftSidebarOpen ? "-15px" : "",
        }}
        id="filter"
        className="collection-filter category-page-side"
      >
        <div className="sticky-sidebar">
          <Sidebar sub_cat={sub_cat} brand={brands} priceRange={priceRange} />
          <NewProduct item={undefined} />
          <div className="collection-sidebar-banner">
            <Slider {...sliderSettings}>
              {" "}
              {/* Use the slider component */}
              {sliderImages.map((imageUrl, index) => (
                <div key={index}>
                  <img
                    src={transformImageUrl(imageUrl)}
                    className="img-fluid"
                    alt={`Banner ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Col>
      <Collection
        products={products}
        cat={nonProductData}
        cols="col-xl-3 col-md-4 col-6 col-grid-box"
        layoutList=""
      />
    </Row>
  );
};

export default LeftSidebarCollection;
