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
        <div>

            <div className="container">
                {gamesData.games.map((item, i) => (
                    <div key={gamesData.games[i].gameId} className="product-wrapper">
                        <h1>Price: {gamesData.games[i].price}</h1>
                        <h1>Quantity: {gamesData.games[i].quantity}</h1>
                        <h1>Size: {gamesData.games[i].size}</h1>
                        <h1>Color: {gamesData.games[i].color}</h1>
                        <h1>Description: {gamesData.games[i].description}</h1>
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