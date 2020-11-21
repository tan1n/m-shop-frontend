import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { data } from '../districts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrderForm({ close, user, setUser, submitOrder, total, setPayment, isLoading }) {

    const [openPaymentNo, setOpenPaymentNo] = useState(false)

    useEffect(() => {
        if (isLoading.status) toast(isLoading.msg);
    }, [isLoading])

    const setPaymentType = (e) => {
        let value = e.target.value
        if (value > 1) setOpenPaymentNo(true)
        else setOpenPaymentNo(false)
        setPayment((prev) => {
            return {
                ...prev,
                payment_type: value
            }
        })
    }

    const setPaymentNo = (e) => {
        let value = e.target.value
        setPayment((prev) => {
            return {
                ...prev,
                payment_no: value
            }
        })
    }

    const setTransactionId = (e) => {
        let value = e.target.value
        setPayment((prev) => {
            return {
                ...prev,
                transaction_id: value
            }
        })
    }


    return (
        <div className="container">
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
            />
            <div className="row mt-3">
                <div className="col-3">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={close}
                    >Back</button>
                </div>
                <div className="col-9 text-justify">
                    <h3>Shipping Information</h3>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12 form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={setUser}
                        value={user.name}
                    />
                </div>
                <div className="col-12 form-group">
                    <input
                        className="form-control"
                        type="text"
                        name="phone"
                        placeholder="Contact Number"
                        onChange={setUser}
                        value={user.phone}
                    />
                </div>
                <div className="col-12 form-group">
                    <Select
                        name="district"
                        options={data}
                        onChange={setUser}
                    />
                </div>
                <div className="col-12 form-group">
                    <textarea
                        className="form-control"
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={setUser}
                        value={user.address}
                    />
                </div>
                <div className="col-12">
                    <span>Payment Method</span>
                    <hr></hr>
                    <div className="form-group">
                        <input
                            type="radio"
                            name="payment_type"
                            value="1"
                            onChange={setPaymentType}
                        />  Cash On Delivery
                    </div>
                    <div className="form-group">
                        <input
                            type="radio"
                            name="payment_type"
                            value="2"
                            onChange={setPaymentType}
                        />  Bkash
                    </div>
                    <div className="form-group">
                        <input
                            type="radio"
                            name="payment_type"
                            value="3"
                            onChange={setPaymentType}
                        />  Nagad
                    </div>
                </div>
                {openPaymentNo && (
                    <div className="col-12">
                        <div className="col-12 form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="payment_no"
                                placeholder="Payment No"
                                onChange={setPaymentNo}

                            />
                        </div>
                        <div className="col-12 form-group">
                            <input
                                className="form-control"
                                type="text"
                                name="payment_no"
                                placeholder="Transaction ID"
                                onChange={setTransactionId}
                            />
                        </div>
                    </div>
                )}
            </div>
            <button
                className="btn btn-primary btn-block"
                onClick={submitOrder}
                type="submit"
                disabled={isLoading.status}
            >Complete Order ({total()}৳)</button>
        </div>
    )
}
