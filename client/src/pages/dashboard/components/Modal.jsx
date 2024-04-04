import React from "react";
import { useForm } from "react-hook-form";

const Modal = ({ show, setShow, addProduct }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("product_image", data.product_image[0]);
    formData.append("product_name", data.product_name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("stack", data.stack);
    addProduct(formData);
  };

  return show ? (
    <div className="modal_background">
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal_header">
            <h2>Add Product</h2>
            <button onClick={() => setShow(false)}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="modal_content">
            <div className="mb-2">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                id="product_name"
                {...register("product_name", { required: true })}
              />
            </div>
            <div className="mb-2">
              <label class="custom-file-input">
                <input
                  type="file"
                  {...register("product_image", { required: true })}
                  accept=".jpg, .jpeg, .png"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                {...register("price", { required: true })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="stack">Stack</label>
              <input
                type="number"
                id="stack"
                {...register("stack", { required: true })}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                rows="10"
                width="100%"
                {...register("description", { required: true })}
              ></textarea>
            </div>
          </div>
          <div className="modal_footer">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
