import { useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

/* eslint-disable react/prop-types */
export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {

    const dispatch = useDispatch();
    
    // Asigno nota activa
    const onClickItem = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls}) );
    }
    // Mostrar titulos con tamaño limitado
    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title
    }, [title])


    return (
        <ListItem 
            disablePadding
            onClick={ onClickItem }
        >
            <ListItemButton >
                <ListItemIcon >
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } /> 
                    <ListItemText secondary={ body } /> 
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
