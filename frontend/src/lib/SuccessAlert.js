import Swal from "sweetalert2";

const SuccessAlert = (text) => {
  Swal.fire({
    title: text,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};

export default SuccessAlert;
