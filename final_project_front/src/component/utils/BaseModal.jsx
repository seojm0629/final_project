import { Button, Grow, Modal } from "@mui/material";
import { useState } from "react";
import "./baseModal.css";

const BaseModal = ({
  open,
  close,
  title,
  content,
  buttonLabel,
  contentBoxStyle,
  end,
  result,
}) => {
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen2(true);
  const handleClose = () => setOpen2(false);

  return (
    <div>
      <button className="modal-button" onClick={handleOpen}>
        {buttonLabel}
      </button>
      <Modal open={open2} onClose={close} style={{ zIndex: 100 }}>
        <Grow in={open2}>
          <div className="modal-box">
            <div className="modal-contentbox" style={contentBoxStyle}>
              <header className="modal-header">
                <h3>{title}</h3>
              </header>
              <div className="modal-main">{content}</div>
              <footer className="modal-footer">
                {result && (
                  <Button
                    variant="contained"
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
                    variant="contained"
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
