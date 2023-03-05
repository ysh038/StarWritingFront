import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./memberInfo.module.css";

function MemberInfo() {
    const { id } = useParams();
    const [memberInfo, setMemberInfo] = useState({});

    const profileImg = document.getElementsByClassName(style.img);

    const getMemberInfo = () => {
        axios
            .get(`/api/members/${id}`)
            .then((res) => {
                setMemberInfo(res.data);
                if (
                    res.data.profileImage.originalFileName ===
                    "basicProfile.png"
                ) {
                    profileImg[0].setAttribute(
                        "src",
                        "http://127.0.0.1:8887/basicProfile.png"
                    );
                } else {
                    profileImg[0].setAttribute(
                        "src",
                        "http://127.0.0.1:8887/" +
                            res.data.memberId +
                            "/" +
                            res.data.profileImage.storeFileName
                    );
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getMemberInfo();
    }, []);

    return (
        <div>
            <h1>Here is MemberInfo Page.</h1>
            <p>id is {memberInfo.id}</p>
            <p>memberId is {memberInfo.memberId}</p>
            <p>name is {memberInfo.name}</p>
            <p>nickname is {memberInfo.nickname}</p>
            <p>tier is {memberInfo.tier}</p>
            <p>createDate is {memberInfo.createDate}</p>
            <img className={style.img} alt="" />
        </div>
    );
}

export default MemberInfo;
