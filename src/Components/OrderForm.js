import React from 'react'

export default function OrderForm({ close, user, setUser, submitOrder }) {

    return (
        <div className="container">
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
                        placeholder="Your name"
                        name="name"
                        value={user.name}
                        onChange={setUser}
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
                        />  Cash On Delivery
                        </div>
                </div>
            </div>
            <button
                className="btn btn-primary btn-block"
                onClick={submitOrder}
                type="submit"
            >Submit</button>
        </div>
    )
}
