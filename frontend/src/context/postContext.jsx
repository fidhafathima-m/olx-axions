import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostContext = createContext();

export const PostProvider = ({children}) => {
    const navigate = useNavigate();
    const [post, setPost] = useState();

    const addPost = (data) => {
        setPost(data);
        navigate('/view_post');
    }

    return (
        <PostContext.Provider value={{post, addPost}}>
            {children}
        </PostContext.Provider>
    )
}
export const usePost = () => useContext(PostContext);