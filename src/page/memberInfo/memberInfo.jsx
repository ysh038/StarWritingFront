import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./memberInfo.module.css";

function MemberInfo() {
    const { id } = useParams();
    const [memberInfo, setMemberInfo] = useState({});
    const [memberId, setMemberId] = useState("");
    const [imgData, setImgData] = useState();

    const token = localStorage.getItem("Authorization");

    const getMemberInfo = () => {
        axios
            .get(`/api/members/${id}`)
            .then((res) => {
                setMemberInfo(res.data);
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
            .get(`/api/members/${id}/image`, config)
            .then((res) => {
                console.log(typeof res.data);
                console.dir(res.data);
                setImgData(URL.createObjectURL(res.data));
            })
            .catch((e) => {
                console.error(e);
            });
    };
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

    useEffect(() => {
        getMemberInfo();
        checkToken();
    }, []);

    return (
        <div>
            <h1>Here is MemberInfo Page.</h1>
            <h3>현재 로그인 되어있는 유저 : {memberId}</h3>
            <p>id is {memberInfo.id}</p>
            <p>memberId is {memberInfo.memberId}</p>
            <p>name is {memberInfo.name}</p>
            <p>nickname is {memberInfo.nickname}</p>
            <p>tier is {memberInfo.tier}</p>
            <p>createDate is {memberInfo.createDate}</p>
            {/* <img className={style.img} alt="" /> */}
            <img className={style.pfImg} alt="" src={imgData} />
        </div>
    );
}

export default MemberInfo;
