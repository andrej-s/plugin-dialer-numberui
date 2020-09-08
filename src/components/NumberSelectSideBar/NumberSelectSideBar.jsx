import React from "react";
import {
  Container,
  Caption,
  HeaderContainer,
  Text,
  NumberContainer,
  CallButton,
} from "./NumberSelectSideBar.Styles";
import NumberSelectContainer from "../NumberSelect/NumberSelect.Container";
import { Button, IconButton, SidePanel } from "@twilio/flex-ui";
import * as Flex from "@twilio/flex-ui";

// It is recommended to keep components stateless and use redux for managing states
const NumberSelectSideBar = (props) => {
  if (props.showSidebar) {
    return (
      <SidePanel
        displayName="test"
        HeaderComponent={
          <HeaderContainer noShrink noGrow>
            <IconButton
              key="close-button"
              icon="Close"
              hemeOverride={props.theme.Supervisor.TaskCanvas.HeaderButton}
              onClick={() => props.disableSideBar()}
            />
            <Text key="title">Outbound call</Text>
          </HeaderContainer>
        }
      >
        <Container>
          <Caption>Trying to call</Caption>
          <NumberContainer> {props.toPhoneNumber}</NumberContainer>
          <NumberSelectContainer />
          <CallButton
            key="call-button"
            icon="Call"
            disabled={false}
            themeOverride={props.theme && props.theme.Dialer.CallButton}
            onClick={() => {
              Flex.Actions.invokeAction("StartOutboundCall", {
                destination: props.toPhoneNumber,
                callerId: props.phoneNumber,
              });
              props.disableSideBar();
            }}
          >
            Call
          </CallButton>
        </Container>
      </SidePanel>
    );
  } else {
    return null;
  }
};

export default NumberSelectSideBar;
