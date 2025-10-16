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
      <button className="modal-button" onClick={handleOpen}>
        {buttonLabel}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Grow in={open}>
          <div className="modal-box">
            <div className="modal-contentbox" style={contentBoxStyle}>
              <header className="modal-header">
                <h3>{title}</h3>
              </header>
              <div className="modal-main">{content}</div>
              <footer className="modal-footer">
                {result && (
                  <Button
                    variant="contined"
                    style={{
                      backgroundColor: "white",
                      color: "#2f4e70",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {result}
                  </Button>
                )}
                {end && (
                  <Button
                    variant="contined"
                    style={{
                      backgroundColor: "white",
                      color: "#2f4e70",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                    onClick={handleClose}
                  >
                    {end}
                  </Button>
                )}
              </footer>
            </div>
          </div>
        </Grow>
      </Modal>
    </div>
  );
};

export default BaseModal;
