import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../utils/Modal";
import ModalPostRequest from "../utils/ModalPostRequest";
import axios from "axios";

export const Games = (data) => {
    const navigate = useNavigate()
    const [gamesData, setGamesData] = useState(null);
    const [gamesDataBackUp, setGamesDataBackUp] = useState(null)
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByStudio, setSearchByStudio] = useState(null);
    const [searchByEsrb, setSearchByEsrb] = useState(null);

    useEffect(() => {
        if (data.games !== null) {
            setGamesData(data);
            setGamesDataBackUp(data)
        }
    }, [data])

    const searchBySpecificCategory = () => {
        let url = 'http://localhost:8080/game/';
        if (searchByTitle !== null && searchByStudio === null) {
            url = `${url}/title/${searchByTitle}`
            const response = axios.get(url)
                .then(response => {
                    if (response.status === 200 && response.data) {
                        const searchByTitleResults = {games: [response.data]};
                        setGamesData(searchByTitleResults)
                    } else {
                        alert("No results found")
                    }
                })
        }
        if (searchByTitle === null && searchByStudio !== null) {
            url = `${url}/studio/${searchByStudio}`
            const response = axios.get(url)
                .then(response => {
                    if (response.status === 200 && response.data) {
                        const searchByStudioResults = {games: response.data};
                        setGamesData(searchByStudioResults)
                    } else {
                        alert("No results found")
                    }
                })
        }

        if (searchByTitle === null && searchByStudio === null && searchByEsrb !== null) {
            url = `${url}/esrb/${searchByEsrb}`
            const response = axios.get(url)
                .then(response => {
                    if (response.status === 200 && response.data.length > 0) {
                        const searchByEsrbResults = {games: response.data};
                        setGamesData(searchByEsrbResults)
                    } else {
                        alert("No results found")
                    }
                })
        }

    }
    const resetSearch = () => {

        document.getElementById("search-by-studio").value = null;
        document.getElementById("search-by-title").value = null;
        document.getElementById("search-by-esrb").value = null;
        setSearchByEsrb(null)
        setSearchByTitle(null)
        setSearchByStudio(null)
        setGamesData(gamesDataBackUp)
    }

    return gamesData ? (

        <div className="body-container">
            <div className="container scroll">
                <input id="search-by-title" type="text" onChange={(e) => setSearchByTitle(e.target.value)}
                       placeholder="search by title"/>

                <input id="search-by-studio" type="text" onChange={(e) => setSearchByStudio(e.target.value)}
                       placeholder="search by studio"/>

                <input id="search-by-esrb" type="text" onChange={(e) => setSearchByEsrb(e.target.value)}
                       placeholder="search by esrb Rating"/>

                <button onClick={searchBySpecificCategory}>search</button>
                <button onClick={resetSearch}>reset</button>

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

                <ModalPostRequest showTShirtPostRequestForm={false} showGamesPostRequestForm={true}
                                  showGameConsolesPostRequestForm={false}/>
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