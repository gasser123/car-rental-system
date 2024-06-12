import Modal from "../UI/Modal";
import classes from "./ActivateAccountModal.module.css";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import { useState } from "react";
import Spinner from "../UI/Spinner";
import { useNavigate } from "react-router-dom";
interface Props {
  onHideModal: React.MouseEventHandler<HTMLDivElement>;
  onHideModalfunc: () => void;
}
const ActivateAccountModal: React.FC<Props> = (props) => {
  const { onHideModal } = props;
  const [ErrorResponse, setErrorResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const resendActivationHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setErrorResponse(null);
      const response = await fetch("http://localhost:8080/activation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setIsLoading(false);
      const message = await response.json();
      if (!response.ok) {
        setErrorResponse(message);
        return;
      }
     navigate("/activation");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal onHideModal={onHideModal}>
      <div className={classes.container}>
        {ErrorResponse ? (
          <h3>
            <img src={circleXmark} alt="wrong" />
            {ErrorResponse}
          </h3>
        ) : null}
        <h2>Account not activated</h2>
        <p>You need to activate your account to be able to rent</p>
        <button type="button" className={classes.action} disabled={isLoading} onClick={resendActivationHandler}>
          {isLoading ? <Spinner /> : "Activate my account"}
        </button>
      </div>
    </Modal>
  );
};

export default ActivateAccountModal;
