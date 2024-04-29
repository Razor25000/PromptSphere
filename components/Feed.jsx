"use client";

// use client
import { useState } from "react";
import useSWR from 'swr';
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const fetcher = url => fetch(url).then(res => res.json());

const Feed = () => {
  const { data: allPosts, error } = useSWR('/api/prompt', fetcher);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
    return allPosts ? allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    ) : [];
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const value = e.target.value;
    setSearchText(value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        filterPrompts(value);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    filterPrompts(tagName);
  };

  if (error) return <div>Failed to load prompts.</div>;
  if (!allPosts) return <div>Loading prompts...</div>;

  // Filtered results based on search text
  const filteredResults = filterPrompts(searchText);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* Conditionally rendering prompts based on search */}
      <PromptCardList
        data={searchText.length > 0 ? filteredResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
