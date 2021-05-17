import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {Route, Router} from 'react-router-dom'
import Warehouses from "./Warehouses";
import Goods from "./Goods";

const headersData = [
    {
        label: "СКЛАДЫ",
        href: "/warehouses",
    },
    {
        label: "ТОВАРЫ",
        href: "/goods",
    },
    {
        label: "ПРОДАЖИ",
        href: "/sales",
    }
];

const useStyles = makeStyles(() => ({
    logo: {

        textAlign: "left",
    },
    menuButton: {

        marginLeft: "38px",
    },
    toolbar: {

        display: "flex",
        justifyContent: "space-between",

    },
    header: {
        backgroundColor: "#bcd0c7",

        display: "block",
        paddingRight: "40vw",
        paddingLeft: "1vw",
    },
}));

export default function Header() {
    const { header, logo, toolbar, menuButton } = useStyles();

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {femmecubatorLogo}
                <div className="cringeNav">{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const femmecubatorLogo = (
        <Typography variant="h5" component="h1" className={logo}>
            <img src={process.env.PUBLIC_URL + 'shrek.png'} alt="Logo" />
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                    <Button
                        {...{
                            key: label,
                            color: "inherit",
                            to: href,
                            component: RouterLink
                        }}
                    >
                        {label}
                    </Button>
            );
        });
    };

    return (
        <header>
            <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>

    );
}
