import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useForm from "../hooks/useForm";
import OrderForm from "./OrderForm";
import Product from "./Product";
import NotFound from './NotFound';

export default function Shop() {

    const { id } = useParams();

    const [shop, setShop] = useState({ id: '', name: '', description: '', products: [] });

    const [cart, setCart] = useState([]);

    const [isComplete, setIscomplete] = useState(false);

    const [error, setError] = useState(false);

    const [orderForm, setOrderFrom] = useState(false);

    const [user, setUser] = useForm({ name: '', phone: '', address: '' });

    let shopUrl = process.env.REACT_APP_API_URL + `shop/${id}/products`;

    useEffect(() => {
        fetch(shopUrl)
            .then((res) => {
                if (res.status >= 200 && res.status <= 400) return res.json();
                else throw new Error("Invalid shop");
            })
            .then(({ data }) => {
                setShop(data);
            })
            .catch((err) => setError((error) => !error));
    }, [id, shopUrl]);


    useEffect(() => {
        setIscomplete(() => cart.length === 0 ? true : false)
    }, [cart]);

    const cartOptions = {
        addToCart: (data) => {
            setCart((prevCart) => [...prevCart, data]);
        },
        removeFromCart: (data) => {
            setCart((prevCart) => {
                let ignore = prevCart.findIndex((item) => item.name === data.name);
                return prevCart.filter((item, index) => index !== ignore);
            });
        }
    }

    const total = () => {
        return cart.reduce((current, item) => {
            let price = item.has_discount ? item.unit_price - item.discount : item.unit_price;
            return price + current;
        }, 0);
    };

    const styles = {
        line: {
            borderBottom: '1px solid black',
            margin: "10px 0"
        },
        shop: {
            height: '100vh',
            display: orderForm || error ? 'none' : 'inherit'
        }
    }

    const handleComplete = () => setOrderFrom(prev => !prev);

    const submitOrder = () => {

        let countProducts = (cart) => {
            let newCart = []
            cart.forEach((value) => {
                let index = newCart.findIndex(item => item.productId === value.id)
                index < 0 ? newCart.push({ productId: value.id, quantity: 1 }) : newCart[index].quantity++;
            })
            return newCart;
        }

        let data = {
            customer: { ...user },
            purchases: countProducts(cart),
            paymentInfo: { transactionId: '', paymentType: 1 },
            shopId: shop.id
        }
        //post data
        let orderUrl = process.env.REACT_APP_API_URL + 'order';

        let fetchOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        console.log(data)

        fetch(orderUrl, fetchOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{shop.name}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {error && <NotFound />}
            {orderForm && <OrderForm close={handleComplete} setUser={setUser} user={user} submitOrder={submitOrder} />}
            <div className="container" style={styles.shop}>
                <div className="row">
                    <div className="col-12 mt-2 text-center">
                        <h3>{shop.name}</h3>
                        <p>{shop.description}</p>
                    </div>
                    <div className="col-6 text-left">
                        <span>{cart.length} items</span>
                    </div>
                    <div className="col-6 text-right">
                        <span>Total: {total()}</span>
                    </div>
                </div>
                <div style={styles.line}></div>
                {shop.products.map((product, index) => {
                    return (
                        <Product
                            product={product}
                            key={index + 1}
                            {...cartOptions}
                        />
                    )
                })}
                <div className="fixed-bottom">
                    <div className="col-12">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={handleComplete}
                            disabled={isComplete}
                        >
                            Complete Order (${total()} )
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
