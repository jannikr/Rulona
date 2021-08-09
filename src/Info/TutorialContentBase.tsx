import { Hidden } from "@material-ui/core";
import classnames from "classnames";
import styles from "./TutorialContentBase.module.css";

interface Props {
  heading: string;
  body: string;
  imageSrc: string;
  imageSrcSet?: string;
  mobileContainerClassName?: string;
  mobileImageClassName?: string;
}

const TutorialContentBase: React.FC<Props> = (props) => {
  const {
    heading,
    body,
    imageSrc,
    imageSrcSet,
    mobileContainerClassName,
    mobileImageClassName,
  } = props;
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
        <div
          className={classnames(
            styles.mobileImageOuter,
            mobileContainerClassName
          )}
        >
          <img
            sizes="(max-width: 1400px) 100vw, 1400px"
            className={classnames(styles.mobileImage, mobileImageClassName)}
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

export default TutorialContentBase;
