import style from "./postInfo.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostInfo() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState({});
    const [memberInfo, setMember] = useState({});
    const [imgData, setImgData] = useState();
    const [memberId, setMemberId] = useState("");

    const token = localStorage.getItem("Authorization");
    const postImg = document.getElementsByClassName(style.postImg);

    async function submitComment() {
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
            .then(() => {
                document.getElementsByClassName(style.commentForm)[0].submit();
            })
            .catch((e) => {
                console.error(e);
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

    const getPostInfo = () => {
        axios
            .get(`/api/posts/${id}`)
            .then((res) => {
                console.log(res.data);
                setPostInfo(res.data);
                setMember(res.data.member);
            })
            .catch((e) => {
                console.error(e);
            });

        const config = {
            responseType: "blob",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        axios
            .get(`/api/posts/${id}/image`, config)
            .then((res) => {
                console.log(res.data);
                setImgData(URL.createObjectURL(res.data));
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
        checkToken();
    }, []);

    return (
        <div className={style.postInfoWrapper}>
            <h1>Here is PostInfo Page.</h1>
            <h3>현재 로그인 되어있는 유저 : {memberId}</h3>
            <p>id is {postInfo.id}</p>
            <p>memberId is {memberInfo.memberId}</p>
            <p>title is {postInfo.title}</p>
            <p>posting Date is {postInfo.posting_date}</p>
            <p>shared number is {postInfo.shared_num}</p>
            <p>view is {postInfo.view}</p>
            <img className={style.postImg} src={imgData} alt="" />
            <p>================================</p>
            <h2>댓글 작성</h2>
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
                        value={memberId}
                        readOnly
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
                <button onClick={submitComment}>제출</button>
            </div>
        </div>
    );
}

export default PostInfo;
