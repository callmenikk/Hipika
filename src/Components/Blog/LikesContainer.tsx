import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface LikeProps {
  likes: { _id: string }[];
  blogId: string;
  toggleMenu: () => void;
}

const LikesContainer: FC<LikeProps> = ({ likes, blogId, toggleMenu }) => {
  const [userLiked, setUserLiked] = useState(false);
  const tokenAuth: string = JSON.parse(localStorage.getItem('authToken')!)

  useEffect(() => {
    if (likes.some((e) => e._id === tokenAuth)) setUserLiked(true);
  }, []);

  return (
    <div className="bottom-stuff">
      <div className="likes-container">
        <p onClick={toggleMenu}>
          Likes:{" "}
          {likes.some((e) => e._id === tokenAuth) && userLiked
            ? likes.length
            : likes.some((e) => e._id === tokenAuth) && !userLiked
            ? likes.length - 1
            : !likes.some((e) => e._id === tokenAuth) && userLiked
            ? likes.length + 1
            : likes.length}
        </p>
        <button
          className="add-like"
          onClick={() => {
            axios
              .put(`http://localhost:5000/blog/${blogId}/liked/${tokenAuth}`)
              .then((response) => {
                if (response.data.success) setUserLiked(!userLiked);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            size={"2x"}
            color={userLiked ? "#ff4040" : "#000"}
          />
        </button>
      </div>
    </div>
  );
};

export default LikesContainer;
