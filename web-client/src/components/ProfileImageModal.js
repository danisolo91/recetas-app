import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Modal } from "bootstrap";
import UserService from '../services/user.service';


const ProfileImageModal = (props) => {
  const { userId } = useParams();
  const modalRef = useRef();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectedImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = () => {
    setLoading(true);

    const profileImageFD = new FormData();
    profileImageFD.append('profileImage', image);

    UserService.updateProfileImage(userId, profileImageFD)
      .then(res => {
        window.location.reload();
        setLoading(false);
      }, err => {
        console.log(err.response.data);
        setLoading(false);
      });
  }

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle);
    bsModal.show();
  }

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  }

  useEffect(() => {
    if (props.show === true) {
      showModal();
    } else {
      hideModal();
    }
  });

  return (
    <div className="modal fade" ref={modalRef} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Cambiar foto de perfil</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={props.hide}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input className="form-control" type="file" id="formFile" onChange={handleSelectedImage} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.hide}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileImageModal;