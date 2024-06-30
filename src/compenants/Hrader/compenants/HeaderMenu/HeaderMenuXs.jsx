import style from './HeaderMenuXs.module.scss';

function HeaderMenuXs() {
  return (
    <ul className={`${style.MenuContainer} card p-20`}>
        <li>Wishlist</li>
        <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenuXs;