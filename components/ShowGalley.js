import React, { useEffect, useState } from "react";
import { getGallery } from "../utils/gallery";

function ShowGalley() {
  const [rawgallery, setrawgallery] = useState([]);
  const [gallery, setgallery] = useState(null);
  const [ViewPicture, setViewPicture] = useState(null);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // fetch("/api/gallery/1", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     setrawgallery([...result]);
    //     setting([...result]);
    //   })
    //   .catch((error) => console.log("error", error));
    const getData = await getGallery();
    setrawgallery([...getData]);
    setting([...getData]);
  };
  const setting = (img) => {
    let new_arr = [
      {
        col: [],
      },
      {
        col: [],
      },
      {
        col: [],
      },
      {
        col: [],
      },
    ];
    let c = 0;
    for (let i = 0; i < img.length; i++) {
      new_arr[c].col.push(img[i]);
      c = c == 3 ? 0 : c + 1;
    }
    setgallery(new_arr);
  };

  const BigPicture = (img) => {
    setViewPicture({
      src: img.src,
    });
  };

  const closeView = () => {
    setViewPicture(null);
  };

  return (
    <>
      <div
        className={`${
          ViewPicture ? "fade show d-block" : ""
        } modal overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  `}
      >
        <div className="modal-dialog mt-5">
          <div className="modal-content ">
          <div className="d-flex bg-dark  justify-content-center">
              <button
                type="button"
                className="h2 text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeView}
              >
                X
              </button>
              </div>

            <div className="modal-body p-0">
              <img src={ViewPicture && ViewPicture.src} />
            </div>
            <div className="d-flex  bg-dark  justify-content-center">
              <button
                type="button"
                className="h2 text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeView}
              >
                X
              </button>
            </div>
          </div>

        </div>
      </div>
      <div
        className={` ${
          ViewPicture ? "opacity-40 fixed inset-0 z-40 bg-black" : ""
        } `}
      ></div>

      <div className="row">
        <div className="col-6 col-md-3">
          {gallery &&
            gallery[0].col.map((img, index) => (
              <div
                key={"i0" + index}
                className="mb-4"
                onClick={() => BigPicture(img)}
              >
                <img className="h-auto max-w-full rounded-lg" src={img.src} />
              </div>
            ))}
        </div>
        <div className="col-6 col-md-3">
          {gallery &&
            gallery[1].col.map((img, index) => (
              <div
                key={"i1" + index}
                className="mb-4"
                onClick={() => BigPicture(img)}
              >
                <img className="h-auto max-w-full rounded-lg" src={img.src} />
              </div>
            ))}
        </div>
        <div className="col-6 col-md-3">
          {gallery &&
            gallery[2].col.map((img, index) => (
              <div
                key={"i2" + index}
                className="mb-4"
                onClick={() => BigPicture(img)}
              >
                <img className="h-auto max-w-full rounded-lg" src={img.src} />
              </div>
            ))}
        </div>
        <div className="col-6 col-md-3">
          {gallery &&
            gallery[3].col.map((img, index) => (
              <div
                key={"i3" + index}
                className="mb-4"
                onClick={() => BigPicture(img)}
              >
                <img className="h-auto max-w-full rounded-lg" src={img.src} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ShowGalley;
