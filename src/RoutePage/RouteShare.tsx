import React from "react";
import { connect } from "react-redux";
import ShareDialog from "../RuleOverview/ShareDialog";
import { AppState } from "../store/types";

type Props = ReturnType<typeof mapStateToProps>;

const RouteShare: React.FC<Props> = (props) => {
  const { origin, destination } = props;

  return <ShareDialog path={`/route/${origin?.id}/${destination?.id}`} />;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { origin, destination } = state;
  return { origin, destination };
};

export default connect(mapStateToProps)(RouteShare);
