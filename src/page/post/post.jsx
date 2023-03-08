import style from "./post.module.css";

function Post() {
    return (
        <div className={style.postWrapper}>
            <form
                className={style.postForm}
                action="/api/posts"
                method="post"
                enctype="multipart/form-data"
            >
                <div className={style.formGroup}></div>
                <label for="title">제목 : </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목을 입력하세요."
                    width="200px"
                />
                <br />
                <br />
                <label for="member">member ID : </label>
                <input
                    type="text"
                    id="member"
                    name="member"
                    placeholder="ID를 입력하세요"
                    width="200px"
                />
                <br />
                <br />
                <label for="mainText">내용 : </label>
                <input
                    type="text"
                    id="mainText"
                    name="mainText"
                    width="400px"
                />
                <br />
                <br />
                <input type="file" name="file" />
                <br />
                <br />
                <br />
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default Post;
