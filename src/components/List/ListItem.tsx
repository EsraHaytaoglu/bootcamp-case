
import { Button, formLabelClasses, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState,  FunctionComponent, useEffect, } from "react";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ListContent from "../List/ListContent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { List, ListForm } from "../../types/boards";
import { useDispatch } from "react-redux";
import { deleteList, getBoard, updateList } from "../../store/actions/BoardActions";
import { useParams } from "react-router-dom";


interface IListItemProps {
  list: any;
}



const ListItem: FunctionComponent<IListItemProps> = (props) => {
  const { list } = props;
  const dispatch = useDispatch();
  const {id} = useParams()
  const emptyForm: ListForm = {
    title: list.title,
    boardId: Number(id)
  };
  const [form, setForm] = useState<ListForm>(emptyForm);
  const [cardTitle, setCardTitle] = useState("");
  const [addCardTitleMode, setAddCardTitleMode] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleEditCardTitle = () => {
    setAddCardTitleMode(true);
  };
  const handleDeleteCardTitle = () => {
    setCardTitle("");
    setAddCardTitleMode(false);
  };
  const handleDeleteList = () => {
    dispatch(deleteList(Number(list.id)))
    dispatch(getBoard(Number(id)))
  }
  const handleEditListTitle = () => {
    dispatch(updateList(form, Number(list.id)))
    dispatch(getBoard(Number(id)))
    handleCloseEditModal() 
  }

  return (
    <>
      <Card
        sx={{ maxWidth: 345, m: 5, borderRadius: 3, borderColor: "grey.500" }}
      >
        <CardHeader
          action={
            <Box>
              <IconButton aria-label="more" onClick={handleOpenNavMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <IconButton size="small" disableRipple onClick={handleDeleteList}>
                    <DeleteIcon />
                    Delete List
                  </IconButton>
                </MenuItem>
                <MenuItem>
                  <IconButton
                    size="small"
                    onClick={handleOpenEditModal}
                    disableRipple
                  
                  >
                    <DriveFileRenameOutlineIcon  />
                    Rename List
                  </IconButton>
                </MenuItem>
              </Menu>
            </Box>
          }
          title={
            openEditModal ? (
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="list-title"
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  required
                  label="List title"
                  variant="standard"
                  sx={{ m: 0.5 }}
                ></TextField>
                <IconButton  onClick={handleEditListTitle}>
                <CheckIcon /></IconButton>
              </Box>
            ) : (
              list.title
            )
          }
        />

        <CardContent>
          <Paper style={{ maxHeight: 200, overflow: "auto" }}>
            <ListContent />
            <ListContent />
            <ListContent />
          </Paper>
        </CardContent>

        <Divider />
        {addCardTitleMode && (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="card-title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              required
              label="Card title"
              variant="standard"
              sx={{ m: 3 }}
            />
            <CloseIcon onClick={handleDeleteCardTitle} sx={{ mb: 3.5 }} />
          </Box>
        )}
        {cardTitle !== "" && addCardTitleMode && (
          <Button
            variant="contained"
            sx={{
              borderRadius: "8px",
              ml: 2,
              mb: 2,
              bgcolor: "text.secondary",
            }}
          >
            Add
          </Button>
        )}
        {!addCardTitleMode && (
          <CardActions disableSpacing>
            <IconButton
              aria-label="add a card"
              disableRipple
              onClick={handleEditCardTitle}
            >
              <AddIcon />
              <Typography color="text.secondary">add a card</Typography>
            </IconButton>
          </CardActions>
        )}
      </Card>
    </>
  );
}

export default ListItem;
