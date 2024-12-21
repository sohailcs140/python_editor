import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { eclipse } from "@uiw/codemirror-theme-eclipse";


export const ThemeMaped = {
    oneDark, dracula, eclipse
}

const BaseUrl = "http://127.0.0.1:8000"


export const BackendPaths = {
    configuration:`${BaseUrl}/configuration`,
    execute:`${BaseUrl}/execute`,
}


// Messages
export const DeleteFileMessage = "Are you sure you want to close the file?"
export const Python1PathMessage = "";
export const Python2PathMessage = ""