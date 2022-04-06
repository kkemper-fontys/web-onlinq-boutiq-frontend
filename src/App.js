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
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>

      <a className={"tag"}>Hoi kees</a>
      <span className={"badge badge--big"}>Sale</span>
      <button onClick={() => clickHandler()}>Ontdek meer</button>
    </div>
  );
}

export default App;