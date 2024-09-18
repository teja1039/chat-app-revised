const UserImg : ({imgUrl} : {imgUrl: string}) => JSX.Element = ({imgUrl}) => {
    return (
        <div className="image-container">
            <img src={imgUrl} alt="UserImg" className="user-image" />
        </div>
    );
}

export default UserImg;