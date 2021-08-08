import TutorialContentMain from "./TutorialContentMain";
import styles from "./TutorialContentRulona.module.css";

const TutorialContentRulona: React.FC = () => {
  return (
    <TutorialContentMain
      heading="Rules of Corona"
      body="Alle aktuellen Corona-Regeln in einer App."
      imageSrc="/images/LogoWhite.svg"
      className={styles.backgroundColor}
      className2={styles.logo}
    />
  );
};

export default TutorialContentRulona;
