import TutorialContentMain from "./TutorialContentMain";

const TutorialContentRoute: React.FC = () => {
  return (
    <TutorialContentMain
      heading="Plane deine Route"
      body="Komme sorgenfrei und sicher an dein Ziel. Rulona warnt dich vor Risiko-Gebieten auf deiner geplanten Route."
      imageSrc="/images/tutorialImage2_rzmiur_c_scale,w_1400.png"
      imageSrcSet="/images/tutorialImage2_rzmiur_c_scale,w_200.png 200w,
      /images/tutorialImage2_rzmiur_c_scale,w_941.png 941w,
      /images/tutorialImage2_rzmiur_c_scale,w_1400.png 1400w"
    />
  );
};

export default TutorialContentRoute;
