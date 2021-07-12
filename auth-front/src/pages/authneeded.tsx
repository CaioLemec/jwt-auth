import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext, signOut } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import styles from './home.module.scss'

export default function Authneeded() {
    const { user, signOut } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        roles: ['administrator','metrics.list']
    })

    useEffect(() => {
        api.get('/me').then( response => console.log(response))
    }, [])

    return (
        <div className={styles.container}>
        <h1>Successful authentication!</h1>
        <h1>{user.email}</h1>
        { userCanSeeMetrics && <div>Permission to see Metrics</div> }
        <Can permissions={['metrics.list']}>
            <div>Permission with components</div>
        </Can>
        <button onClick={signOut}>Sign Out</button>
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