import React, { useState } from 'react'

export default function Carousel(props) {

    const [image, setImage] = useState(0);

    const handelNext = () => {
        setImage((prevImage) => prevImage + 1 > props.images.length - 1 > 0
            ? 0 : prevImage + 1);
    }

    const handlePrev = () => {
        setImage((prevImage) => prevImage - 1 < 0
            ? props.images.length - 1 : prevImage - 1);
    }

    return (
        <div class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src={props.images[image]} class="d-block w-100" alt="product" />
                </div>
            </div>
            <a
                className="carousel-control-prev"
                onClick={handlePrev}
                href
            >
                <span className="carousel-control-prev-icon bg-dark"></span>
            </a>
            <a
                className="carousel-control-next"
                onClick={handelNext}
                href
            >
                <span className="carousel-control-next-icon bg-dark"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}
