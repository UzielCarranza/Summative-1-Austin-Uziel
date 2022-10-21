import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../utils/Modal";
import ModalPostRequest from "../utils/ModalPostRequest";
import axios from "axios";

export const Tshirts = (data) => {
    const navigate = useNavigate()
    const [tShirtsData, setTShirtsData] = useState(null);
    const [tShirtsDataBackUp, setTShirtsDataBackUp] = useState(null);
    const [searchBySize, setSearchBySize] = useState(null);
    // const [deleteTShirt, setDeleteTShirt] = useState(null);

    useEffect(() => {
        if (data.tshirts !== null) {
            setTShirtsData(data);
            setTShirtsDataBackUp(data)
        }
    }, [data])

    const searchByCategory = () => {
        const response = axios.get(`http://localhost:8080/tshirt/size/${searchBySize}`)
            .then(response => {
                if (response.data.length === 0) {
                    alert("No results found")
                }
                const searchByTShirtSizeResults = {tshirts: response.data};
                setTShirtsData(searchByTShirtSizeResults)
            })
    }
    const resetSearch = () => {
        document.getElementById("search-by-size").value = null;
        setSearchBySize(null)
        setTShirtsData(tShirtsDataBackUp)
    }

    // const deleteById = () => {
    //
    //     axios.delete(`http://localhost:8080/tshirt/${deleteTShirt}`).then(r => console.log(r))
    //     setDeleteTShirt(null)
    // }

    return tShirtsData ? (
        <div className="body-container">
            <div className="container scroll">
                <input id="search-by-size" type="text" onChange={(e) => setSearchBySize(e.target.value)}
                       placeholder="search by size"/>
                <button onClick={searchByCategory}>search</button>
                <button onClick={resetSearch}>reset</button>
                {tShirtsData.tshirts.map((item, i) => (
                    <div key={tShirtsData.tshirts[i].tshirtId} className="product-wrapper">
                        <img
                            className="product-img"
                            src="//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Replace_this_image_%28building%29.svg/100px-Replace_this_image_%28building%29.svg.png"
                            alt="placeholder"/>
                        <div className="product-properties">
                            <h1>Price: ${tShirtsData.tshirts[i].price}</h1>
                            <h1>Quantity: {tShirtsData.tshirts[i].quantity}</h1>
                            <h1>Size: {tShirtsData.tshirts[i].size}</h1>
                            <h1>Color: {tShirtsData.tshirts[i].color}</h1>
                            <h1>Description: {tShirtsData.tshirts[i].description}</h1>
                        </div>
                        {/*<button onClick={() => setDeleteTShirt(tShirtsData.tshirts[i].tshirtId)}>delete</button>*/}
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
                <ModalPostRequest showTShirtPostRequestForm={true} showGamesPostRequestForm={false}
                                  showGameConsolesPostRequestForm={false}/>
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