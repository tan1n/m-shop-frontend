import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useForm from "../hooks/useForm";
import OrderForm from "./OrderForm";
import Product from "./Product";
import NotFound from './NotFound';

export default function Shop() {

    const { pageId } = useParams();

    const appId = process.env.REACT_APP_FB_APP_ID;

    const [shop, setShop] = useState({ id: '', name: '', description: '', products: [] });

    const [cart, setCart] = useState([]);

    const [isComplete, setIscomplete] = useState(false);

    const [error, setError] = useState(false);

    const [orderForm, setOrderFrom] = useState(false);

    const [user, setUser, setUserState] = useForm({ name: '', phone: '', district: '', address: '', psId: '', profile_pic: '' });

    const [payment, setPayment] = useState({ transaction_id: '', payment_type: '', payment_no: '' })

    const shopUrl = process.env.REACT_APP_API_URL + `page/${pageId}/products`;

    const [isLoading, setIsLoading] = useState({ status: false, msg: '' });

    //Get shop data
    useEffect(() => {
        fetch(shopUrl)
            .then((res) => {
                if (res.status >= 200 && res.status <= 400) return res.json();
                else throw new Error("Invalid shop");
            })
            .then(({ data }) => {
                setShop(data);
            })
            .catch((err) => setError((error) => true));
    }, [pageId, shopUrl]);

    //Set `isComplete` button to disabled depending on cart changes
    useEffect(() => {
        setIscomplete(() => cart.length === 0 ? true : false)
    }, [cart]);

    //Get customer profile from facebook through our api and set the state
    useEffect(() => {
        let customerUrl = '';
        //Messenger extension is loaded 
        window.extAsyncInit = () => {
            window.MessengerExtensions.getContext(appId, (context) => {
                customerUrl = process.env.REACT_APP_API_URL + `page/${pageId}/customer/${context.psid}`
            }, (err) => { console.log(err); customerUrl = process.env.REACT_APP_API_URL + `page/${pageId}/customer/${err}` })

            //Get profile
            fetch(customerUrl)
                .then(res => res.json())
                .then(({ data }) => {
                    //Set state of customer profile
                    setUserState((prev) => {
                        return {
                            ...prev,
                            name: data.name,
                            psId: data.id,
                            profile_pic: data.profile_pic
                        }
                    })
                })
                .catch(err => console.log(err))
        }
    })

    //Options for product component
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

    //Total amount of price of the cart
    const total = () => {
        return cart.reduce((current, item) => {
            let price = item.has_discount ? item.unit_price - item.discount : item.unit_price;
            return price + current;
        }, 0);
    };

    //Style for shop component
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

    //Show orderForm component from `complete order` button
    const handleComplete = () => setOrderFrom(prev => !prev);

    //Submit order 
    const submitOrder = () => {
        setIsLoading((prev) => ({ ...prev, status: true }))
        //Count proucts from cart
        let countProducts = (cart) => {
            let newCart = []
            cart.forEach((value) => {
                let index = newCart.findIndex(item => item.productId === value.id)
                index < 0 ? newCart.push({ productId: value.id, quantity: 1 }) : newCart[index].quantity++;
            })
            return newCart;
        }

        //Data to submit at api
        let data = {
            customer: { ...user },
            purchases: countProducts(cart),
            paymentInfo: { ...payment },
            pageId: pageId
        }

        //Api url
        let orderUrl = process.env.REACT_APP_API_URL + 'order';

        //Fetch options
        let fetchOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        //Request using fetch 
        fetch(orderUrl, fetchOptions)
            .then(response => response.json())
            .then(({ data }) => {
                //If order is successfully posted
                console.log(data)
                if (data) {
                    setIsLoading({ status: false, msg: 'Order Place successfully' })
                    setInterval(() => {
                        window.MessengerExtensions.requestCloseBrowser(function success() {
                            // webview closed
                        }, function error(err) {
                            // an error occurred
                        });
                    }, 4000);
                } else {
                    setIsLoading({ status: false, msg: 'Order was unsuccessfull.' })
                }
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
            </Helmet>
            {error && <NotFound />}
            {orderForm &&
                <OrderForm
                    close={handleComplete}
                    total={total}
                    setUser={setUser}
                    setPayment={setPayment}
                    user={user}
                    submitOrder={submitOrder}
                    isLoading={isLoading}
                />
            }
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
                            Continue ({total()}৳ )
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
