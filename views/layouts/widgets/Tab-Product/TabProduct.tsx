import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Carousel,
  CarouselItem,
} from "reactstrap";
import ProductBox from "../Product-Box/productbox";
import Slider from "react-slick";
import { WishlistContext } from "../../../../helpers/wishlist/wish.context";
import { CompareContext } from "../../../../helpers/compare/compare.context";
import { Skeleton } from "../../../../common/skeleton";
import Link from "next/link";
import { setProducts } from "store/product/reducers";
import { useDispatch } from "react-redux";
import axios from "axios";

var settings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

type TabProductProps = {
  catId: string;
  effect?: any;
  menus: [];
};

interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  img: string;
  imageforapp: string | null;
  biller: string;
  slug: string;
  commission: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  menu_id: string;
  name: string;
  img: string;
  imageforapp: string | null;
  commission: string;
  side_sliders: string | null;
  created_at: string;
  updated_at: string;
  sub_categories: SubCategory[];
}

interface Menu {
  menu_name: string;
  slug: string | null;
  icon: string;
  image: string;
  imageforapp: string;
  sliders: string[] | null;
  categories: Category[];
}

const TabProduct: NextPage<TabProductProps> = ({ catId, effect, menus }) => {
  const { addToWish } = React.useContext(WishlistContext);
  const { addToCompare } = React.useContext(CompareContext);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  

  const menuData = menus as Menu[];

  useEffect(() => {
    if(menuData  && menuData.length > 0) {
      for (let menu of menuData) {
        for (let cat of menu.categories) {
          if (cat.id === catId) {
            setCategoryName(cat.name);
            setSubCategoriesData(cat.sub_categories);
            setActiveTab(cat.sub_categories[0].id.toString());
            break;
          }
        }
      }
      if (subCategoriesData.length > 0) {
        setActiveTab(subCategoriesData[0].id);
      }
    }
  }, [catId, menuData, subCategoriesData]);

  useEffect(() => {
    if (activeTab && subCategoriesData.length > 0) {
      const activeSubCategory = subCategoriesData.find(
        (subCategory) => subCategory.id === activeTab
      );

      if (activeSubCategory) {
        const subCategoryId = activeSubCategory.id;

        axios
          .get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/p_b_sub/${subCategoryId}`
          )
          .then((res) => {
            setProductsData(res.data.products);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
            setLoading(false); // You might want to handle the error state appropriately
          });
      }
    }
  }, [activeTab, subCategoriesData]);

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const currentIndex = subCategoriesData.findIndex(
      (subCategory) => subCategory.id === activeTab
    );

    if (currentIndex === 6 && subCategoriesData.length > 7) {
      setActiveTab(subCategoriesData[9].id);
      setActiveIndex(1);
    } else {
      const nextIndex = (currentIndex + 1) % subCategoriesData.length;
      setActiveTab(subCategoriesData[nextIndex].id);

      const visibleCategories = currentIndex % 7;
      if (visibleCategories === 6) {
        setActiveIndex(
          (activeIndex + 1) % Math.ceil(subCategoriesData.length / 7)
        );
      }
    }
    setLoading(true);
  };

  const previous = () => {
    const currentIndex = subCategoriesData.findIndex(
      (subCategory) => subCategory.id === activeTab
    );

    if (currentIndex % 7 === 0 && currentIndex !== 0) {
      setActiveTab(subCategoriesData[currentIndex - 1].id);
      setActiveIndex(activeIndex - 1);
    } else {
      const previousIndex =
        (currentIndex - 1 + subCategoriesData.length) %
        subCategoriesData.length;
      setActiveTab(subCategoriesData[previousIndex].id);

      const visibleCategories = (currentIndex - 1) % 7;
      if (visibleCategories === 6) {
        setActiveIndex(
          (activeIndex - 1 + Math.ceil(subCategoriesData.length / 7)) %
            Math.ceil(subCategoriesData.length / 7)
        );
      }
    }
    setLoading(true);
  };

  const handleProduct = (product) => (e) => {
    e.preventDefault();
    dispatch(setProducts(product));
  };

  return (
    <div className="section-pt-space custom-container bg-white mt-2 ">
      <section className="">
        <div className="tab-product-main">
          <div className="tab-prodcut-contain">
            <div className="category-title">
              <h3>
                {categoryName.substring(0, 25)}
                {categoryName.length > 25 ? "..." : ""}
              </h3>
            </div>

            <div className="top-bar-product-catogories ">
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                interval={false}
              >
                {subCategoriesData.map((subCategory, i) => (
                  <CarouselItem key={subCategory.id}>
                    <ul className="product-catogories">
                      {subCategoriesData.slice(i, i + 5).map((subCategory) => (
                        <li className="top-catogories" key={subCategory.id}>
                          <a
                            className={
                              activeTab === subCategory.id ? "active" : ""
                            }
                            onClick={(e) => {
                              setLoading(true);
                              setActiveTab(subCategory.id);
                            }}
                          >
                            {subCategory.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
            <div className="view-all d-flex " style={{ marginLeft: "auto" }}>
              <div className="px-2 arrows">
                <ul className="catogories-arrows">
                  <li>
                    <a className="prev" onClick={previous}>
                      <i className="fa fa-angle-left"></i>
                    </a>
                  </li>
                  <li>
                    <a className="next" onClick={next}>
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="view-akk">
                <Link href={`/collections/leftsidebar?category=${catId}`}>
                  <a>View all</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py-space ratio_asos product  ">
        <div className="custom-container">
          <Row>
            <Col className="pe-0">
              <TabContent activeTab={activeTab}>
                <TabPane tabId={activeTab}>
                  <div className="product product-slide-6 product-m no-arrow">
                    <div>
                      {loading ? (
                        <Skeleton />
                      ) : (
                        <Slider {...settings}>
                          {productsData.map((product, i) => (
                            <div key={i} onClick={handleProduct(product)}>
                              <ProductBox
                                hoverEffect={effect}
                                product={product}
                                addCompare={(product) => addToCompare(product)}
                                addWish={(product) => addToWish(product)}
                              />
                            </div>
                          ))}
                        </Slider>
                      )}
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default TabProduct;
