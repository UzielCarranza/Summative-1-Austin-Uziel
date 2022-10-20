import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const Games = (data) => {
    const navigate = useNavigate()
    const [gamesData, setGamesData] = useState(null);
    useEffect(() => {
        if (data.games !== null) {
            setGamesData(data);
        }
    }, [data])
    console.log(gamesData)
    return gamesData ? (

        <div className="body-container">
            <div className="container scroll">
                {gamesData.games.map((item, i) => (
                    <div key={gamesData.games[i].gameId} className="product-wrapper">
                        <img
                            className="product-img"
                            src="//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Replace_this_image_%28building%29.svg/100px-Replace_this_image_%28building%29.svg.png"
                            alt="placeholder"/>

                        <div className="product-properties">
                            <h1>Price: {gamesData.games[i].price}</h1>
                            <h1>Quantity: {gamesData.games[i].quantity}</h1>
                            <h1>Size: {gamesData.games[i].size}</h1>
                            <h1>Color: {gamesData.games[i].color}</h1>
                            <h1>Description: {gamesData.games[i].description}</h1>
                        </div>
                    </div>
                ))}
            </div>

            <div className="wrapper-buttons">

                <button
                    onClick={() => navigate("/tshirts")}
                >
                    T-Shirts
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

    ) : <h1>Loading</h1>
}