import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputAdornment,
  Link,
  TextField,
} from "@material-ui/core";
import styles from "./CustomDialog.module.css";

type Props = DialogProps & {
  link: string;
};

const CustomDialog: React.FC<Props> = (props) => {
  const { link, ...rest } = props;
  return (
    <>
      <Dialog {...rest}>
        <DialogTitle>{link}</DialogTitle>
      </Dialog>

      <Dialog
        {...rest}
        className={styles.dialog}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Link teilen</DialogTitle>
        <DialogContent className={styles.dialogRow}>
          <TextField
            defaultValue={link}
            onFocus={(event): void => {
              event.target.select();
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Link
                    className={styles.copyButton}
                    onClick={(): void => {
                      navigator.clipboard.writeText(link);
                    }}
                  >
                    Kopieren
                  </Link>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth={true}
            className={styles.linkField}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDialog;
