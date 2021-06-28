import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from './home.module.scss'

export default function Authneeded() {
    const { user } = useContext(AuthContext);
    return (
        <div className={styles.container}>
        <h1>Usuário só acessa com autenticação bem sucedida.</h1>
        <h2>{user.email}</h2>
        </div>
    );
}