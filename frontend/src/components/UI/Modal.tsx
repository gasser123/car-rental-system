import classes from "./Modal.module.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/xmark-solid.svg";
interface BackdropProps {
  onHideModal: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}
interface OverlayProps {
  onHideModal: React.MouseEventHandler<HTMLDivElement>
  children?: React.ReactNode;
}

interface ModalProps {
onHideModal: React.MouseEventHandler<HTMLDivElement>;
 children?: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = (props: BackdropProps) => {
  return <div className={classes.backdrop} onClick={props.onHideModal} />;
};

const ModalOverlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  return (
    <div className={classes.modal}>
      <img
        src={closeIcon}
        alt="close"
        className={classes.close}
        onClick={props.onHideModal}
      />
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
        <ModalOverlay onHideModal={props.onHideModal}>{props.children}</ModalOverlay>,
        document.getElementById("overlays")!
      )}
    </Fragment>
  );
}

export default Modal;
