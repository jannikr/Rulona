import { Button, Dialog, DialogContent, Hidden, Link } from "@material-ui/core";
import { useState } from "react";
import TutorialContentPlace from "../Info/TutorialContentPlace";
import TutorialContentRoute from "../Info/TutorialContentRoute";
import styles from "./TutorialDialog.module.css";

const TutorialDialog: React.FC = () => {
  const [secondPage, setSecondPage] = useState(true);
  const [open, setOpen] = useState(true);

  const onClick = (): void => {
    if (secondPage) {
      setSecondPage(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <Hidden mdUp={true}>
      <Dialog open={open}>
        <DialogContent className={styles.dialogBox}>
          <div className={styles.flexGrow}>
            {secondPage ? <TutorialContentPlace /> : <TutorialContentRoute />}
          </div>
          <Button
            variant="contained"
            disableElevation
            className={styles.nextButton}
            color={"primary"}
            onClick={onClick}
          >
            {secondPage ? "Weiter" : "Starten"}
          </Button>
          {secondPage && (
            <Link
              className={styles.skipLink}
              onClick={(): void => setOpen(false)}
            >
              Überspringen
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </Hidden>
  );
};

export default TutorialDialog;
