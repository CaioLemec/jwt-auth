import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import styles from './home.module.scss'

export default function Authneeded() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get('/me').then( response => console.log(response))
    }, [])

    return (
        <div className={styles.container}>
        <h1>Usuário só acessa com autenticação bem sucedida.</h1>

        </div>
    );
}