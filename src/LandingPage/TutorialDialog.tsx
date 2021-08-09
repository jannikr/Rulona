import { Button, Dialog, Link } from "@material-ui/core";
import classnames from "classnames";
import { useState } from "react";
import TutorialContentPlace from "../Info/TutorialContentPlace";
import TutorialContentRoute from "../Info/TutorialContentRoute";
import TutorialContentRulona from "../Info/TutorialContentRulona";
import { DialogContent } from "../MaterialUIOverrides";
import styles from "./TutorialDialog.module.css";
import commonStyles from "../common.module.css";

const TutorialDialog: React.FC = () => {
  const [proceedable, setProceedable] = useState(true);
  const [firstPage, setFirstpage] = useState(true);
  const [open, setOpen] = useState(true);

  const closeTutorial = (): void => {
    setOpen(false);
    localStorage.setItem("tutorialSeen", "true");
  };

  const onClick = (): void => {
    if (firstPage) {
      setFirstpage(false);
    } else if (proceedable) {
      setProceedable(false);
    } else {
      closeTutorial();
    }
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        className={classnames(commonStyles.column, styles.dialogBox)}
      >
        {firstPage ? (
          <TutorialContentRulona />
        ) : (
          <>
            {proceedable ? <TutorialContentPlace /> : <TutorialContentRoute />}
          </>
        )}
        <Button variant="contained" color="primary" onClick={onClick}>
          {proceedable ? "Weiter" : "Starten"}
        </Button>
        <div className={styles.skipLinkContainer}>
          {proceedable && (
            <Link className={styles.skipLink} onClick={closeTutorial}>
              Überspringen
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
