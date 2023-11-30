import React, { useEffect, useState } from "react";
import { Col, Button, Row } from "reactstrap";
import ProductBox from "../Product-Box/productbox";
import { CartContext } from "helpers/cart/cart.context";
import { WishlistContext } from "helpers/wishlist/wish.context";
import { CompareContext } from "helpers/compare/compare.context";
import { useApiData } from "helpers/data/DataContext";

const PRODUCTS_PER_PAGE = 12; // Number of products to show per page

interface ApiData {
  menus: {
    [menuName: string]: {
      categories: {
        id: number;
        name: string;
        sub_categories: {
          id: number;
          name: string;
          products: any[]; // Define the type for products
        }[];
      }[];
    };
  };
  // Add other properties if needed
}

const AllProducts = () => {
  const [productsData, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Track loading state
  const { addToCart } = React.useContext(CartContext);
  const { addToWish } = React.useContext(WishlistContext);
  const { addToCompare } = React.useContext(CompareContext);

  const apiData = useApiData() as ApiData;

  useEffect(() => {
    const allProducts = [];

    if (apiData && apiData.menus) {
      // Check if apiData and apiData.menus exist
      // Loop through each menu
      for (const menuName in apiData.menus) {
        // Loop through each category in the current menu
        for (const category of apiData.menus[menuName].categories) {
          // Loop through each sub_category in the current category
          for (const subCategory of category.sub_categories) {
            // Loop through each product in the current sub_category and add it to allProducts
            for (const product of subCategory.products) {
              allProducts.push(product);
            }
          }
        }
      }
    }

    // Set the productsData state with all fetched products
    setProducts(allProducts);
    setLoading(false); // Set loading to false once data is fetched
  }, [apiData]);

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
          Trending Products 🔥
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
