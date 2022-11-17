import Image from "next/image";
import { useRouter } from "next/router";
import Input from "../../components/auth/Input";
import useInput from "../../hooks/useInput";
import FailsAlert from "../../lib/FailAlert";
import SuccessAlert from "../../lib/SuccessAlert";
import { mutate } from "swr";
import { client } from "../api/client";
import Link from "next/link";
import styles from "./login.module.scss";

const loginData = {
  userId: "",
  password: "",
};

const Login = () => {
  const [loginInfo, setLoginInfo, onChange] = useInput(loginData);
  const router = useRouter();
  const onHandleSubmit = async () => {
    if (loginInfo.userId.length === 0 || loginInfo.password.length === 0) {
      FailsAlert("로그인 정보를 정확히 입력해 주세요.");
      return;
    }
    const { data, status } = await client
      .post("auth/login", {
        userId: loginInfo.userId,
        password: loginInfo.password,
      })
      .then((response) => response);

    if (status === 200) {
      window.sessionStorage.setItem("ACCESS_TOKEN", data.accessToken);
      SuccessAlert("로그인 되었습니다.");
      mutate("logIn", true);
      router.push("/");
    }
  };
  return (
    <section className={styles.login_wrapper}>
      <main className={styles.login_contents}>
        <article className={styles.login_contents_left}>
          <Image src="/chatflower.png" width={150} height={150} />
        </article>
        <article className={styles.login_contents_right}>
          <Input text={"아이디"} value={loginInfo.userId} onChange={onChange} name={"userId"} />

          <Input text={"비밀번호"} value={loginInfo.password} onChange={onChange} name={"password"} type={"password"} />

          <button className={styles.login_button} onClick={onHandleSubmit}>
            로그인
          </button>
          {/* <SocialButton width={"70%"} margin={"20px 0 0 0"}>
            <Image
              src={"/auth/kakao_login_medium.png"}
              width={175}
              height={40}
            />
          </SocialButton> */}
          <Link href="/auth/signup">
            <a className={styles.header_anchor}>회원가입</a>
          </Link>
        </article>
      </main>
    </section>
  );
};

export default Login;
