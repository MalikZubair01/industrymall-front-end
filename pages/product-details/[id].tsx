import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout1 from "../../views/layouts/layout1";
import LeftSidebarPage from "../../views/Products-Detail/leftSidebarPage";
import { useSelector } from "react-redux";
import { ProductState } from "store/product/reducers";

const LeftSidebar: NextPage = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const [pro, setProduct] = useState(null);
  
  // Use the ProductState type here
  const product = useSelector((state: ProductState) => state.products);

  useEffect(() => {
    if (id) {
      setProduct(product);
    }
  }, [id, product]);

  console.log("pro", pro);

  return (
    <Layout1>
      <section className="section-big-pt-space bg-light">
        <LeftSidebarPage product={pro} />
      </section>
    </Layout1>
  );
};

export default LeftSidebar;