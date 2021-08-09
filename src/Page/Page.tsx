import { Grid, Hidden } from "@material-ui/core";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Page.module.css";

interface Props {
  mobileShowContent: boolean;
  contentClassName?: string;
}

const Page: React.FC<Props> = (props) => {
  const { mobileShowContent, contentClassName, children } = props;
  return (
    <Grid container spacing={0} className={styles.container}>
      <Hidden smDown={mobileShowContent}>
        <Grid className={styles.sidebar} item xs={12} md={3}>
          <Sidebar />
        </Grid>
      </Hidden>
      <Hidden smDown={!mobileShowContent}>
        <Grid item xs={12} md={9} className={contentClassName}>
          {children}
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Page;
