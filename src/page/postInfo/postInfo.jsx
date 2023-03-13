import style from "./postInfo.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostInfo() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState({});
    const [memberInfo, setMemberId] = useState({});

    const postImg = document.getElementsByClassName(style.postImg);

    async function checkToken() {
        console.log("submit 이벤트 발생");

        const token = localStorage.getItem("Authorization");
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
                    },
                }
            )
            .then((res) => {
                console.log(res);
                console.log("사용자 인증 완료");
                document.getElementsByClassName(style.commentForm)[0].submit();
            })
            .catch((e) => {
                console.error(e);
            });
    }

    const getPostInfo = () => {
        axios
            .get(`/api/posts/${id}`)
            .then((res) => {
                setPostInfo(res.data);
                setMemberId(res.data.memberId);
                console.log(res.data);
                if (
                    res.data.postImage.originalFileName.split("_", 2)[1] ===
                    "default"
                ) {
                    postImg[0].setAttribute(
                        "src",
                        "http://127.0.0.1:8887/img/postImg/" +
                            res.data.postImage.storeFileName
                    );
                } else {
                    postImg[0].setAttribute(
                        "src",
                        "http://127.0.0.1:8887/members/" +
                            res.data.memberId.memberId +
                            "/posts/" +
                            res.data.title +
                            "/" +
                            res.data.postImage.storeFileName
                    );
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    function preventSubmit(e) {
        e.preventDefault();
        console.log("preventDefault 작동");
    }

    useEffect(() => {
        getPostInfo();
    }, []);

    return (
        <div className={style.postInfoWrapper}>
            <h1>Here is PostInfo Page.</h1>
            <p>id is {postInfo.id}</p>
            <p>memberId is {memberInfo.memberId}</p>
            <p>title is {postInfo.title}</p>
            <p>posting Date is {postInfo.posting_date}</p>
            <p>shared number is {postInfo.shared_num}</p>
            <p>view is {postInfo.view}</p>
            <img className={style.postImg} alt="" />

            <div className={style.comment}>
                <form
                    className={style.commentForm}
                    action="/api/comments"
                    method="post"
                    onSubmit={preventSubmit}
                >
                    <div className={style.formGroup}></div>
                    <label htmlFor="mainText">내용 : </label>
                    <input
                        type="text"
                        id="mainText"
                        name="mainText"
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
                    <input
                        type="number"
                        id="post"
                        name="post"
                        width="200px"
                        value={id}
                        readOnly
                    />
                    <br />
                    <br />
                </form>
                <button onClick={checkToken}>제출</button>
            </div>
        </div>
    );
}

export default PostInfo;
