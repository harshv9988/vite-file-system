import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
} from '@mui/material';

const CustomPopover = ({ config = [], ...props }) => {
  return (
    <Popover {...props}>
      <List>
        {config.map((item) => {
          return (
            <ListItem
              disablePadding
              key={item.name}
              onClick={() => {
                item.onClick();
                props.onClose?.call();
              }}
            >
              <ListItemButton dense>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
};

export default CustomPopover;
