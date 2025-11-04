import axios from "axios";
import { useEffect, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import "../free_board/freeBoard.css";

// ✅ 전역 등록 (quill-image-resize-module-react 내부에서 window.Quill을 사용함)
window.Quill = Quill;
Quill.register("modules/ImageResize", ImageResize);

const TextEditor = (props) => {
  const { data, setData, setFreeBoardThumbnail } = props;
  const editorRef = useRef(null);
  const backServer = import.meta.env.VITE_BACK_SERVER;

  const imageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;

      const form = new FormData();
      form.append("image", file);

      axios
        .post(`${backServer}/freeBoard/image`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          const imageUrl = `${backServer}/freeBoard/editor/${res.data}`;
          const editor = editorRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", imageUrl);
          editor.setSelection(range.index + 1);

          setTimeout(() => {
            const imgTag = editor.root.querySelector(`img[src="${imageUrl}"]`);
            if (!imgTag) return;

            imgTag.style.maxWidth = "200px";
            imgTag.style.height = "auto";
            imgTag.style.position = "relative";

            const wrapper = document.createElement("span");
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "×";
            deleteBtn.style.position = "absolute";
            deleteBtn.style.top = "0";
            deleteBtn.style.right = "0";
            deleteBtn.style.background = "rgba(0,0,0,0.5)";
            deleteBtn.style.color = "#fff";
            deleteBtn.style.border = "none";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.fontSize = "14px";
            deleteBtn.style.borderRadius = "50%";
            deleteBtn.style.width = "20px";
            deleteBtn.style.height = "20px";

            imgTag.parentNode.insertBefore(wrapper, imgTag);
            wrapper.appendChild(imgTag);
            wrapper.appendChild(deleteBtn);

            // ✅ 이미지 삭제 이벤트
            deleteBtn.onclick = () => {
              wrapper.remove();
              const filename = imageUrl.split("/").pop();
              axios
                .delete(`${backServer}/freeBoard/image/${filename}`)
                .then(() => console.log("이미지 삭제 성공"))
                .catch((err) => console.error("이미지 삭제 실패", err));
            };
          }, 200);

          if (setFreeBoardThumbnail) {
            setFreeBoardThumbnail(imageUrl);
          }
        })
        .catch((err) => console.error("이미지 업로드 실패", err));
    };
  };

  // ✅ 에디터에서 수동 삭제 감지
  useEffect(() => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    const getImageList = () =>
      Array.from(editor.root.querySelectorAll("img")).map((img) =>
        img.getAttribute("src")
      );

    let currentImages = getImageList();

    editor.on("text-change", () => {
      const newImages = getImageList();
      const deletedImages = currentImages.filter(
        (src) => !newImages.includes(src)
      );
      deletedImages.forEach((src) => {
        if (!src) return;
        const filename = src.split("/").pop();
        axios
          .delete(`${backServer}/freeBoard/image/${filename}`)
          .then(() => console.log("삭제된 이미지:", filename))
          .catch((err) => console.error("삭제 실패", err));
      });
      currentImages = newImages;
    });
  }, [backServer]);

  // ✅ Quill 모듈 설정
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
        handlers: { image: imageHandler },
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
        border: "1px solid #2f4e70",
        color: "#fff",
        minHeight: 400,
        borderRadius: 5,
      }}
    />
  );
};

export default TextEditor;
