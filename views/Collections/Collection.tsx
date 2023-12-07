import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { Row, Col, Spinner, Button } from "reactstrap";
import ProductBox from "../layouts/widgets/Product-Box/productbox";
import CollectionBanner from "./CollectionBanner";
import { FilterContext } from "../../helpers/filter/filter.context";
import { CartContext } from "../../helpers/cart/cart.context";
import { WishlistContext } from "../../helpers/wishlist/wish.context";
import { Skeleton } from "../../common/skeleton";
import { setProducts } from "store/product/reducers";
import { useDispatch } from "react-redux";
import { CompareContext } from "helpers/compare/compare.context";

type CollectionProps = {
  cols: any;
  layoutList: string;
  products: any;
  cat: any;
};

const Collection: NextPage<CollectionProps> = ({
  cols,
  layoutList,
  products,
  cat,
}) => {
  const {
    selectedCategory,
    selectedBrands,
    selectedColor,
    selectedPrice,
    setSelectedColor,
    setSelectedBrands,
    setLeftSidebarOpen,
    leftSidebarOpen,
  } = useContext(FilterContext);
  const { addToCart } = React.useContext(CartContext);
  const { addToWish } = React.useContext(WishlistContext);
  const { addToCompare } = React.useContext(CompareContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [grid, setGrid] = useState(cols);
  const [sortBy, setSortBy] = useState("ASC_ORDER");
  const [pageLimit, setPageLimit] = useState(12);
  const [layout, setLayout] = useState(layoutList);
  const [isLoading, setIsLoading] = useState(true);
  const [allProductData, setAllProductData] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(pageLimit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      setAllProductData(products);
      setIsLoading(false);
      applyFilters();
    }
  }, [products, selectedBrands, selectedColor, selectedPrice]);

  const applyFilters = () => {
    let filtered = products;
  
    // Filter by selected brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand.brand_name)
      );
    }
  
    // Filter by selected color
    if (selectedColor) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => color.color.name === selectedColor)
      );
    }
  
    // Filter by selected price range
    if (selectedPrice && selectedPrice.min !== undefined && selectedPrice.max !== undefined) {
      filtered = filtered.filter((product) => {
        const productPrice = parseFloat(product.new_price);
        return productPrice >= selectedPrice.min && productPrice <= selectedPrice.max;
      });
    }
  
    setFilteredProducts(filtered);
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    setSelectedBrands(temp);
  };

  const removeColor = () => {
    setSelectedColor("");
  };

  const handleProduct = (product) => (e) => {
    e.preventDefault();
    dispatch(setProducts(product));
  };

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            {/* Collection Banner */}
            <CollectionBanner cat={cat} />
            <div className="collection-product-wrapper">
              <Row>
                <Col xs="12">
                  <ul className="product-tags">
                    {!!selectedBrands.length &&
                      selectedBrands.map((brand, i) => (
                        <li className="me-1" key={i}>
                          <a className="filter_tag">
                            {brand}
                            <i
                              className="ti-close"
                              onClick={() => removeBrand(brand)}
                            ></i>
                          </a>
                        </li>
                      ))}
                    {!!selectedColor.length && (
                      <li
                        className={`color-swatch`}
                        style={{ backgroundColor: selectedColor.toString() }}
                      >
                        {selectedColor && (
                          <a className="filter_tag">
                            {selectedColor}
                            <i className="ti-close" onClick={removeColor}></i>
                          </a>
                        )}
                      </li>
                    )}
                  </ul>
                </Col>
              </Row>
              <div className="product-top-filter">
                <Row>
                  <Col xs="12">
                    <div className="filter-main-btn">
                      <span
                        className="filter-btn"
                        onClick={() => {
                          setLeftSidebarOpen(!leftSidebarOpen);
                        }}
                      >
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        Filter
                      </span>
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {allProductData
                            ? `Showing Products ${allProductData.length}`
                            : "loading"}{" "}
                          Result
                        </h5>
                      </div>

                      <div className="collection-view">
                        <ul>
                          <li
                            onClick={() => {
                              setLayout("");
                              setGrid(cols);
                            }}
                          >
                            <i className="fa fa-th grid-layout-view"></i>
                          </li>
                          <li
                            onClick={() => {
                              setLayout("list-view");
                              setGrid("col-lg-12");
                            }}
                          >
                            <i className="fa fa-list-ul list-layout-view"></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { opacity: 0 }
                            : { opacity: 1 }
                        }
                      >
                        <ul>
                          <li onClick={() => setGrid("col-lg-6")}>
                            <img
                              src="/images/category/icon/2.png"
                              alt=""
                              className="product-2-layout-view"
                            />
                          </li>
                          <li onClick={() => setGrid("col-lg-4")}>
                            <img
                              src="/images/category/icon/3.png"
                              alt=""
                              className="product-3-layout-view"
                            />
                          </li>
                          <li onClick={() => setGrid("col-lg-3")}>
                            <img
                              src="/images/category/icon/4.png"
                              alt=""
                              className="product-4-layout-view"
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) =>
                            setPageLimit(parseInt(e.target.value))
                          }
                        >
                          <option value="12">12 Products Par Page</option>
                          <option value="16">16 Products Par Page</option>
                          <option value="20">20 Products Par Page</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select onChange={(e) => setSortBy(e.target.value)}>
                          <option value="ASC_ORDER">Sorting items</option>
                          <option value="HIGH_TO_LOW">High To Low</option>
                          <option value="LOW_TO_HIGH">Low To High</option>
                          <option value="NEWEST">Newest</option>
                          <option value="ASC_ORDER">Asc Order</option>
                          <option value="DESC_ORDER">Desc Order</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Product Grid */}
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {isLoading ? (
                    <Col xs="12">
                      <Skeleton />
                    </Col>
                  ) : (
                    filteredProducts
                      .slice(0, displayedProducts)
                      .sort((a, b) => {
                        switch (sortBy) {
                          case "HIGH_TO_LOW":
                            return b.new_price - a.new_price;
                          case "LOW_TO_HIGH":
                            return a.new_price - b.new_price;
                          case "NEWEST":
                            return (
                              new Date(b.created_at).getTime() -
                              new Date(a.created_at).getTime()
                            );
                          case "ASC_ORDER":
                            return a.name.localeCompare(b.name);
                          case "DESC_ORDER":
                            return b.name.localeCompare(a.name);
                          default:
                            return 0;
                        }
                      })
                      .map((product, i) => (
                        <div className={grid} key={i}>
                          <div className="product">
                            <div onClick={handleProduct(product)}>
                              <ProductBox
                                hoverEffect={true}
                                product={product}
                                addCompare={(product) => addToCompare(product)}
                                addWish={(product) => addToWish(product)}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </Row>
                {displayedProducts < filteredProducts.length && (
                  <div className="text-center mt-3">
                    <Button
                      onClick={() =>
                        setDisplayedProducts(displayedProducts + 4)
                      }
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Collection;
