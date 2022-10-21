import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../utils/Modal";

export const GameConsoles = (data) => {
    const navigate = useNavigate()
    const [consolesData, setConsolesData] = useState(null);
    useEffect(() => {
        if (data.consoles !== null) {
            setConsolesData(data);
        }
    }, [data])
    return consolesData ? (

        <div className="body-container">
            <div className="container scroll">
                {consolesData.consoles.map((item, i) => (
                    <div key={consolesData.consoles[i].consoleId} className="product-wrapper">
                        <img
                            className="product-img"
                            src="//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Replace_this_image_%28building%29.svg/100px-Replace_this_image_%28building%29.svg.png"
                            alt="placeholder"/>
                        <div className="product-properties">
                            <h1>Price: {consolesData.consoles[i].price}</h1>
                            <h1>Quantity: {consolesData.consoles[i].quantity}</h1>
                            <h1>manufacturer: {consolesData.consoles[i].manufacturer}</h1>
                            <h1>memoryAmount: {consolesData.consoles[i].memoryAmount}</h1>
                            <h1>model: {consolesData.consoles[i].model}</h1>
                            <h1>processor: {consolesData.consoles[i].processor}</h1>
                        </div>
                        <Modal obj={{
                            id: consolesData.consoles[i].consoleId,
                            price: consolesData.consoles[i].price,
                            quantity: consolesData.consoles[i].quantity,
                            manufacturer: consolesData.consoles[i].manufacturer,
                            memoryAmount: consolesData.consoles[i].memoryAmount,
                            model: consolesData.consoles[i].model,
                            processor: consolesData.consoles[i].processor
                        }}>
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
                    onClick={() => navigate("/tshirts")}
                >
                    T-Shirts
                </button>
            </div>
        </div>
    ) : <p>loading</p>
}