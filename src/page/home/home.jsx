import style from "./home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const postTableHead = document.getElementsByClassName(style.postTableHead);

    const memberTableHead = document.getElementsByClassName(
        style.memberTableHead
    );

    const navigate = useNavigate();

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

                    const memberId = document.createElement("th");
                    memberId.setAttribute("class", style.th);
                    memberId.innerText = res.data[i].memberId;
                    memberTableRow.appendChild(memberId);

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
                    memberInfoButton.innerText = "??????";
                    memberInfoButton.onclick = () => {
                        navigate(`/memberInfo/${res.data[i].id}`);
                    };
                    memberTableRow.appendChild(memberInfoButton);

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
                console.log(res.data);
                for (let i = 0; res.data[i] !== undefined; i++) {
                    const postTableRow = document.createElement("tr");
                    postTableRow.setAttribute("class", style.postTableRow);

                    const id = document.createElement("th");
                    id.setAttribute("class", style.th);
                    id.innerText = res.data[i].id;
                    postTableRow.appendChild(id);

                    const memberId = document.createElement("th");
                    memberId.setAttribute("class", style.th);
                    memberId.innerText = res.data[i].memberId.memberId;
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
                    postInfoButton.innerText = "??????";
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
    }, []);

    return (
        <div className={style.homeWrapper}>
            <h1>This is Home!!</h1>
            <table className={style.memberTable}>
                <thead className={style.memberTableHead}>
                    <tr className={style.tr}>
                        <th className={style.th}>#(pk)</th>
                        <th className={style.th}>?????????</th>
                        <th className={style.th}>??????</th>
                        <th className={style.th}>?????????</th>
                        <th className={style.th}>?????????</th>
                        <th className={style.th}>??????</th>
                        <th className={style.th}>?????????</th>
                        <th className={style.th}>?????? ??????</th>
                    </tr>
                </thead>
            </table>
            <p>==============================================</p>
            <table className={style.postTable}>
                <thead className={style.postTableHead}>
                    <tr className={style.tr}>
                        <th className={style.th}># (PK)</th>
                        <th className={style.th}>?????????</th>
                        <th className={style.th}>??????</th>
                        <th className={style.th}>????????????</th>
                        <th className={style.th}>?????? ??????</th>
                        <th className={style.th}>?????????</th>
                    </tr>
                </thead>
            </table>
            <button
                onClick={() => {
                    navigate(`/signUp`);
                }}
            >
                ????????????
            </button>
            <br />
            <br />
            <button
                onClick={() => {
                    navigate(`/login`);
                }}
            >
                ?????????
            </button>
            <br />
            <br />
            <button
                onClick={() => {
                    navigate(`/post`);
                }}
            >
                ??? ??????
            </button>
        </div>
    );
}

export default Home;
