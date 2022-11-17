import Image from "next/image";
import styles from "./signup.module.scss";
import React, { useState, useEffect } from "react";
import { client } from "@/pages/api/client";
import { useRouter } from "next/router";
import SuccessAlert from "@/lib/SuccessAlert";
// 로그인 여부
import useSWR from "swr";
import storage from "@/lib/utils/storage";

const SignUp = () => {
  const { data: isLogin } = useSWR("logIn", storage);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("consumer");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    const data = {
      type: userType,
      userId: userId,
      password: password,
      password2: confirmPassword,
      name: name,
      email: email,
    };

    const res = await client.post("user/register", data).then((res) => res.data);
    if (res.result === "success") {
      router.replace("/auth/login");
      SuccessAlert("회원가입 성공!");
    } else {
      alert(res.message);
    }
  };

  return (
    <>
      {isLogin ? (
        <div className={styles.signup_wrapper}>이미 로그인 된 유저입니다.</div>
      ) : (
        <section className={styles.signup_wrapper}>
          <main className={styles.signup_contents}>
            <article className={styles.signup_contents_left}>
              <Image src="/chatflower.png" width={230} height={230} />
            </article>
            <article className={styles.signup_contents_right}>
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
                className={styles.signup_form}
              >
                <div className={styles.input_wrapper}>
                  <label className={styles.signup_label}>이메일</label>
                  <input type="email" value={email} onChange={onEmailHandler} className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.signup_label}>이름</label>
                  <input type="text" value={name} onChange={onNameHandler} className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.signup_label}>아이디</label>
                  <input type="text" value={userId} onChange={onUserIdHandler} className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.signup_label}>비밀번호</label>
                  <input type="password" value={password} onChange={onPasswordHandler} className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.signup_label}>비밀번호 확인</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={onConfirmPasswordHandler}
                    className={styles.input}
                  />
                </div>
                <button formAction="" className={styles.signup_button}>
                  회원가입
                </button>
              </form>
            </article>
          </main>
        </section>
      )}
    </>
  );
};

export default SignUp;
