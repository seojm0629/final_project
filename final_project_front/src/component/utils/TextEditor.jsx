import axios from "axios";
import { useEffect, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/ImageResize", ImageResize);
import "react-quill/dist/quill.snow.css";
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
                imgTag.style.maxWidth = "200px";
                imgTag.style.height = "auto";
              }
              editor.setSelection(range.index + 1);
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
  useEffect(() => {
    const editor = editorRef.current.getEditor();
    if (!editor) {
      return;
    }
    // 현재 이미지 추출
    const getImageList = () =>
      Array.from(editor.root.querySelectorAll("img")).map((img) =>
        img.getAttribute("src")
      );
    let currentImages = getImageList();
    editor.on("text-change", () => {
      const newImages = getImageList();
      // 삭제된 이미지 감지
      const deletedImages = currentImages.filter(
        (src) => !newImages.includes(src)
      );
      deletedImages.forEach((src) => {
        const filename = src.split("/").pop();
        axios
          .delete(`${backServer}/freeBoard/image/${filename}`)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      });
      currentImages = newImages;
    });
  }, [backServer]);
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
