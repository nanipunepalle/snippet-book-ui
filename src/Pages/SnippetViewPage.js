import React from 'react';

import HomeCard from '../Components/HomeCard';


export default function SnippetViewPage(props) {
    // const token = localStorage.getItem('token');
    const id = props.match.params.id;
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/get_post?id=' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(value => {
                    setPost(value[0])
                })
            }
        })
    }, [id])

    return (
        <div>
            {post !== undefined && post !== null && post !== {} && <HomeCard post={post}></HomeCard>}
        </div>
    );
}