import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../utils/Modal";

export const Tshirts = (data) => {
    const navigate = useNavigate()
    const [tShirtsData, setTShirtsData] = useState(null);
    useEffect(() => {
        if (data.tshirts !== null) {
            setTShirtsData(data);
        }
    }, [data])
    const handleEditing = (e) => {
        console.log(e.currentTarget.id)
    }
    return tShirtsData ? (
        <div className="body-container">
            <div className="container scroll">
                {tShirtsData.tshirts.map((item, i) => (
                    <div key={tShirtsData.tshirts[i].tshirtId} className="product-wrapper">

                        <img
                            className="product-img"
                            src="//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Replace_this_image_%28building%29.svg/100px-Replace_this_image_%28building%29.svg.png"
                            alt="placeholder"/>
                        <div className="product-properties">
                            <h1>Price: {tShirtsData.tshirts[i].price}</h1>
                            <h1>Quantity: {tShirtsData.tshirts[i].quantity}</h1>
                            <h1>Size: {tShirtsData.tshirts[i].size}</h1>
                            <h1>Color: {tShirtsData.tshirts[i].color}</h1>
                            <h1>Description: {tShirtsData.tshirts[i].description}</h1>
                        </div>
                        <Modal obj={null} tShirt={{
                            id: tShirtsData.tshirts[i].tshirtId,
                            price: tShirtsData.tshirts[i].price,
                            size: tShirtsData.tshirts[i].size,
                            description: tShirtsData.tshirts[i].description,
                            color: tShirtsData.tshirts[i].color,
                            quantity: tShirtsData.tshirts[i].quantity
                        }}

                               game={null}
                        >
                        </Modal>
                    </div>

                ))}
            </div>

            <div className="wrapper-buttons">
                <button
                    onClick={() => navigate("/games")}

                >
                    Games
                </button>
                <button
                    onClick={() => navigate("/")}
                >
                    Home
                </button>
                <button
                    onClick={() => navigate("/consoles")}
                >
                    Game Consoles
                </button>
            </div>
        </div>
    ) : <p>loading</p>
}