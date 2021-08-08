import { Hidden } from "@material-ui/core";
import classnames from "classnames";
import styles from "./TutorialContentMain.module.css";

interface Props {
  heading: string;
  body: string;
  imageSrc: string;
  imageSrcSet?: string;
  className?: string;
  className2?: string;
}

const TutorialContentMain: React.FC<Props> = (props) => {
  const { heading, body, imageSrc, imageSrcSet, className, className2 } = props;
  return (
    <>
      <Hidden smDown>
        <div className={styles.desktopBody}>
          <h2 className={styles.desktopHeading}>{heading}</h2>
          {body}
        </div>
        <img
          sizes="(max-width: 1400px) 100vw, 1400px"
          className={styles.desktopImage}
          srcSet={imageSrcSet}
          src={imageSrc}
          alt=""
        />
      </Hidden>
      <Hidden mdUp>
        <div className={classnames(styles.mobileImageOuter, className)}>
          <img
            sizes="(max-width: 1400px) 100vw, 1400px"
            className={classnames(styles.mobileImage, className2)}
            srcSet={imageSrcSet}
            src={imageSrc}
            alt=""
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
