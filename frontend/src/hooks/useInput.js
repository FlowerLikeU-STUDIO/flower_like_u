import { useCallback, useState } from "react";

const useInput = (initialForm) => {
  const [form, setForm] = useState({ ...initialForm });

  const onChange = useCallback((e) => {
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }, []);

  return [form, setForm, onChange];
};

export default useInput;
