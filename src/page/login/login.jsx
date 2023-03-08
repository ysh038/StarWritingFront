import style from "./login.module.css";
import axios from "axios";

function Login() {
    return (
        <div className={style.loginWrapper}>
            <form
                // action="/api/login"
                // method="post"
                className={style.loginForm}
                onSubmit={function (event) {
                    event.preventDefault();
                    axios
                        .post("/api/login", {
                            memberId: event.target.memberId.value,
                            password: event.target.password.value,
                        })
                        .then((res) => {
                            console.log(res);
                            let jwtToken = res.headers.get("Authorization");
                            console.log(jwtToken);
                            localStorage.setItem("token", jwtToken);
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                }}
            >
                <div className={style.formGroup}>
                    <label for="memberId">ID : </label>
                    <input
                        type="text"
                        id="memberId"
                        name="memberId"
                        placeholder="아이디를 입력하세요."
                        width="200px"
                    />
                    <br />
                    <br />
                    <label for="password">비밀번호 : </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요."
                        width="400px"
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default Login;
