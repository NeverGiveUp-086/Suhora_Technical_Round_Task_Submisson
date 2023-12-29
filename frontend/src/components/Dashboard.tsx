// src/components/Dashboard.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { creatNewProduct, deleteProduct, getAllProduct } from '../redux/api/productApi';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// import { setData, DataItem } from '../features/dashboard/dashboardSlice'; // Import DataItem

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stocks: number;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const productList = useSelector((state:RootState) => state.product.products);
  const [newProductDetails, setNewProductDetails] = React.useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    stocks: 0,
  });
  const [allProducts, setAllProducts] = React.useState<Product[]>([]); // Add this line
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    // setTimeout(() => {
    (async () => {
      const res = await dispatch(getAllProduct());
      if(res.payload){
        console.log(res.payload);
        setAllProducts(res.payload.productList);
      }
      console.log("log", res.payload);
      console.log(productList);
    }
    )();
  // }, 3000);
  }
  , [ dispatch ]);

  const addNewProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = dispatch(creatNewProduct(newProductDetails));
    // if(res){
      //reload the page
      window.location.reload();
    // }
    console.log(newProductDetails);
  }

  const deleteProductData = (id: string) => {
    dispatch(deleteProduct(id));
    //reload the page
    window.location.reload();
  }

  const applySearch = (e:any) => {
    setSearch(e.target.value);
    let filtered = productList;
    if(e.target.value === ''){}
    else{
      filtered = productList.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    setAllProducts(filtered);
    console.log(filtered);
  }



  return (
    <div>
      <Navbar />
      <h2>Dashboard</h2>
      <div className="searchbar">
        <input type="text" onChange={(e) => applySearch(e)} placeholder="Search Product" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.length > 0 ? allProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stocks}</td>
              <td>
                <div className='deleteButton' onClick={() => deleteProductData(product.id)}> X </div>
              </td>
              <td>
                <div className="update">
                <Link to={`/update/${product.id}`}> Edit </Link>
                </div>
              </td>
            </tr>
          )) : <tr><td colSpan={6}>No Products</td></tr>}
        </tbody>
      </table>

      <div className="addProduct">
        <h2>Add Product</h2>
        <form onSubmit={addNewProduct}>
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, name: e.target.value})
          } type="text" placeholder="Product Name" />
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, description: e.target.value})
          } type="text" placeholder="Description" />
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, category: e.target.value})
          } type="text" placeholder="Category" />
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, price: parseInt(e.target.value)})
          } type="number" placeholder="Price" />
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, stocks: parseInt(e.target.value)})
          } type="number" placeholder="Quantity" />
          <button>Add Product</button>
        </form>
      </div>

      <style>
        {`
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          tr:hover {background-color:#f5f5f5;}
          .addProduct {
            margin-top: 20px;
          }
          .addProduct{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .addProduct h2 {
            margin-bottom: 10px;
          }

          .addProduct form {
            display: flex;
            flex-direction: column;
          }
          .addProduct input {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 200px;
          }
          .addProduct button {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 200px;
          }
          .deleteButton {
            cursor: pointer;
            color: red;
            font-weight: bold;
          }
          .update {
            cursor: pointer;
            color: blue;
            font-weight: bold;
          }



        `}
      </style>
    </div>
  );
};

export default Dashboard;
