import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { StyledToggleButton } from './style';

const CustomToggleButton = ({ config, ...props }) => {
  return (
    <ToggleButtonGroup {...props}>
      {config.map((item, index) => (
        <StyledToggleButton
          rank={index}
          length={config.length}
          key={item.value}
          value={item.value}
        >
          {item.name}
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;
