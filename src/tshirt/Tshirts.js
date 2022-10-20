import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const Tshirts = (data) => {
    const navigate = useNavigate()
    const [tShirtsData, setTShirtsData] = useState(null);
    useEffect(() => {
        if (data.tshirts !== null) {
            setTShirtsData(data);
        }
    }, [data])
    return tShirtsData ? (
        <div>
            <div className="container scroll">
                {tShirtsData.tshirts.map((item, i) => (
                    <div key={tShirtsData.tshirts[i].tshirtId} className="product-wrapper">
                        <h1>Price: {tShirtsData.tshirts[i].price}</h1>
                        <h1>Quantity: {tShirtsData.tshirts[i].quantity}</h1>
                        <h1>Size: {tShirtsData.tshirts[i].size}</h1>
                        <h1>Color: {tShirtsData.tshirts[i].color}</h1>
                        <h1>Description: {tShirtsData.tshirts[i].description}</h1>
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