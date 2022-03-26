import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { names } from "./data";
import styled from "@emotion/styled";

const Names = styled.div`
  column-count: 7;
`;
const Input = styled.input`
  border: 4px solid indigo;
  margin: 30px auto;
  display: block;
  width: 300px;
  background-color: blue;
  height: 50px;
  color: black;
  &::placeholder {
    color: gray;
  }
`;
const Li = styled.li`
  list-style-type: none;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  color: green;
`;
function App() {
  const [data, setData] = useState(() => names);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("name") || "");
  const filteredNames = useMemo(
    () =>
      data.filter((name) => name.toLowerCase().includes(value.toLowerCase())),
    [data, value]
  );

  useEffect(() => {
    setSearchParams({ name: value });
  }, [value]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <div>
              <form>
                <Input
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  placeholder="Введите имя"
                />
              </form>
            </div>
            <Names>
              <ul>
                {filteredNames.map((name) => (
                  <Li key={name}>{name}</Li>
                ))}
              </ul>
            </Names>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
