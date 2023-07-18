import React from 'react';

const StorySelect = ({stories}) => {

    const handleChange = (event) => {
    const index = event.target.value;
    }

    const storyOptions = stories.map((story, index) => {
      return <li key={index}><a href={story.url}>{story.title}</a></li>
    });

    return (
       <ul>
        {storyOptions}
       </ul>
    )
  
}

export default StorySelect;