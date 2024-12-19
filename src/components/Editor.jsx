// Editor.jsx
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";

const EditorComponent = ({ file, onContentChange }) => {
  return (
    <div className="flex-1 overflow-hidden">
      <CodeMirror
        value={file?.content || ""}
        extensions={[python()]}
        theme={dracula}
        onChange={onContentChange}
      />
    </div>
  );
};

export default EditorComponent;
