import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LikedLists from "./LikedLists";
import LikesContainer from "./LikesContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import "../../less/dashboard-style/loader.css";
import "../../less/blog-styles/blog-styles.css";

interface blogProps {
  user_id: string;
  blog: {
    img: string;
    title: string;
    main_content: string;
    blog_id: string;
    likes: { _id: string }[];
  };
}

export const defaultState: blogProps = {
  user_id: "",
  blog: {
    img: "",
    title: "",
    main_content: "",
    blog_id: "",
    likes: [],
  },
};

const Blog = () => {
  const { id } = useParams();
  const [currBlog, setCurrBlogs] = useState<blogProps>(defaultState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedMenu, setLikedMenu] = useState<boolean>(false);
  const authToken = JSON.parse(localStorage.getItem('authToken') as string)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:5000/blog/${id}`)
      .then((response) => {
        setCurrBlogs({
          user_id: response.data.userID,
          blog: {
            title: response.data.blog.title,
            likes: response.data.blog.likes,
            img: response.data.blog.file,
            main_content: response.data.blog.mainContent,
            blog_id: response.data._id,
          },
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    document.title = currBlog.blog.title === '' ? "Hipika" : `Hipika - ${currBlog.blog.title}`
  }, [currBlog])

  return (
    <>
      {likedMenu ? (
        <LikedLists
          toggleMenu={() => setLikedMenu(!likedMenu)}
          likes={currBlog.blog.likes}
        />
      ) : null}
      {isLoading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        <main>
          <div className="blog-photo">
            <img src={`/uploads/${currBlog.blog.img}`} alt="" />
            <div className="glass"></div>
            <LikesContainer
              toggleMenu={() => setLikedMenu(!likedMenu)}
              likes={currBlog.blog.likes}
              blogId={currBlog.blog.blog_id}
            />
          </div>
          <div className="main-text">
          {
              currBlog.user_id === authToken ?
              <button className="edit-btn" onClick={() => navigate(`/edit/${currBlog.blog.blog_id}`)}>
                Edit
                <FontAwesomeIcon icon={faEdit}/>
              </button>
            : null
            }
                  <h1>{currBlog.blog.title}</h1>
            <p className="textarea">{currBlog.blog.main_content}</p>
          </div>
        </main>
      )}
    </>
  );
};
export default Blog;
