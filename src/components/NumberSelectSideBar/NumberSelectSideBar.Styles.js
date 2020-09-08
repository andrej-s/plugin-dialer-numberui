import { default as styled } from "react-emotion";
import {
  FlexBox,
  IconButton,
  getBackgroundWithHoverCSS,
} from "@twilio/flex-ui";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 11px 11px;
  box-sizing: border-box;
`;

export const Caption = styled("label")`
  display: block;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 1.6;
  letter-spacing: 2px;
  margin-top: 16px;
  margin-bottom: 8px;
  width: 100%;
`;

export const HeaderContainer = styled(FlexBox)`
  height: 56px;
  padding-left: 11px;
  padding-right: 11px;
  align-items: center;
`;

export const Text = styled(FlexBox)`
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 3px;
  justify-content: center;
  padding-right: 44px;
  text-transform: uppercase;
`;

export const NumberContainer = styled("div")`
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 14px;
`;

export const CallButton = styled(IconButton)`
  box-sizing: content-box;
  padding: 8px;
  margin-top: 14px;
  ${(p) => p.theme.Dialer.CallButton};
  ${(p) => p.disabled && p.theme.Dialer.CallButton.disabled};
  ${(p) =>
    getBackgroundWithHoverCSS(
      p.theme.Dialer.CallButton.backgroundColor,
      p.theme.Dialer.CallButton.lightHover,
      false,
      p.disabled
    )};
`;
