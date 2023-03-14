import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./memberInfo.module.css";

function MemberInfo() {
    const { id } = useParams();
    const [memberInfo, setMemberInfo] = useState({});
    const [imgData, setImgData] = useState();

<<<<<<< HEAD
    const profileImg = document.getElementsByClassName(style.profileImg);
=======
    // const profileImg = document.getElementsByClassName(style.img);
    const pfImg = document.getElementsByClassName(style.pfImg);
>>>>>>> seungsu

    const getMemberInfo = () => {
        axios
            .get(`/api/members/${id}`)
            .then((res) => {
                setMemberInfo(res.data);
<<<<<<< HEAD
                if (
                    res.data.profileImage.originalFileName ===
                    "basicProfile.png"
                ) {
                    profileImg[0].setAttribute(
                        "src",
                        "http://127.0.0.1:8887/img/profileImg/basicProfile.png"
                    );
                } else {
                    profileImg[0].setAttribute(
                        "src",
                        "http://127.0.0.1:8887/members/" +
                            res.data.memberId +
                            "/profileImg/" +
                            res.data.profileImage.storeFileName
                    );
                }
=======
>>>>>>> seungsu
            })
            .catch((e) => {
                console.error(e);
            });
        
        const config = {
            responseType: 'blob',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };
        
        axios
            .get(`/api/members/${id}/profile`, config)
            .then((res) => {
                console.log(typeof (res.data));
                console.dir(res.data);
                setImgData(URL.createObjectURL(res.data));
            })
            .catch((e) => {
                console.error(e);
            })
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
<<<<<<< HEAD
            <img className={style.profileImg} alt="" />
=======
            {/* <img className={style.img} alt="" /> */}
            <img className={style.pfImg} alt="" src={imgData} />
>>>>>>> seungsu
        </div>
    );
}

export default MemberInfo;
