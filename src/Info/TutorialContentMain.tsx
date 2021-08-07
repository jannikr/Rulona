import { Hidden } from "@material-ui/core";
import styles from "./TutorialContentMain.module.css";

interface Props {
  heading: string;
  body: string;
  imageSrc: string;
}

const TutorialContentMain: React.FC<Props> = (props) => {
  const { heading, body, imageSrc } = props;
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
        <div className={styles.mobileFlex}>
          <img className={styles.mobileImage} src={imageSrc} />
          <h2>{heading}</h2>
          {body}
        </div>
      </Hidden>
    </>
  );
};

export default TutorialContentMain;
