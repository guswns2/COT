import { TextField } from "@mui/material";
import "./css/Modal.css";

const Modal = (props) => {
    const { setModalOpen } = props;
    
    const closeModal = () => {
        setModalOpen(false);
    };

  return (
    <div className="Mcontainer">
      <div className="modal">
        <div className="statedefault-iconoff">
          <b className="b">탄소배출량</b>
          <TextField
            className="text-field"
            color="primary"
            variant="outlined"
            type="number"
            size="small"
            margin="none"
          />
        </div>
        <div className="statedefault-iconoff1">
          <b className="b">전력사용량</b>
          <TextField
            className="text-field"
            color="primary"
            variant="outlined"
            type="number"
            size="small"
            margin="none"
          />
        </div>
        <button className="vector-wrapper" onClick={closeModal}>
          <img className="vector-icon" alt="" src="../vector2.svg" />
        </button>
        <button className="stateactive-typeprimary">
          <b className="b2">입력</b>
        </button>
      </div>
    </div>
  );
};
export default Modal;
