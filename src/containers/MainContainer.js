import React, { useState, useEffect } from "react";
import StorySelect from "../components/StorySelect";


const MainContainer = () => {
    
    const [storiesId, setStoriesId] = useState([]);
    const [stories, setStories] = useState([]);
    const [searchedStories, setSearchedStories] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 


    useEffect(() => {
        if(searchInput.length > 0) {
          const state = [...stories];
          const filteredStories = state.filter((x) => x.title.includes(searchInput))
          setSearchedStories(filteredStories)
        } else {
            setSearchedStories([])
        }
        
    }, [searchInput])


    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(res => res.json())
        .then(data => setStoriesId(data));
    }, []);

    useEffect(()=> {
        getStories();
    }, [storiesId])

    const getStories = () => {
        const slicedStories = storiesId.slice(0, 10);
        const storyPromises = slicedStories.map((storyId) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then(res => res.json());
        })

        Promise.all(storyPromises)
        .then((data) => {
            setStories(data)
            
        })

        }
    
    return (
        <div>
            <h1>LatestStories:</h1>
            <input 
            type="text"
            placeholder="Search for a Story"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            />
            
            <StorySelect stories={ searchedStories.length > 0 ? searchedStories : stories}/>
        </div>
    )
};

export default MainContainer;