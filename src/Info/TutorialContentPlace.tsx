import TutorialContentMain from "./TutorialContentMain";

const TutorialContentPlace: React.FC = () => {
  return (
    <TutorialContentMain
      heading="Finde Orte und Regeln"
      body="Finde deinen Wohnort und sehe auf einen Blick, welche Regeln und Vorschriften für dich gelten."
      imageSrc="/images/tutorialImage1_cpvsxd_c_scale,w_1400.png"
      imageSrcSet="/images/tutorialImage1_cpvsxd_c_scale,w_200.png 200w,
      /images/tutorialImage1_cpvsxd_c_scale,w_936.png 936w,
      /images/tutorialImage1_cpvsxd_c_scale,w_1400.png 1400w"
    />
  );
};

export default TutorialContentPlace;
