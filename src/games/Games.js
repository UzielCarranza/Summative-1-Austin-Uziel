import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../utils/Modal";
import ModalPostRequest from "../utils/ModalPostRequest";

export const Games = (data) => {
    console.log(data)
    const navigate = useNavigate()
    const [gamesData, setGamesData] = useState(null);
    useEffect(() => {
        if (data.games !== null) {
            setGamesData(data);
        }
    }, [data])
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

                            <h1> Title: ${gamesData.games[i].title}</h1>
                            <h1>Price: {gamesData.games[i].price}</h1>
                            <h1>Esrb Rating: {gamesData.games[i].esrbRating}</h1>
                            <h1>Description: {gamesData.games[i].description}</h1>
                            <h1> Studio: {gamesData.games[i].studio}</h1>
                            <h1>Quantity: {gamesData.games[i].quantity}</h1>
                        </div>
                        <Modal obj={null} game={{
                            id: gamesData.games[i].gameId,
                            price: gamesData.games[i].price,
                            quantity: gamesData.games[i].quantity,
                            esrbRating: gamesData.games[i].esrbRating,
                            description: gamesData.games[i].description,
                            studio: gamesData.games[i].studio,
                            title: gamesData.games[i].title,
                        }} tShirt={null}>
                        </Modal>
                    </div>
                ))}
            </div>

            <div className="wrapper-buttons">

                <ModalPostRequest showTShirtPostRequestForm={false} showGamesPostRequestForm={true} showGameConsolesPostRequestForm={false}/>
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