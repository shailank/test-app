import Layout from "@/components/layout";
import Container from "@mui/material/Container";
import styles from "../public/styles/response.module.css";
import { useRouter } from "next/router";
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()

export default function Custom404() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 1000);

  return (
    <div>
      <Layout title="Page Not Found"></Layout>
      <Container maxWidth="xs" className={styles.w330}>
        <div className={styles.adjustTop}>
        <img
               src={`${publicRuntimeConfig.MY_VAR}/Images/error.svg`} alt="Server Error" />
          <h3>404 - Page not found</h3>
        </div>
      </Container>
    </div>
  );
}
