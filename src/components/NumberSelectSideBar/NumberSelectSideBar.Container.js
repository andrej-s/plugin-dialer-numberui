import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Actions } from "../../states/NumberSelectState";
import NumberSelectSideBar from "./NumberSelectSideBar";

const mapStateToProps = (state) => ({
  phoneNumber: state["dialer-numberui"].NumberSelect.phoneNumber,
  toPhoneNumber: state["dialer-numberui"].NumberSelect.toPhoneNumber,
  showSidebar: state["dialer-numberui"].NumberSelect.showSidebar,
});

const mapDispatchToProps = (dispatch) => ({
  disableSideBar: bindActionCreators(Actions.disableSideBar, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberSelectSideBar);
