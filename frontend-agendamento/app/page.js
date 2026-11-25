
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>BarberTime</div>

        <nav className={styles.menu}>
          <a href="/">Início</a>
          <a href="/agendamento">Agendar</a>
          
          <a href="/login">Entrar</a>
          <a href="/cadastro">Cadastrar</a>
        </nav>
      </header>

      <main className={styles.conteudo}>
        <h1>Seu estilo começa aqui.</h1>

        <p>Agende seu horário de forma rápida e fácil.</p>

        <a href="/agendamento" className={styles.botao}>
          Agendar horário
        </a>
      </main>
    </div>
  );
}
