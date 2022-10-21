import styled from 'styled-components';
import {useEffect, useState} from "react";
import {AiFillEdit} from "react-icons/ai";
import axios from "axios";

const ModalBackground = styled.div`
position: fixed;
z-index: 4;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgb(0,0,0,0.5);
`;

const ModalBody = styled.div`
background-color: rgba(220,220,220);
margin: 10% auto;
padding: 20px;
width: 90%;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
`;


function Modal(obj) {
    const [shouldShow, setShouldShow] = useState(false);
    const [consolesData, setconsolesData] = useState(null);

    const [state, setState] = useState({
        price: null,
        quantity: null,
        consoleId: null,
        memoryAmount: null,
        processor: null,
        model: null,
        manufacturer: null
    })

    //checks what type of data the modal receives
    useEffect(() => {
        if (obj.obj !== null) {
            setconsolesData(obj)
        }
    }, [obj])
    const editingConsoleModal = () => {
        return (
            <form className="product-properties">
                <p>{consolesData.obj.id}</p>
                <p>Price: {consolesData.obj.price}</p>
                <input name="price" inputMode="numeric" id="price" type="number" onChange={handleChanges}/>

                <p>Quantity: {consolesData.obj.quantity}</p>
                <input name="quantity" type="number" id="quantity" onChange={handleChanges}/>

                <p>Manufacturer: {consolesData.obj.manufacturer}</p>
                <input name="manufacturer" type="text" id="manufacturer" onChange={handleChanges}/>

                <p>Memory Amount: {consolesData.obj.memoryAmount}</p>
                <input name="memoryAmount" type="text" id="memoryAmount" onChange={handleChanges}/>

                <p>Model: {consolesData.obj.model}</p>
                <input name="model" type="text" id="model" onChange={handleChanges}/>
                <p>Processor: {consolesData.obj.processor}</p>
                <input name="processor" type="text" id="processor"
                       onChange={handleChanges}/>
            </form>
        )
    }

    const handleChanges = (e) => {
        e.preventDefault()
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    };

    const makeConsolePutRequest = () => {
        axios.put('http://localhost:8080/gameConsole', {
            price: state.price !== null ? state.price : consolesData.obj.price,
            quantity: state.quantity !== null ? state.quantity : consolesData.obj.quantity,
            consoleId: consolesData.obj.id,
            memoryAmount: state.memoryAmount !== null ? state.memoryAmount : consolesData.obj.memoryAmount,
            processor: state.processor !== null ? state.processor : consolesData.obj.processor,
            model: state.model !== null ? state.model : consolesData.obj.model,
            manufacturer: state.manufacturer !== null ? state.manufacturer : consolesData.obj.manufacturer
        }).then(res => {
            window.location.reload()
        })
    }


    return consolesData !== null ? (
        <>
            <div className="flex justify-center">
                <AiFillEdit className="edit" onClick={() => setShouldShow(true)}/>
            </div>
            {shouldShow && (
                <ModalBackground>
                    <ModalBody onClick={(e) => e.stopPropagation()}>
                        {consolesData && editingConsoleModal()}
                        <div>
                            <button className="close-modal-btn"
                                    onClick={() => setShouldShow(false)}>
                                Close
                            </button>
                            <button className="close-modal-btn"
                                    onClick={makeConsolePutRequest}>
                                Submit
                            </button>
                        </div>
                    </ModalBody>
                </ModalBackground>
            )}
        </>
    ) : <p>loading</p>
}


export default Modal;