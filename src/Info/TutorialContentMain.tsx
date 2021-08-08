import { Hidden } from "@material-ui/core";
import classnames from "classnames";
import styles from "./TutorialContentMain.module.css";

interface Props {
  heading: string;
  body: string;
  imageSrc: string;
  className?: string;
  className2?: string;
}

const TutorialContentMain: React.FC<Props> = (props) => {
  const { heading, body, imageSrc, className, className2 } = props;
  return (
    <>
      <Hidden smDown>
        <div className={styles.desktopBody}>
          <h2 className={styles.desktopHeading}>{heading}</h2>
          {body}
        </div>
        <img className={styles.desktopImage} src={imageSrc} />
      </Hidden>
      <Hidden mdUp>
        <div className={classnames(styles.mobileImageOuter, className)}>
          <img
            className={classnames(styles.mobileImage, className2)}
            src={imageSrc}
          />
        </div>
        <div className={styles.mobileText}>
          <h2>{heading}</h2>
          {body}
        </div>
      </Hidden>
    </>
  );
};

export default TutorialContentMain;
