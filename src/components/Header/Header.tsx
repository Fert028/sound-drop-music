import s from  "./Header.module.scss";
import Logo from "../Logo/Logo";
import Box from "../Box/Box";

export default function Header() {
  return (
    <header className={s.header}>
      <Box>
        <Logo size={72}></Logo>
        Sound Drop Music
      </Box>
    </header>
  )
}
