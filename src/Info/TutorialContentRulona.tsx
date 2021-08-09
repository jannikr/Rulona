import TutorialContentBase from "./TutorialContentBase";
import styles from "./TutorialContentRulona.module.css";

const TutorialContentRulona: React.FC = () => {
  return (
    <TutorialContentBase
      heading="Rules of Corona"
      body="Alle aktuellen Corona-Regeln in einer App."
      imageSrc="/images/LogoWhite.svg"
      mobileContainerClassName={styles.backgroundColor}
      mobileImageClassName={styles.logo}
    />
  );
};

export default TutorialContentRulona;
