import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

export default function DemoLogin({ setErrors }) {
  const dispatch = useDispatch();
  const demoSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("dora@noswiping.com", "password"));
    if (data) {
      setErrors(data);
    }
  };
  return (
    <button
      type="button"
      className={"go-button demolition"}
      onClick={demoSubmit}
    >
      Demo Login
    </button>
  );
}
