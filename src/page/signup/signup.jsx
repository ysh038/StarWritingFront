import style from "./signup.module.css";

function SignUp() {
    return (
        <div className={style.signUpWrapper}>
            <form
                action="/api/members"
                method="post"
                enctype="multipart/form-data"
            >
                <div className={style.formGroup}></div>
                <label for="name">이름 : </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="이름을 입력하세요."
                    width="200px"
                />
                <br />
                <br />
                <label for="email">이메일 : </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    width="400px"
                />
                <br />
                <br />
                <label for="birthday">생년월일 : </label>
                <input type="date" id="birthday" name="birthday" />
                <br />
                <br />
                <div>
                    <label>성별 : </label>
                    <input type="radio" id="male" name="sex" value="남" />
                    <label for="male">남</label>
                    <input type="radio" id="female" name="sex" value="여" />
                    <label for="female">여</label>
                    <br />
                    <br />
                </div>
                <label for="phoneNum">휴대폰 : </label>
                <input
                    type="tel"
                    id="phoneNum"
                    name="phoneNum"
                    placeholder="&#39;-&#39; 제외"
                    width="400px"
                />
                <br />
                <br />
                <label for="address">주소 : </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="일단 텍스트로 주소 입력"
                    width="600px"
                />
                <br />
                <br />
                <label for="memberId">아이디 : </label>
                <input
                    type="text"
                    id="memberId"
                    name="memberId"
                    placeholder="아이디를 입력하세요"
                    width="300px"
                />
                <br />
                <br />
                <label for="password">비밀번호 : </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    width="300px"
                />
                <br />
                <br />
                <label for="password2">비밀번호 확인 : </label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="비밀번호를 재입력하세요"
                    width="300px"
                />
                <br />
                <br />
                <label for="nickname">닉네임 : </label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="닉네임을 입력하세요"
                    width="200px"
                />
                <br />
                <br />
                <input type="file" name="file" />
                <br />
                <br />
                <br />
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default SignUp;
