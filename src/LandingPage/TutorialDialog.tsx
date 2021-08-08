import { Button, Dialog, Link } from "@material-ui/core";
import { useState } from "react";
import TutorialContentPlace from "../Info/TutorialContentPlace";
import TutorialContentRoute from "../Info/TutorialContentRoute";
import TutorialContentRulona from "../Info/TutorialContentRulona";
import { DialogContent } from "../MaterialUIOverrides";
import styles from "./TutorialDialog.module.css";

const TutorialDialog: React.FC = () => {
  const [proceedable, setProceedable] = useState(true);
  const [firstPage, setFirstpage] = useState(true);
  const [open, setOpen] = useState(true);

  const onClick = (): void => {
    if (firstPage) {
      setFirstpage(false);
    } else if (proceedable) {
      setProceedable(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className={styles.dialogBox}>
        {firstPage ? (
          <TutorialContentRulona />
        ) : (
          <>
            {proceedable ? <TutorialContentPlace /> : <TutorialContentRoute />}
          </>
        )}
        <Button
          variant="contained"
          className={styles.nextButton}
          color={"primary"}
          onClick={onClick}
        >
          {proceedable ? "Weiter" : "Starten"}
        </Button>
        <div className={styles.skipLinkContainer}>
          {proceedable && (
            <Link
              className={styles.skipLink}
              onClick={(): void => setOpen(false)}
            >
              Überspringen
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
