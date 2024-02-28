import classes from "./Modal.module.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  onHideModal: () => void;
  children?: React.ReactNode;
}
interface OverlayProps {
  children?: React.ReactNode;
}

interface ModalProps {
onHideModal: () => void;
 children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={props.onHideModal} />;
};

const ModalOverlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal: React.FC<ModalProps> = (props: ModalProps)=>{
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        document.getElementById("overlays")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")!
      )}
    </Fragment>
  );
}

export default Modal;
