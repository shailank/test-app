/* eslint-disable @next/next/no-img-element */
import Container from "@material-ui/core/Container";
import styles from "../public/styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@mui/material/Typography";
import Header from "./headers/header";
import Footer from "./footer/footer";
import Form from "./popup/popup-manager";
import { Stepper } from "@material-ui/core";
import { useState } from "react";
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()


const itemData = [
    {
        img: '/Images/active_reward_mode.png',
        title: ' Activate reward mode',
        text: 'Load 500 reward points instantly on card activation'
    },
    {
        img: '/Images/convert_to_cash.png',
        title: ' Convert to cash',
        text: 'Withdraw cash interest-free until 48 days'
    },
    {
        img: '/Images/swipe_and_shine.png',
        title: ' Swipe and Shine',
        text: 'Get 1 reward point on every ₹100 spent offline'
    },
    {
        img: '/Images/spend_and_score.png',
        title: ' Spend and Score',
        text: 'Rake in 2x rewards on every ₹100 spent online'
    },
    {
        img: '/Images/tank_full_bonus.png',
        title: ' Tank-full bonus',
        text: 'Earn 1% across all petrol pumps'
    },
    {
        img: '/Images/there_is_always_more.png',
        title: ' There is always more',
        text: 'Win 4 free PVR tickets or ₹750 cashback on spending ₹75,000 annually'
    },

];

const cardData = [
  {
    seq: "1",
    title: " Sign up for evergreen rewards",
    text: "Earn reward points with every purchase made using credit cards. Easily redeem accumulated reward points to make another purchase",
  },
  {
    seq: "2",
    title: " Boost your card rating",
    text: "Build an impressive credit rating by re-paying your credit card bills on time. The higher your credit score, the easier it is to avail low-interest loans.",
  },
  {
    seq: "3",
    title: " Win cashbacks and discounts",
    text: "Enjoy cashbacks on select purchases when you shop using your credit card. Some merchants also offer special discounts on credit card purchases",
  },
  {
    seq: "4",
    title: " Load in and redeem frequent-flyer miles",
    text: "Collect frequent-flyer miles with every air ticket purchase. Redeem the accumulated frequent-flyer miles against the price of another ticket.",
  },
  {
    seq: "5",
    title: " Transcat universally",
    text: "Ditch the trouble of ‘debit card declined’. Use a credit card that is universally accepted when you travel abroad. ",
  },
  {
    seq: "6",
    title: " Spend worry-free",
    text: "With customer-friendly repayment modes, credit cards make spending easier and shopping fun. ",
  },
];

