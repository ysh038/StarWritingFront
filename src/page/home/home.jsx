import style from "./home.module.css";
import axios from "axios";
import { useEffect } from "react";
function Home() {
    const memberList = document.getElementsByClassName(style.memberList);
    const tableHead = document.getElementsByClassName(style.tableHead);

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
                    memberInfoButton.innerText = "보기";
                    memberTableRow.appendChild(memberInfoButton);

                    tableHead[0].appendChild(memberTableRow);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getMember();
    }, []);

    return (
        <div className={style.homeWrapper}>
            <h1>This is Home!!</h1>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    <tr className={style.tr}>
                        <th className={style.th}>#(pk)</th>
                        <th className={style.th}>아이디</th>
                        <th className={style.th}>이름</th>
                        <th className={style.th}>닉네임</th>
                        <th className={style.th}>이메일</th>
                        <th className={style.th}>티어</th>
                        <th className={style.th}>가입일</th>
                        <th className={style.th}>정보 보기</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default Home;
