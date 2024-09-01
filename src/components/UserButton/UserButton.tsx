import {CSSProperties} from "react";

const UserButton =({ text, backgroundColor = '#8e44ad', color = '#ffffff', size = 50 }) => {
    if (!text || typeof text !== 'string') {
        return null;
    }

    const firstLetter = text.charAt(0).toUpperCase();

    const styles:CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        color: color,
        width: size,
        height: size,
        borderRadius: '50%',
        fontSize: size / 2,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    };

    return <div style={styles}>{firstLetter}</div>;
};

export default UserButton;