import { ModalContainer, Overlay } from "./Modal.styled"
import { createPortal } from "react-dom"
import { Component } from "react"
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component{

    componentDidMount() {
        window.addEventListener('keydown', this.hendleKeydown)
    }
     
    componentWillUnmount() {
        window.removeEventListener('keydown', this.hendleKeydown)
    }

    hendleKeydown = e => {
        if (e.code === 'Escape') {
            const { onClose } = this.props
            onClose();
        }
    }

    render() {
        const {image} = this.props
        return (
        createPortal(
            <Overlay>
              <ModalContainer>
                <img src={image} alt='' />
              </ModalContainer>
            </Overlay>, modalRoot)
    )
}

}
Modal.propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}