import React from 'react'
import Carousel from './Carousel';

export default function ProductDetails({ data, handleDetails }) {


    return (
        <div>
            <div className="row">
                <div className="col-3 mt-3 mb-2">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleDetails()}
                    >X</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <h3>{data.name}</h3>
                </div>
                <div className="col-12">
                    <Carousel images={data.images} />
                </div>
                <div className="col-12 mt-2">
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    )

}
