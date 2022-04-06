import {useFetch} from "../../hooks/use-fetch";
import {useEffect, useState} from "react";

function Tags() {
    const {fetchData, loading} = useFetch();
    const [tags, setTags] = useState([]);
    const clickTagHandler = async (id) => {
        const data = await fetchData(`tags/${id}`);
        console.log(data.description);
    }

    const loadTags = async () => {
        const data = await fetchData('tags');
        setTags(data);
    }

    useEffect(loadTags, []);

    return (
        <>
            <h4>Tags</h4>
            <div className={"tags"}>
                {loading && (
                    <div className={"spinner"}>
                        <i className={"fas fa-spinner fa-2x"}/>
                    </div>
                )}
                {!loading && tags.map((tag) => (
                    <div className={"tag"} key={tag.id} onClick={() => clickTagHandler(tag.id)}>{tag.name}</div>
                ))}
            </div>
        </>
    );
}

export default Tags;