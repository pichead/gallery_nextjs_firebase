import React, { useState } from "react";
import { saveImage } from "../utils/gallery";


function ButtonAddImage() {
  const [Modal, setModal] = useState(false);

  const [file,setfile] = useState(null);

  const [status,setstatus] = useState(false)

  const openModal = () => {
    setModal(true)
  };

  const closeModal = () => {
    setModal(false)
  };

  const fileChange = async (e) => {
    
    const file = e.target.files[0];
    setstatus(true)
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = image.width;
          let height = image.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            setfile(resizedFile);
            setstatus(false)
          }, file.type);
        };
      };

      reader.readAsDataURL(file);
    }
  }


  const handleSave = async (e) => {
    e.preventDefault();
    setstatus(true)
    console.log("try to save file: ")

    const result = await saveImage(file);
    console.log("saveImage result:", result);
    if(result){
      setstatus(false)
      setModal(false)
      location.reload();

    }
    
  }


  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          className="rounded-full bg-blue-400 hover:bg-blue-500  py-2 px-4 text-lg text-light "
          type="button"
          onClick={openModal}
        >
          Add Picture
        </button>
        <div
          className={`${Modal?"fade show d-block":""} modal overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none `}
        >
          <form onSubmit={handleSave} className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLiveLabel">
                  Add New Picture
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >X</button>
              </div>
              <div className="modal-body">
                <input type="file" onChange={fileChange}/>
              </div>
              <div className={status?"d-none modal-footer":"modal-footer"}>
                <button
                  type="button"
                  className="btn bg-red-600 text-light"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="btn bg-green-600 text-light">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={` ${Modal?"opacity-40 fixed inset-0 z-40 bg-black":""} `}></div>

      </div>
    </>
  );
}

export default ButtonAddImage;
