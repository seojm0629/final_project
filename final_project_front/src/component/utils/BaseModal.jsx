import { Button, Grow, Modal, Slide } from "@mui/material";
import { useState } from "react";
import "./baseModal.css";

const BaseModal = ({
  title,
  content,
  buttonLabel,
  contentBoxStyle,
  end,
  result,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>{buttonLabel}</button>
      <Modal open={open} onClose={handleClose}>
        <Grow in={open}>
          <div className="modal-box">
            <div className="modal-contentbox" style={contentBoxStyle}>
              <header className="modal-header">
                <h3>{title}</h3>
              </header>
              <div className="modal-main">{content}</div>
              <footer className="modal-footer">
                <Button
                  variant="contined"
                  style={{
                    backgroundColor: "white",
                    color: "#2f4e70",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  onClick={handleClose}
                >
                  {result}
                </Button>
                <Button
                  variant="contined"
                  style={{
                    backgroundColor: "white",
                    color: "#2f4e70",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                  onClick={handleClose}
                >
                  {end}
                </Button>
              </footer>
            </div>
          </div>
        </Grow>
      </Modal>
    </div>
  );
};

export default BaseModal;
