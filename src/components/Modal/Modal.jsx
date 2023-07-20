import { Component } from "react";
import './Modal.css'
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handlerEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handlerEscape);
  }

  handlerEscape = (e) => {
    if (e.code === "Escape") {
      this.props.handlerCloseModal();
    }
  };

  handlerBackdropClose = (e) => {
    if (e.target === e.currentTarget) {
      this.props.handlerCloseModal();
    }
  };

  render() {
    const { largeImg} = this.props;
    return createPortal(
      <div onClick={this.handlerBackdropClose} className="backdrop">
        <div className="modal-wrapper">
            <img  src={largeImg} alt="" />
          {/* <div onClick={handlerCloseModal} className="close-btn"></div> */}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
};