export default function HomePage() {
  const [state, setState] = useState(0);
  const setStateToZero = () => {
    setState(0);
  };

  const MoveToNextStep = () => {
    setState((prevStep) => prevStep + 1);
  };
  function handleOnceClick() {
    sessionStorage.clear();
    MoveToNextStep();
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Stepper activeStep={state}></Stepper>
      <div className={styles.headerLogo}>
        <Header />
      </div>
      <Box xs={12} className={styles.homeStyle}>
        <Grid item container className={styles.px170}>
          <Grid item={true} xs={10} md={10}>
            <Grid item container xs={12}>
              <Grid item={true} xs={12}>
                <span className={styles.YourCreditCardAwaitsYou}>
                  Your 811 Credit Card
                </span>
              </Grid>
              <Grid item={true} xs={12}>
                <span className={styles.YourCreditCardAwaitsYou}>
                  awaits you
                </span>
              </Grid>
              <Grid item={true} xs={12} md={6} style={{ paddingTop: 15 }}>
                <Typography
                  className={styles.headtextbelowicon}
                  variant="subtitle2"
                  component="div"
                  style={{ fontSize: "16px" }}
                >
                  <span>
                    It's time to unlock the power of spending big monies,
                    scoring huge point and enjoying all year!
                  </span>
                </Typography>
              </Grid>
              <Grid item={true} xs={12}>
                <Typography
                  className={styles.textbelowicon}
                  variant="subtitle1"
                  gutterBottom
                ></Typography>
              </Grid>

              <Grid item={true} xs={12}>
                {state > 0 ? (
                  <Form
                    state={state}
                    moveToNextStep={MoveToNextStep}
                    SetStateToZero={setStateToZero}
                  />
                ) : (
                  ""
                )}
                <Button
                  variant="contained"
                  type="button"
                  onClick={handleOnceClick}
                  className={styles.claimButton}
                >
                  Claim Card
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="sm" className={styles.px25}>
        <h1 className={styles.Keypropositions}>Key propositions</h1>
        <h1 className={styles.Smartspendersthisway}>
          Smart Spenders, this way
        </h1>
      </Container>
      <Box xs={12}>
        <Grid item container className={styles.px170}>
          {itemData.map((index, item) => (
            <Grid item xs={6} md={4} key={item}>
              <div className={styles.itemDataStyle}>
                {index.img === "/Images/there_is_always_more.png" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={publicRuntimeConfig.MY_VAR + index.img}
                    alt={index.title}
                    className={styles.img1}
                    style={{ height: "53px", marginTop: "28px" }} 
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                  src={publicRuntimeConfig.MY_VAR + index.img}
                    alt={index.title}
                    className={styles.img1}
                  />
                )}
                <div>
                  <Typography className={styles.header} display="block">
                    <b>{index.title}</b>
                  </Typography>
                </div>
                <div>
                  <Typography className={styles.textbelowicon} display="block">
                    {index.text}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Container maxWidth="sm" className={styles.px25}>
        <h1 className={styles.Keypropreasons}>
          Reasons to get 811 credit card
        </h1>
        <h1 className={styles.Makelifesimpler}>
          <span>Make life simpler.</span>
          <br />
          <span>Get your Credit Card.</span>
        </h1>
      </Container>
      <Grid item={true} container xs={12} className={styles.px170} spacing={8}>
        {cardData.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper variant="outlined" square className={styles.cardData}>
              <p className={styles.Cardnumber}>{item.seq}</p>
              <p className={styles.cardHeading}>{item.title}</p>
              <p className={styles.cardtext}>{item.text}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <CssBaseline />
      <div className={styles.inlinePadding}>
        <Box xs={12} className={styles.assetStyle}>
          <Grid item container alignItems="center">
            <Grid item xs={12} md={5}>
              <img
               src={publicRuntimeConfig.MY_VAR + "/Images/assets.png"}
                alt="mask group"
                className={styles.assetImage}
                height={450} width={531}
              />
            </Grid>
            <Grid item xs={12} md={6} className={styles.whitecardTextPadding}>
              <div className={styles.Claimyourcreditcard}>
                Claim your credit card, at any (yes, any) income
              </div>
              <p className={styles.whiteContainersubtext}>
                Finally! Here’s a card that does not need a minimum annual
                income. Cards are issued as per your credit score or against
                your Fixed Deposit.
              </p>
            </Grid>
          </Grid>
        </Box>
        <CssBaseline />
        <Box xs={12} sx={{ bgcolor: "#253844", borderRadius: "14px" }}>
          <Grid container item className={styles.boxstyle}>
            <Grid
              item
              xs={12}
              md={6}
              className={styles.blackcardTextPadding}
              order={{ xs: 2, md: 1 }}
            >
              <div className={styles.blackContainer}>
                Turn floor-touching bills into smashing reward charts!
              </div>
              <p className={styles.blackContainersubtext}>
                {" "}
                Shopping is twice as fun with our credit card. Earn 2x reward
                points on online spends and 1% on all petrol pumps
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              order={{ xs: 1, md: 2 }}
              style={{ textAlign: "center" }}
            >
              <img
                src={publicRuntimeConfig.MY_VAR + "/Images/mask_group.png"}
                alt="mask group"
                style={{ width: "90%" }}
                height={550} width={531}
              />
            </Grid>
          </Grid>
        </Box>
      </div>

      <Footer />
    </div>
  );
}
