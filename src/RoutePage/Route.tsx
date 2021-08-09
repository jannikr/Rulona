import { AppState } from "../store/types";
import { Polyline } from "@react-google-maps/api";
import { connect } from "react-redux";
import _ from "lodash";

type Props = ReturnType<typeof mapStateToProps> & {
  zIndex?: number;
};

const Route: React.FC<Props> = (props) => {
  const { route, zIndex } = props;

  const outerOptions = {
    strokeColor: "#185ABC",
    strokeOpacity: 1,
    strokeWeight: 7,
    zIndex: !_.isNil(zIndex) ? zIndex : 0,
  };

  const innerOptions = {
    ...outerOptions,
    strokeColor: "#669DF6",
    strokeWeight: outerOptions.strokeWeight - 2,
    zIndex: outerOptions.zIndex + 1,
  };

  return (
    <>
      <Polyline path={route} options={outerOptions} />
      <Polyline path={route} options={innerOptions} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { route } = state;
  return { route };
};

export default connect(mapStateToProps)(Route);
