import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, updateProduct } from '../redux/api/productApi';
import { useAppDispatch } from '../app/store';

const UpdateProduct = () => {

  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const router = useNavigate();

  const [newProductDetails, setNewProductDetails] = React.useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    stocks: 0,
    id: id
  });

  useEffect(() => {
    (async () => {
      const res = await dispatch(getProductById(id!));
      if(res.payload){
        console.log(res.payload.product);
        setNewProductDetails(res.payload.product);
      }
      // console.log(productList);
    }
    )();
  }
  , [ dispatch, setNewProductDetails ]);

  const updateProductData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = dispatch(updateProduct({ id: id!, updated: newProductDetails }));
    // if(res){
      //reload the page
      // window.location.reload();
      router('/dashboard');

    console.log(res);
  }

  return (
    <div className="addProduct">
        <h2>Update Product</h2>
        <form onSubmit={updateProductData}>
          <label htmlFor="name">Product Name</label>
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, name: e.target.value})
          } type="text" value={newProductDetails.name} placeholder="Product Name" />
          <label htmlFor="description">Description</label>
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, description: e.target.value})
          } type="text" value={newProductDetails.description} placeholder="Description" />
          <label htmlFor="category">Category</label>
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, category: e.target.value})
          } type="text" value={newProductDetails.category} placeholder="Category" />
          <label htmlFor="price">Price</label>
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, price: parseInt(e.target.value)})
          } type="number" value={newProductDetails.price} placeholder="Price" />
          <label htmlFor="stocks">Quantity</label>
          <input onChange={
            (e) => setNewProductDetails({...newProductDetails, stocks: parseInt(e.target.value)})
          } type="number" value={newProductDetails.stocks} placeholder="Quantity" />
          <button>Update</button>
        </form>

        <style>{`
          .addProduct {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
  
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
  
          input {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 200px;
          }
  
          button {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #fff;
            cursor: pointer;
          }
  
          a {
            margin-top: 10px;
          }

          label {
            margin-top: 10px;
            margin-left: 10px;
            width: 100%;
          }

        `}</style>
      </div>
  )
}

export default UpdateProduct