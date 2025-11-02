import axios from "axios";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
Quill.register("modules/ImageResize", ImageResize);
import "../free_board/freeBoard.css";
const TextEditor = (props) => {
  const data = props.data;
  const setData = props.setData;
  const editorRef = useRef(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const setFreeBoardThumbnail = props.setFreeBoardThumbnail; //썸네일 컬럼에 들어갈 경로
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const files = input.files;
      if (files.length !== 0) {
        const form = new FormData();
        form.append("image", files[0]);
        axios
          .post(`${backServer}/freeBoard/image`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const imageUrl = `${backServer}/freeBoard/editor/${res.data}`;
            const originalImage = `/freeBoard/editor/${res.data}`;
            const editor = editorRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", imageUrl);
            editor.setSelection(range.index + 1);
            setTimeout(() => {
              //dom 이후 크기 조절
              const imgTag = editor.root.querySelector(
                `img[src="${imageUrl}"]`
              );
              if (imgTag) {
                imgTag.style.width = "300px";
                imgTag.style.height = "auto";
              }
            });
            console.log(form);
            console.log(imageUrl);
            if (setFreeBoardThumbnail !== null) {
              setFreeBoardThumbnail(imageUrl);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "link"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);
  return (
    <ReactQuill
      ref={editorRef}
      value={data}
      onChange={setData}
      theme="snow"
      modules={modules}
      style={{
        backgroundColor: "",
        border: "1px solid #2f4e70",
        color: "#fff",
        height: "100%",
        minHeight: 400,
        borderRadius: 5,
      }}
    ></ReactQuill>
  );
};

export default TextEditor;
