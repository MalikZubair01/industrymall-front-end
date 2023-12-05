import React, { useEffect, useState } from "react";
import { Col, Button, Row } from "reactstrap";
import ProductBox from "../Product-Box/productbox";
import { CartContext } from "helpers/cart/cart.context";
import { WishlistContext } from "helpers/wishlist/wish.context";
import { CompareContext } from "helpers/compare/compare.context";
import axios from "axios";

const PRODUCTS_PER_PAGE = 12; 

const AllProducts = () => {
  const [productsData, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = React.useContext(CartContext);
  const { addToWish } = React.useContext(WishlistContext);
  const { addToCompare } = React.useContext(CompareContext);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/h_product`)
      .then((res) => {
        setProducts(res.data.HotProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // You might want to handle the error state appropriately
      });
  }, []);

  const startIndex = 0;
  const endIndex = currentPage * PRODUCTS_PER_PAGE;
  const productsToDisplay = productsData.slice(startIndex, endIndex);

  const loadMoreProducts = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <section className="section-big-py-space bg-light custom-container">
      <div className="allproduct-text text-center mx-auto mb-5 ">
        <p style={{ color: "white", fontSize: "30px", fontWeight: "100" }}>
          Trending Products
        </p>
      </div>
      <div className="">
        {loading ? (
          <div className="d-flex justify-content-center">
            <button className="btn btn-dark" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          </div>
        ) : (
          <>
            <Row>
              {" "}
              {/* Use Bootstrap's Row */}
              {productsToDisplay.map((product, i) => (
                <Col xl="2" md="4" sm="6" xs="12" key={i}>
                  {" "}
                  {/* Use different column sizes based on screen size */}
                  <div
                    className="product"
                    style={{
                      height: "250px",
                      width: "257px",
                      marginBottom: "160px",
                    }}
                  >
                    <ProductBox
                      hoverEffect={true}
                      product={product}
                      addCompare={(product) => addToCompare(product)}
                      addWish={(product) => addToWish(product)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <Button
                className="btn btn-normal"
                type="button"
                onClick={loadMoreProducts}
              >
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
