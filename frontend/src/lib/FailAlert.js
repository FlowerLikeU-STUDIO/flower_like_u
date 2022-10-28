import Swal from "sweetalert2";

const FailAlert = (text) => {
  Swal.fire({
    title: text,
    icon: "error",
    showConfirmButton: false,
    timer: 1200,
  });
};

export default FailAlert;
