import "./App.css";
import React, { useEffect, useState } from "react";
import Editor from "./Editor.js";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  //For avoid immediately render the code in the frames, set a timeout each time there is some changes on them
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
    }, 500);

    //Avoid rendering timeouts constatly in each change, like this only one will be active
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="panel top__panel">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        ></Editor>
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        ></Editor>
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        ></Editor>
      </div>

      <div className="panel">
        <iframe
          srcDoc={srcDoc}
          frameBorder="0"
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </>
  );
}

export default App;
