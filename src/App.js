import './scss/app.scss';
import {useFetch} from "./hooks/use-fetch";
import {useState} from "react";

function App() {
  const {fetchData, loading} = useFetch();
  const [tags, setTags] = useState([]);
  const clickTagHandler = async (id) => {
    const data = await fetchData(`tags/${id}`);
    console.log(data.description);
  }

  const clickHandler = async () => {
    const data = await fetchData('tags');
    setTags(data);
  }

  return (
    <div className="App">
      {tags.map((tag) => (
        <button key={tag.id} onClick={() => clickTagHandler(tag.id)}>Click {tag.id}!</button>
      ))}
      <button onClick={() => clickHandler()}>Click me!</button>
    </div>
  );
}

export default App;