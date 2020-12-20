import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

import "./Editor.css";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import { IconButton } from "@material-ui/core";

//displayName has the title panel (HTML, CSS, JS)
function Editor(props) {
  //props destructure we need to send to codemirror
  const { language, displayName, value, onChange } = props;

  //Options for the ControlledEditor
  const options = {
    lineWrapping: true,
    lint: true,
    mode: language,
    theme: "material",
    lineNumbers: true,
  };

  //Check if the column is or not collapsed
  const [open, setOpen] = useState(true);

  //Get the editor changes
  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className={`editor__container ${open ? "" : "collapsed"} `}>
      <div className="editor__title">
        {displayName}
        <IconButton onClick={() => setOpen((prevOpen) => !prevOpen)}>
          <ZoomOutMapOutlinedIcon />
        </IconButton>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={options}
      ></ControlledEditor>
    </div>
  );
}

export default Editor;
