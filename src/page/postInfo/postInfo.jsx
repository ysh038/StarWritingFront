import style from "./postInfo.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostInfo() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState({});
    const [memberInfo, setMemberId] = useState({});

    const postImg = document.getElementsByClassName(style.postImg);

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

    useEffect(() => {
        getPostInfo();
    }, []);

    return (
        <div>
            <h1>Here is PostInfo Page.</h1>
            <p>id is {postInfo.id}</p>
            <p>memberId is {memberInfo.memberId}</p>
            <p>title is {postInfo.title}</p>
            <p>posting Date is {postInfo.posting_date}</p>
            <p>shared number is {postInfo.shared_num}</p>
            <p>view is {postInfo.view}</p>
            <img className={style.postImg} alt="" />
        </div>
    );
}

export default PostInfo;
