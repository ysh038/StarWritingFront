import style from "./post.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Post() {
    const [memberId, setMemberId] = useState("");
    const token = localStorage.getItem("Authorization");

    async function submitPost() {
        await axios
            .post(
                "/api/authorization",
                {
                    dummy: "dummy",
                    // post요청시 body가 없으니까 오류가 떴음. 아무 더미 데이터 전송
                },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                        // encType: "multipart/form-data", // 파일을 넣을거면 필수
                    },
                }
            )
            .then((res) => {
                document.getElementsByClassName(style.postForm)[0].submit();
            })
            .catch((e) => {
                console.error(e);
                console.error(e.response.data);
                if (e.response.data === "토큰이 유효하지 않습니다") {
                    localStorage.clear();
                }
            });
    }

    async function checkToken() {
        await axios
            .post(
                "/api/authorization",
                {
                    dummy: "dummy",
                    // post요청시 body가 없으니까 오류가 떴음. 아무 더미 데이터 전송
                },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                        // encType: "multipart/form-data", // 파일을 넣을거면 필수
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setMemberId(res.data);
            })
            .catch((e) => {
                console.error(e);
                console.error(e.response.data);
                if (e.response.data === "토큰이 유효하지 않습니다") {
                    localStorage.clear();
                }
            });
    }

    function preventSubmit(e) {
        e.preventDefault();
        console.log("preventDefault 작동");
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div className={style.postWrapper}>
            <form
                className={style.postForm}
                action="/api/posts"
                method="post"
                encType="multipart/form-data"
                onSubmit={preventSubmit}
            >
                <div className={style.formGroup}></div>
                <label htmlFor="title">제목 : </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목을 입력하세요."
                    width="200px"
                />
                <br />
                <br />
                <label htmlFor="member">member ID : </label>
                <input
                    type="text"
                    id="member"
                    name="member"
                    placeholder="ID를 입력하세요"
                    value={memberId}
                    readOnly
                    width="200px"
                />
                <br />
                <br />
                <label htmlFor="mainText">내용 : </label>
                <input
                    type="text"
                    id="mainText"
                    name="mainText"
                    width="400px"
                />
                <br />
                <br />
                <input type="file" name="file" id="file" />
                <br />
                <br />
                <br />
            </form>
            <button onClick={submitPost}>제출</button>
        </div>
    );
}

export default Post;
