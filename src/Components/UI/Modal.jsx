import "./Modal.css";
import ReactDOM from "react-dom";
const Overlay = (props) => {
    return (
        <div className="modal">
            <div className="content">{props.children}</div>
        </div>
    );
};
const BackDrop = (props) => {
    return <div className="backdrop" onClick={props.onClose} />;
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <BackDrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <Overlay>{props.children}</Overlay>,
                portalElement
            )}
        </>
    );
};
export default Modal;
