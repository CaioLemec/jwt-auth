import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import styles from './home.module.scss'

export default function Authneeded() {
    const { user } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        roles: ['administrator','metrics.list']
    })

    useEffect(() => {
        api.get('/me').then( response => console.log(response))
    }, [])

    return (
        <div className={styles.container}>
        <h1>Usuário só acessa com autenticação bem sucedida.</h1>
        <h1>{user?.email}</h1>
        { userCanSeeMetrics && <div>Permission to see Metrics</div> }
        </div>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');

    return {
      props: {}
    }
  });