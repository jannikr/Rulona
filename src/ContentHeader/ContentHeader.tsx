import { Hidden, Toolbar, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styles from "./ContentHeader.module.css";

interface Props {
  heading: string;
  backLink: string;
  buttons?: JSX.Element[];
}

const ContentHeader: React.FC<Props> = (props) => {
  const { heading, backLink, buttons } = props;
  return (
    <Toolbar variant="dense" className={styles.toolbar}>
      <Hidden mdUp>
        <Link to={backLink} className={styles.backArrow}>
          <ArrowBackIos fontSize="small" />
        </Link>
      </Hidden>
      <Typography className={styles.heading}>{heading}</Typography>
      {buttons && <div className={styles.icons}>{buttons}</div>}
    </Toolbar>
  );
};

export default ContentHeader;
