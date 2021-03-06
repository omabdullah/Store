import React, { Component } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import DeleteButton from "../../../Components/DeleteButton/DeleteButton";
import AddProduct from "./AddProduct";
import DeleteProductMutation from "../mutations/DeleteProductMutation";
import styles from "../PortalPage.css";

const ProductPage = props => {
  // console.log("[ProductPage] props: ", props);
  const { viewer } = props;
  const deleteProduct = product => {
    const { product_id } = product;
    const form = {
      product_id
    };
    DeleteProductMutation.commit(form);
    window.location.replace( '/portal/products' );
  };
  const renderProducts = () => {
    const { product_list } = props.product_list;
    let thisCategory = '';
    let newCategory = true;
    return product_list
      ? product_list.edges.map((product, i) => {
          product = product.node;
          const { category } = product;
          const { name: category_name } = category;
          if ( thisCategory == category_name ) {
            newCategory = false;
          }
          else {
            newCategory = true;
          }
          thisCategory = category_name;
          // <Product> component is created below
          return (
            <Product
              key={i}
              product={product}
              newCategory={ newCategory }
              deleteProduct={deleteProduct}
              viewer={ viewer }
            />
          );
        })
      : [];
  };
  // console.log( 'ProductListPage props:', props );
  return (
    <div className={styles.ProductPage}>
      { viewer && viewer.role === 'manager' &&
        <nav>
          <li>
            <Link to={"/portal/products/add-product"}>Add Product</Link>
          </li>
        </nav>
      }
      <Switch>
        <Route
          exact
          path="/portal/products/add-product"
          render={() => {
            return viewer && viewer.role == 'manager' ? <AddProduct {...props} category_list={props} /> : <Redirect to={ '/' } />;
          }}
        />
      </Switch>
      <div className={ styles.Table }>
        <div className={ styles.Header }>
          <div className={ styles.Category }>Category</div>
          <div className={ styles.Name }>Name</div>
          <div className={ styles.Price }>Price ($)</div>
          <div className={ styles.Quantity }>Quantity</div>
          <div className={ styles.Threshold }>Threshold</div>
          <div className={ styles.Restock }>Need restock?</div>
        </div>
        <div className={ styles.Body }>
          {renderProducts()}
        </div>
      </div>
    </div>
  );
};

const Product = ({ viewer, product, newCategory, deleteProduct }) => {
  // console.log( 'product:', product );
  const { category, name: product_name, description, price, quantity, threshold, restock_status } = product;
  const { name: category_name } = category;
  return (
    <div className={styles.Product}>
      <div className={ styles.Category }>{ newCategory ? category_name: '' }</div>
      <div className={styles.Name}>{product_name}</div>
      {/* <div className={styles.Description}>{description}</div> */}
      <div className={styles.Price}>{price}</div>
      <div className={styles.Quantity}>{quantity}</div>
      <div className={styles.Threshold}>{threshold}</div>
      <div className={styles.Restock}>{restock_status ? 'Yes' : 'No' }</div>
      { viewer.role == 'manager' &&
        <DeleteButton onClick={ ( ) => deleteProduct(product) } />
      }
    </div>
  );
};

// Here, we are creating the object that we paste in <QueryRenderer> in App.js. This page
// needs a product list, so we request the first 10 products from the database
// and get the name and price

export default createFragmentContainer(ProductPage, {
  product_list: graphql`
    fragment ProductsPage_product_list on Query
      @argumentDefinitions(first: { type: "Int" }) {
      product_list(first: 100) @connection(key: "ProductsPage_product_list") {
        edges {
          node {
            product_id
            category {
              name
            }
            name
            price
            quantity
            threshold
            restock_status
          }
        }
      }
    }
  `
});
