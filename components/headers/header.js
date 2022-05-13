
import headerStyle from '../../public/styles/header.module.css'
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
export default function Header() {
  return (
  <div>
    <div className={headerStyle.logo}>     
    <img
              src={`${publicRuntimeConfig.MY_VAR}/Images/kotak.svg`}
       alt="Kotak Logo" />
    </div>
  </div>
  )
};
