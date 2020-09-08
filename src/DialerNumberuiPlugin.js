import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";
import NumberSelectContainer from "./components/NumberSelect/NumberSelect.Container";
import NumberSelectSideBarContainer from "./components/NumberSelectSideBar/NumberSelectSideBar.Container";
import reducers, { namespace } from "./states";
import { Actions } from "./states/NumberSelectState";
const PLUGIN_NAME = "DialerNumberuiPlugin";

export default class DialerNumberuiPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    this.dispatch(
      Actions.setAutoInvalidate(
        manager.workerClient.attributes.autoInvalidate ?? true
      )
    );

    flex.OutboundDialerPanel.Content.add(
      <NumberSelectContainer key="number-selector" />,
      { sortOrder: 1 }
    );

    flex.MainContainer.Content.add(
      <NumberSelectSideBarContainer key="numberSidebar" />,
      {
        align: "end",
      }
    );

    flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {
      return new Promise((resolve, reject) => {
        if (payload.callerId) {
          resolve(payload.callerId);
          return;
        }

        if (
          !manager.store.getState()["dialer-numberui"].NumberSelect.isConfirmed
        ) {
          this.dispatch(Actions.setToNumber(payload.destination));
          this.dispatch(Actions.enableSideBar());
          reject("CallerId not confirmed, will show interface");
        }
        resolve(
          manager.store.getState()["dialer-numberui"].NumberSelect.phoneNumber
        );
      }).then((callerId) => {
        original({ ...payload, callerId: callerId });
        this.dispatch(Actions.invalidateNumber());
      });
    });

    flex.Actions.on("afterToggleOutboundDialer", () => {
      if (manager.store.getState()["flex"].view.isOutboundDialerOpen) {
        this.dispatch(Actions.disableSideBar());
        this.dispatch(Actions.validateNumber());
      }
    });
  }

  dispatch = (f) => Flex.Manager.getInstance().store.dispatch(f);

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
