import "./App.css";
import { useTheme } from "./useTheme";

function App() {
  const { theme, setTheme } = useTheme();
  const onChange = (e: any) => {
    const value = e.target.value;
    setTheme(value);
  };
  return (
    <>
      <h2>{theme}</h2>
      <select value={theme} name="themes" onChange={onChange}>
        <option value="light">白色主题</option>
        <option value="dark">暗色主题</option>
        <option value="auto">跟随系统</option>
      </select>
    </>
  );
}

export default App;
