import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function MemberInfo() {
    const { id } = useParams();

    const getMemberInfo = () => {
        axios
            .get(`/api/members/${id}`)
            .then((res) => {
                console.log(res.data);
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
            <h2>id is {id}</h2>
        </div>
    );
}

export default MemberInfo;
