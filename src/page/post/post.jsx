import style from "./post.module.css";
import axios from "axios";

function Post() {
    async function checkToken() {
        console.log("submit 이벤트 발생");
        // var frm = new FormData();
        // var file = document.getElementById("file").files[0];
        // frm.append("postImage", file);
        // frm.append("title", event.target.title.value);
        // frm.append("member", event.target.member.value);
        // frm.append("mainText", event.target.mainText.value);

        const token = localStorage.getItem("Authorization");
        console.log(token);
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
                document.getElementsByClassName(style.postForm)[0].submit();
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function preventSubmit(e) {
        e.preventDefault();
        console.log("preventDefault 작동");
    }

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
            <button onClick={checkToken}>제출</button>
        </div>
    );
}

export default Post;
