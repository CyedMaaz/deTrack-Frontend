import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";
import CustomizedTables from "../Table/Index";

CustomizedTables.propTypes = {
  users: PropTypes.array.isRequired,
};

const retrieveData = async () => {
  const postsPromise = axios.get("https://jsonplaceholder.typicode.com/posts");
  const usersPromise = axios.get(
    "https://de-track-be-git-master-shahirs-projects.vercel.app/resource"
  );

  const [postsResponse, usersResponse] = await axios.all([
    postsPromise,
    usersPromise,
  ]);

  return {
    posts: postsResponse.data,
    users: usersResponse.data,
  };
};

const DisplayPosts = () => {
  const { data, error, isLoading } = useQuery("data", retrieveData);

  if (isLoading) return <div>Fetching data...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const { users, posts } = data;

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h2>User Information:</h2>
      <CustomizedTables users={users} />
    </div>
  );
};

export default DisplayPosts;
