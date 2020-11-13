import React, { useState } from 'react'
import ProductDetails from './ProductDetails';

export default function Product({ product, addToCart, removeFromCart }) {

    const [showDetails, setShowDetails] = useState(false);

    const [quantity, setQuantity] = useState(0);

    const addProduct = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        addToCart(product);
    }

    const removeProduct = () => {
        setQuantity((prevQuantity) => {
            return prevQuantity - 1 < 0 ? 0 : prevQuantity - 1;
        });
        removeFromCart(product);
    }

    const handleDetails = () => setShowDetails(prev => !prev);


    const style = {
        quantity: {
            margin: "0 5px",
        },
        price: {
            color: product.has_discount ? 'red' : 'black',
            textDecoration: product.has_discount && 'line-through'
        }
    }

    return (
        <div>
            {showDetails &&
                <ProductDetails
                    data={product}
                    handleDetails={handleDetails}
                />
            }
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" alt="product" src={product.featured_image}></img>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                            <h6>{product.name}</h6>
                        </div>
                        <div className="col-12">
                            <span style={style.price}>${product.unit_price}</span>
                            {product.has_discount && <span>  ${product.unit_price - product.discount}</span>}
                            <div className="row">
                                <div className="col-5 pt-2">
                                    <button
                                        onClick={handleDetails}
                                        className="badge badge-primary"
                                    >View Details</button>
                                </div>
                                <div className="col-6">
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={addProduct}
                                        >+</button>
                                        <span className="pt-2" style={style.quantity}>{quantity}</span>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={removeProduct}
                                        >-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div >
    )
}
