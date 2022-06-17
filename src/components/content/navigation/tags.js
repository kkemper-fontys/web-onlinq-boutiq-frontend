import {useFetch} from "../../../hooks/use-fetch";
import {useEffect, useState} from "react";

function Tags(props) {
    const {fetchData, loading} = useFetch();
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [hideTags, setHideTags] = useState(false);
    const [hiddenTags, setHiddenTags] = useState([]);

    // THIS FUNCTION CHECKS IF THE CLICKED TAG IS ALREADY HIGHLIGHTED, AND WILL DO THE OPPOSITE WITH IT
    const clickTagHandler = (id) => {
        if (!selectedTags.find((element) => element === id)) {
            setSelectedTags(selectedTags => [...selectedTags, id]);
        } else {
            const newData = selectedTags.filter((element) => {
                return element !== id;
            });
            setSelectedTags(newData);
        }
    }

    // THIS EFFECT TAKES PLACE WHEN THE TAG SELECTION CHANGES AND SENDS ITS DATA TO THE PARENT
    useEffect(() => {
        props.tagFilter(selectedTags);
    }, [selectedTags]);

    // THIS FUNCTION GETS THE TAG DATA FROM THE BACK-END
    const loadTags = async () => {
        const data = await fetchData('api/tags.json');
        setTags(data);
    }

    const loadHiddenTags = () => {
        setHideTags(!hideTags);
    }

    // THIS EFFECT LOADS THE TAGS ON PAGE LOAD
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
                {!loading && tags.map((tag, index) => {
                    let selected;
                    if (selectedTags.find((element) => element === tag.id)) {
                        selected = "selected";
                    }
                    if (index < 5) {
                        return <div className={`tag ${selected}`} key={tag.id}
                                    onClick={() => clickTagHandler(tag.id)}>{tag.name}</div>
                    }
                    if (index >= 5) {
                        //TODO TAGS VERBERGEN! 'hidden'
                        return <div className={`tag ${selected} ${hideTags ? "hidden" : ""}`} key={tag.id}
                                    onClick={() => clickTagHandler(tag.id)}>{tag.name}</div>
                    }
                })}
                {hiddenTags &&
                <div className={`tag main`} onClick={loadHiddenTags}>{hideTags ? "Laat alle tags zien" : "Verberg tags"}</div>
                }
            </div>
        </>
    );
}

export default Tags;