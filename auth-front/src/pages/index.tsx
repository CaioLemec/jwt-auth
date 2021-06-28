import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import styles from './home.module.scss'

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, isAuthenticated} = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    }
    await signIn(data);
  }

  return (
    <form className={styles.container}>
      <h2>Jason Web Token</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit} type="submit">Entrar</button>
    </form>
  )
}
