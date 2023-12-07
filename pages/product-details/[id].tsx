import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Layout1 from "../../views/layouts/layout1";
import LeftSidebarPage from "../../views/Products-Detail/leftSidebarPage";
import { useSelector } from "react-redux";
import { ProductState } from "store/product/reducers";

const LeftSidebar: NextPage = () => {  
  // Use the ProductState type here
  const product = useSelector((state: ProductState) => state.product.product);

  console.log("product  fsfsdfsa", product);

  return (
    <Layout1>
      <section className="section-big-pt-space bg-light">
        <LeftSidebarPage product={product} />
      </section>
    </Layout1>
  );
};

export default LeftSidebar;