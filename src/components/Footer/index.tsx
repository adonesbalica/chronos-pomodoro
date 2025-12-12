import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <h1 className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Entenda a técnica pomodoro 🍅
      </RouterLink>
      <RouterLink href='/'>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </RouterLink>
    </h1>
  );
}
