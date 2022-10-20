import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const GameConsoles = (data) => {
    const navigate = useNavigate()
    const [consolesData, setConsolesData] = useState(null);
    useEffect(() => {
        if (data.consoles !== null) {
            setConsolesData(data);
        }
    }, [data])
    console.log(consolesData)
    return consolesData ? (
        <div>
            <h1>Game Consoles</h1>

            <div className="container">
                {consolesData.consoles.map((item, i) => (
                    <div key={consolesData.consoles[i].consoleId} className="product-wrapper">
                        <h1>Price: {consolesData.consoles[i].price}</h1>
                        <h1>Quantity: {consolesData.consoles[i].quantity}</h1>
                        <h1>Size: {consolesData.consoles[i].size}</h1>
                        <h1>Color: {consolesData.consoles[i].color}</h1>
                        <h1>Description: {consolesData.consoles[i].description}</h1>
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
                    onClick={() => navigate("/tshirts")}
                >
                    T-Shirts
                </button>
            </div>
        </div>
    ) : <p>loading</p>
}