import React from "react";

import { StyledSelect, Caption } from "./NumberSelect.Styles";
import MenuItem from "@material-ui/core/MenuItem";
import * as Flex from "@twilio/flex-ui";

// It is recommended to keep components stateless and use redux for managing states
const NumberSelect = (props) => {
  let callerIds = Flex.Manager.getInstance().workerClient.attributes.callerIds;

  return (
    <div>
      <Caption
        key="queue-select-caption"
        className="Twilio-OutboundDialerPanel-QueueSelect-Caption"
      >
        Caller Id
      </Caption>
      <StyledSelect
        value={props.phoneNumber || callerIds[0]}
        onChange={(e) => props.updateNumber(e.target.value)}
      >
        <MenuItem key="placeholder" value="placeholder" disabled>
          Caller Id
        </MenuItem>
        {callerIds.map((element) => (
          <MenuItem key={element} value={element}>
            {element}
          </MenuItem>
        ))}
      </StyledSelect>
    </div>
  );
};

export default NumberSelect;
