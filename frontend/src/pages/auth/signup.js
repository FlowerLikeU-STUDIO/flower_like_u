import Image from "next/image";
import styles from "./signup.module.scss";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { client } from "@/pages/api/client";
import { useRouter } from "next/router";
import SuccessAlert from "@/lib/SuccessAlert";
// 로그인 여부
import useSWR from "swr";
import storage from "@/lib/utils/storage";
// 정규식
import regexCheck from "@/lib/utils/regexCheck";

const SignUp = () => {
  const { data: isLogin } = useSWR("logIn", storage);
  const cx = classNames.bind(styles);
  const router = useRouter();

  // user Type
  const [userType, setUserType] = useState("consumer");

  // 이메일 인증 및 확인
  const [email, setEmail] = useState("");
  const [checkEmailForm, setcheckEmailForm] = useState(false);
  const [emailAuthCode, setEmailAuthCode] = useState("1");
  const [code, setCode] = useState("");
  const [checkedEmail, setCheckedEmail] = useState(false);

  const [userId, setUserId] = useState("");
  const [idForm, setIdForm] = useState("");
  const [name, setName] = useState("");

  // 비밀번호 확인
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordForm, setPasswordForm] = useState(false);
  const [sameMsg, setSameMsg] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onAuthHandler = (event) => {
    setCode(event.target.value);
  };
  const onUserIdHandler = (event) => {
    const idRegex = regexCheck.id;
    if (event.target.value.length > 16) {
      setUserId(event.target.value.slice(0, 16));
      return;
    }
    if (!idRegex.test(event.target.value)) {
      setIdForm(false);
    } else {
      setIdForm(true);
    }
    setUserId(event.target.value);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onPasswordHandler = (event) => {
    const passwordRegex = regexCheck.password;
    if (event.target.value.length > 16) {
      setPassword(event.target.value.slice(0, 16));
      return;
    }
    if (!passwordRegex.test(event.target.value)) {
      setPasswordForm(false);
    } else {
      setPasswordForm(true);
    }
    setPassword(event.target.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
    if (password === event.target.value) {
      setSameMsg(true);
    } else {
      setSameMsg(false);
    }
  };

  //* 이메일 유효성 검사
  const checkEmail = (e) => {
    let regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    //* 형식에 맞는 경우 true
    setcheckEmailForm(regExp.test(e.target.value));
  };

  //* 이메일 인증
  const onEmailCertified = async (event) => {
    event.preventDefault();
    if (!checkEmailForm) {
      alert("잘못된 이메일 형식입니다.");
      return;
    }
    const data = {
      email: email,
    };
    const res = await client.post("auth/email", data).then((res) => res.data);
    if (res.result === "success") {
      setEmailAuthCode(res.authCode);
      alert("이메일이 발송되었습니다.");
    } else {
      alert("이메일 발송에 실패했습니다.");
    }
  };

  //* 인증코드 확인
  const onConfirmCode = (event) => {
    event.preventDefault();
    if (emailAuthCode === code) {
      setCheckedEmail(true);
      alert("인증되었습니다.");
    } else {
      setCheckedEmail(false);
      alert("인증코드가 잘못되었습니다.");
    }
  };

  //* 회원가입
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }
    if (!userId) {
      return alert("아이디를 입력해주세요.");
    }
    if (!name) {
      return alert("이름을 입력해주세요.");
    }

    const data = {
      type: userType,
      userId: userId,
      password: password,
      password2: confirmPassword,
      name: name,
      email: email,
    };

    const res = await client
      .post("user/register", data)
      .then((res) => res.data);
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
              <Image src="/chatFlower.png" width={230} height={230} />
            </article>
            <article className={styles.signup_contents_right}>
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
                className={styles.signup_form}
              >
                <div className={styles.input_button_wrapper}>
                  <div className={styles.input_wrapper}>
                    <label className={styles.signup_label}>이메일</label>
                    <input
                      type="email"
                      value={email}
                      onChange={onEmailHandler}
                      className={styles.input}
                      onBlur={checkEmail}
                    />
                  </div>
                  <div className={styles.button_wrapper}>
                    <button
                      className={styles.confirm_button}
                      onClick={onEmailCertified}
                    >
                      인증코드 보내기
                    </button>
                  </div>
                </div>
                <div className={styles.input_button_wrapper}>
                  <div className={styles.input_wrapper}>
                    <label className={styles.signup_label}>인증코드</label>
                    <input
                      type="text"
                      value={code}
                      onChange={onAuthHandler}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.button_wrapper}>
                    <button
                      className={styles.confirm_button}
                      onClick={onConfirmCode}
                    >
                      인증코드 확인
                    </button>
                  </div>
                </div>
                <div className={styles.input_wrapper}>
                  <label className={styles.signup_label}>이름</label>
                  <input
                    type="text"
                    value={name}
                    onChange={onNameHandler}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inform_input_wrapper}>
                  <div className={styles.input_wrapper}>
                    <label className={styles.signup_label}>아이디</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={onUserIdHandler}
                      className={styles.input}
                    />
                  </div>
                  {!userId ? (
                    <p className={styles.inform_text}>
                      아이디를 입력해 주세요.
                    </p>
                  ) : idForm ? (
                    <p className={styles.inform_text}>
                      아이디 형식에 일치합니다.
                    </p>
                  ) : (
                    <p className={styles.inform_text}>
                      숫자+영문자 조합으로 8~16자를 입력해 주세요.
                    </p>
                  )}
                </div>
                <div className={styles.inform_input_wrapper}>
                  <div className={styles.input_wrapper}>
                    <label className={styles.signup_label}>비밀번호</label>
                    <input
                      type="password"
                      value={password}
                      onChange={onPasswordHandler}
                      className={styles.input}
                    />
                  </div>
                  {!password ? (
                    <p className={styles.inform_text}>
                      비밀번호를 입력해 주세요.
                    </p>
                  ) : passwordForm ? (
                    <p className={styles.inform_text}>
                      비밀번호 형식에 일치합니다.
                    </p>
                  ) : (
                    <p className={styles.inform_text}>
                      숫자+영문자+특수문자 조합으로 8~16자를 입력해 주세요.
                    </p>
                  )}
                </div>
                <div className={styles.inform_input_wrapper}>
                  <div className={styles.input_wrapper}>
                    <label className={styles.signup_label}>비밀번호 확인</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={onConfirmPasswordHandler}
                      className={styles.input}
                    />
                  </div>
                  {!confirmPassword ? (
                    <p className={styles.inform_text}>
                      비밀번호 확인란을 입력해 주세요.
                    </p>
                  ) : sameMsg ? (
                    <p className={styles.inform_text}>
                      비밀번호와 비밀번호 확인이 일치합니다.
                    </p>
                  ) : (
                    <p className={styles.inform_text}>
                      비밀번호와 비밀번호 확인이 일치하지 않습니다.
                    </p>
                  )}
                </div>
                <div className={styles.signup_button_wrapper}>
                  {checkedEmail &&
                  userId &&
                  name &&
                  password &&
                  confirmPassword &&
                  idForm &&
                  sameMsg ? (
                    <button className={cx("signup_button")} disabled={false}>
                      회원가입
                    </button>
                  ) : (
                    <button
                      className={cx("signup_button", "false")}
                      disabled={true}
                    >
                      회원가입
                    </button>
                  )}
                </div>
              </form>
            </article>
          </main>
        </section>
      )}
    </>
  );
};

export default SignUp;
