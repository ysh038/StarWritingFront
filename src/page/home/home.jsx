import style from "./home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [memberId, setMemberId] = useState("");
    const token = localStorage.getItem("Authorization");

    const postTableHead = document.getElementsByClassName(style.postTableHead);

    const memberTableHead = document.getElementsByClassName(
        style.memberTableHead
    );

    const navigate = useNavigate();

    const checkToken = async () => {
        let loginMember;
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
                loginMember = res.data;
            })
            .catch((e) => {
                console.error(e);
                console.error(e.response.data);
                if (e.response.data === "토큰이 유효하지 않습니다") {
                    localStorage.clear();
                }
            });
        return loginMember;
    };

    const getMember = () => {
        axios
            .get("/api/members")
            .then((res) => {
                console.log(res.data);
                for (let i = 0; res.data[i] !== undefined; i++) {
                    const memberTableRow = document.createElement("tr");
                    memberTableRow.setAttribute("class", style.memberTableRow);

                    const id = document.createElement("th");
                    id.setAttribute("class", style.th);
                    id.innerText = res.data[i].id;
                    memberTableRow.appendChild(id);

                    const memberIdTh = document.createElement("th");
                    memberIdTh.setAttribute("class", style.th);
                    memberIdTh.innerText = res.data[i].memberId;
                    memberTableRow.appendChild(memberIdTh);

                    const name = document.createElement("th");
                    name.setAttribute("class", style.th);
                    name.innerText = res.data[i].name;
                    memberTableRow.appendChild(name);

                    const nickname = document.createElement("th");
                    nickname.setAttribute("class", style.th);
                    nickname.innerText = res.data[i].nickname;
                    memberTableRow.appendChild(nickname);

                    const email = document.createElement("th");
                    email.setAttribute("class", style.th);
                    email.innerText = res.data[i].email;
                    memberTableRow.appendChild(email);

                    const tier = document.createElement("th");
                    tier.setAttribute("class", style.th);
                    tier.innerText = res.data[i].tier;
                    memberTableRow.appendChild(tier);

                    const createDate = document.createElement("th");
                    createDate.setAttribute("class", style.th);
                    createDate.innerText = res.data[i].createDate;
                    memberTableRow.appendChild(createDate);

                    const memberInfoButton = document.createElement("button");
                    memberInfoButton.setAttribute("class", style.infoButton);
                    memberInfoButton.innerText = "보기";
                    memberInfoButton.onclick = () => {
                        navigate(`/memberInfo/${res.data[i].id}`);
                    };
                    memberTableRow.appendChild(memberInfoButton);

                    const followButton = document.createElement("button");
                    followButton.setAttribute("class", style.followButton);
                    followButton.innerText = "팔로우";
                    followButton.onclick = () => {
                        checkToken().then((buttonRes) => {
                            axios
                                .get(`/api/memberIds/${buttonRes}`, {
                                    dummy: "dummy",
                                })
                                .then((r) => {
                                    axios.post(`/api/follow`, {
                                        followedMemberId: res.data[i].memberId,
                                        followingMemberId: r.data.memberId,
                                    });
                                })
                                .catch((e) => {
                                    console.error(e);
                                });
                        });
                    };
                    memberTableRow.appendChild(followButton);

                    memberTableHead[0].appendChild(memberTableRow);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const getPost = () => {
        axios
            .get("/api/posts")
            .then((res) => {
                console.log("post", res.data);
                for (let i = 0; res.data[i] !== undefined; i++) {
                    const postTableRow = document.createElement("tr");
                    postTableRow.setAttribute("class", style.postTableRow);

                    const id = document.createElement("th");
                    id.setAttribute("class", style.th);
                    id.innerText = res.data[i].id;
                    postTableRow.appendChild(id);

                    const memberId = document.createElement("th");
                    memberId.setAttribute("class", style.th);
                    memberId.innerText = res.data[i].member.memberId;
                    postTableRow.appendChild(memberId);

                    const title = document.createElement("th");
                    title.setAttribute("class", style.th);
                    title.innerText = res.data[i].title;
                    postTableRow.appendChild(title);

                    const postingDate = document.createElement("th");
                    postingDate.setAttribute("class", style.th);
                    postingDate.innerText = res.data[i].posting_date;
                    postTableRow.appendChild(postingDate);

                    const sharedNum = document.createElement("th");
                    sharedNum.setAttribute("class", style.th);
                    sharedNum.innerText = res.data[i].shared_num;
                    postTableRow.appendChild(sharedNum);

                    const view = document.createElement("th");
                    view.setAttribute("class", style.th);
                    view.innerText = res.data[i].view;
                    postTableRow.appendChild(view);

                    const postInfoButton = document.createElement("button");
                    postInfoButton.setAttribute("class", style.infoButton);
                    postInfoButton.innerText = "보기";
                    postInfoButton.onclick = () => {
                        navigate(`/postInfo/${res.data[i].id}`);
                    };
                    postTableRow.appendChild(postInfoButton);

                    postTableHead[0].appendChild(postTableRow);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getMember();
        getPost();
        checkToken();
    }, []);

    return (
        <div className={style.homeWrapper}>
            <h1>This is Home!!</h1>
            <h3>현재 로그인 되어있는 유저 : {memberId}</h3>
            <table className={style.memberTable}>
                <thead className={style.memberTableHead}>
                    <tr className={style.tr}>
                        <th className={style.th}>#(pk)</th>
                        <th className={style.th}>아이디</th>
                        <th className={style.th}>이름</th>
                        <th className={style.th}>닉네임</th>
                        <th className={style.th}>이메일</th>
                        <th className={style.th}>티어</th>
                        <th className={style.th}>가입일</th>
                        <th className={style.th}>정보 보기</th>
                        <th className={style.th}>팔로우</th>
                    </tr>
                </thead>
            </table>
            <p>==============================================</p>
            <table className={style.postTable}>
                <thead className={style.postTableHead}>
                    <tr className={style.tr}>
                        <th className={style.th}># (PK)</th>
                        <th className={style.th}>아이디</th>
                        <th className={style.th}>제목</th>
                        <th className={style.th}>작성날짜</th>
                        <th className={style.th}>공유 횟수</th>
                        <th className={style.th}>조회수</th>
                    </tr>
                </thead>
            </table>
            <button
                onClick={() => {
                    navigate(`/signUp`);
                }}
            >
                회원가입
            </button>
            <br />
            <br />
            <button
                onClick={() => {
                    navigate(`/login`);
                }}
            >
                로그인
            </button>
            <br />
            <br />
            <button
                onClick={() => {
                    navigate(`/post`);
                }}
            >
                글 작성
            </button>
        </div>
    );
}

export default Home;
