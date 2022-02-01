import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
  var audioStatus = false;

  // window.onload = myFunction();

  // function myFunction() {
  //   let myVar = setTimeout(showPage, 3000);
  // }

  // function showPage() {
  //   document.getElementById("loading").style.display = "none";
  //   document.getElementById("page").style.display = "block";
  // }

  // Loading cursor object 
  document.addEventListener("DOMContentLoaded", function() { 
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    // const cursor = document.querySelector('.cursor');
    // document.addEventListener('mousemove', e => {
    //   cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;" )
    // })
    // document.addEventListener('click', () => {
    //   cursor.classList.add("expand");
    //   setTimeout(() => {
    //     cursor.classList.remove("expand")
    //   }, 500)
    // })

    // Event lister for audio 
    // document.getElementById("gramophone").addEventListener('click', function() {
    //   if (!audioStatus) {
    //     document.getElementById("audio").play();
    //     audioStatus = true;
    //   }
    //   else {
    //     document.getElementById("audio").pause();
    //     audioStatus = false;
    //   }
    // }, false);

    // Collapsible element 
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  });

  // Set the date we're counting down to
  var countDownDate = new Date("Jan 28, 2022 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // document.getElementById("countdown-timer").innerHTML = "MINT STARTING IN " + days + "d " + hours + "h "
    // + minutes + "m " + seconds + "s ";

    // // If the count down is finished, write some text
    // if (distance < 0) {
    //   clearInterval(x);
    //   document.getElementById("countdown-timer").innerHTML = "MINT IS STARTING SOON...";
    // }
  }, 1000);

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mintNFTs(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 5) {
      newMintAmount = 5;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <div id="page" class="animate-bottom">
        {/* <div class="cursor"></div> */}
        {/* Navbar */}
        <div>
          <header id="header">
            <div class="header-space">
              <div class="icons-left">
                <img class="logo" src="/config/images/asset4.jpg" />
              </div>
              <div class="icons-right">
                <div class="navbar">
                  <p class="navbarOptions"><a href="#about">ABOUT</a></p>
                  <p class="navbarOptions"><a href="#roadmap">ROADMAP</a></p>
                  <p class="navbarOptions"><a href="#team">TEAM</a></p>
                  <p class="navbarOptions"><a href="#faq">FAQ</a></p>
                </div>
              </div>
            </div>
          </header>
        </div>
            {/* <a class="icon" href="https://google.com" target="_blank" rel="noreferrer">
              <img class='icon-image' src="/discord.jpg" alt="discord icon"/>
            </a>
            <a class="icon" href="https://twitter.com/TheTimelessAct?s=20" target="_blank" rel="noreferrer">
              <img class='icon-image' src="/twitter.jpg" alt="twitter icon"/>
            </a>
            <a class="icon" href="https://google.com" target="_blank" rel="noreferrer">
              <img class='icon-image' src="/opensea.jpg" alt="opensea icon"/>
            </a>
            <a class="icon" href="https://google.com" target="_blank" rel="noreferrer">
              <img class='icon-image' src="/etherscan.jpg" alt="etherscan icon"/>
            </a> */}
        {/* Main Landing Page  */}
        <div class="main-page">
          <img class="main-image" src="/config/images/asset6.jpg" />
          <img class="small-image" src="/config/images/asset3.jpg" />
        </div>
        {/* Section Divider  */}
        <img class="section-divider" src="/config/images/asset5.jpg" />
        <div class="nft-showcase">
          <img class="nft-showcase-title" src="/config/images/asset8.jpg" />
          <img class="nft-showcase-quote" src="/config/images/asset7.jpg" />
        </div>
        {/* About Section  */}
        <div id="about">
          {/* <p class="black-border"></p> */}
          <div class="about-container">
            <img class="about-arc" src="/config/images/asset10.jpg"/>
            <img class="about-title" src="/config/images/asset12.jpg" />
            <img class="about-sparkle" src="/config/images/asset11.jpg"/>
            <div class="about-description">
            <p class="a-description">The first of its kind, an NFT experience crafted specially for your other half.</p>
            <p class="a-description">The Timeless Act NFT is a celebration of your love for them.</p>
            <br/>
            <p class="a-description">Amidst all the collectibles in the space, we have created something,</p>
            <p class="a-description">with the intention of it to be gifted, acting as a reminder to your other</p>
            <p class="a-description">half that they are the reason behind all of your hustle in the space.</p>
            <br/>
            <p class="a-description">And for those singles out there, don't worry,</p>
            <p class="a-description">we've got you covered and have something in store for you too.</p>
          </div>
        </div>
        <p class="black-border"></p>
        {/* Mint Details Section  */}
        <div class='mint-details'>
          <img class="mint-details-bg" src="/config/images/asset16.jpg"/>
          <img class="mint-title" src="/config/images/asset25.jpg"/>
          <div class="mint-description">
            <p class="m-description">TTA NFT is projected to release a few days leading up to 14th February, Valentines' Day.</p>
            <p class="m-description">And we've decided to make it a pure WHITELIST mint.</p>
            <br/>
            <p class="m-description">Why, you ask?</p>
            <br/>
            <p class="m-description">Simple, TTA NFT is not for the flippers out there, it is meant to be gifted to 
            your other half and hodl as a "digital memorabilia"</p>
            <br />
            <p class="m-description">Holders of TTA NFT will receive base perks, entitlement to participate in prized giveaways 
            and also doubles up as an access pass to future NFT drops across collaborations. Subject to include a ***** PFP 
            NFT collection down the road</p>
          </div>
          <img class="base-perks-title" src="/config/images/asset22.jpg"/>
          <img class="base-perks-sparkle" src="/config/images/asset21.jpg"/>
          <div class="container">
            <img class="bp-icon-1" src="/config/images/asset30.jpg"/>
            <img class="bp-icon-2" src="/config/images/asset29.jpg"/>
            <img class="bp-icon-3" src="/config/images/asset31.jpg"/>
            <img class="bp-title-1" src="/config/images/asset32.jpg"/>
            <img class="bp-title-2" src="/config/images/asset33.jpg"/>
            <img class="bp-title-3" src="/config/images/asset34.jpg"/>
          </div>
          <div class="base-perks-description">
            <p class="bp-description">To onboard your other half into the NFT space, we have curated a series of content
            and resources to help your other half seamlessly integrate with the NFT degens and shed their normie exterior away</p>
            <p class="bp-description">A one-stop shop for ideas, inclusive but not limited to date ideas, DIY craft ideas,
            cooking ideas, surprise ideas etc</p>
            <p class="bp-description">Holders of TTA NFT will be asked to fill up a questionnaire to state the likes and dislikes
            of your other half. This will then be transformed into a wishlist that will be granted based on a range of mystery items 
            we have prepared</p>
          </div>
        </div>
        {/* Roadmap Section  */}
        <div id="roadmap">
          <img class="roadmap-arc" src="/config/images/asset37.jpg"/>
          <img class="roadmap-title" src="/config/images/asset45.jpg"/>
          <img class="roadmap-heart" src="/config/images/asset40.jpg"/>
          <div class="roadmap-description">
            <p class="rm-description">We believe that love can be expressed in many different forms.</p>
            <p class="rm-description">And the more support we receive from our community, the more</p>
            <p class="rm-description">we'd love to give back. For every 250 TTA NFT minted, a new act</p>
            <p class="rm-description">gets unlocked in our story.</p>
            <br/>
            <p class="rm-description">For a total of 4 acts, we have -</p>
          </div>
          <img class="roadmap-act-1" src="/config/images/asset43.jpg"/>
          <img class="roadmap-act-2" src="/config/images/asset42.jpg"/>
          <img class="roadmap-act-3" src="/config/images/asset41.jpg"/>
          <img class="roadmap-act-4" src="/config/images/asset39.jpg"/>
        </div>
        {/* Team Section  */}
        {/* <div id="team">
          <img class="team-title" src="/config/images/asset47.jpg"/>
        </div> */}
        {/* FAQ Section  */}
        <div id="faq">
          <img class="faq-title" src="/config/images/asset51.jpg"/>
          <button type="button" class="collapsible">
            <img class="faq-heart" src="/config/images/asset48.jpg"/>
            <p class="faq-numbers">Q1</p>
            <div class="question-container">
              <p class="faq-questions">What is The Timeless Act?</p>
            </div>
          </button>
          <div class="content">
            <div class="answer-container">
              <p class="faq-answers">The Timeless Act is a digital memorabilia, that celebrates your declaration of love 
              for your other half. Infused with both Web 3.0 and real world utility.</p>
            </div>
          </div>
          <button type="button" class="collapsible">
            <img class="faq-heart" src="/config/images/asset48.jpg"/>
            <p class="faq-numbers">Q2</p>
            <div class="question-container">
              <p class="faq-questions">How do I mint it? Is there a whitelist?</p>
            </div>
          </button>
          <div class="content">
            <div class="answer-container">
              <p class="faq-answers">We're aiming for a pure whitelist mint targeted at specific audience that resonates with our
              purpose and messaging. This is NOT a collection for flippers.</p>
              </div>
          </div>
          <button type="button" class="collapsible">
            <img class="faq-heart" src="/config/images/asset48.jpg"/>
            <p class="faq-numbers">Q3</p>
            <div class="question-container">
              <p class="faq-questions">When is the mint?</p>
            </div>
          </button>
          <div class="content">
            <div class="answer-container">
              <p class="faq-answers">Mint will be up few days before Valentines' Day. Whitelisted 
              address will have 48 hours to mint.</p>
            </div>
          </div>
          <button type="button" class="collapsible">
            <img class="faq-heart" src="/config/images/asset48.jpg"/>
            <p class="faq-numbers">Q4</p>
            <div class="question-container">
              <p class="faq-questions">How much does it cost to mint?</p>
            </div>
          </button>
          <div class="content">
            <div class="answer-container">
              <p class="faq-answers">Each NFT costs 0.15 ETH</p>
            </div>
          </div>
        </div>
      </div>
        {/* <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        Main Content
        <s.Container
          flex={1}
          ai={"center"}
          style={{ padding: 24, backgroundColor: "var(--primary)" }}
          image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.jpg" : null}
        >
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
            <s.Container flex={2.8} jc={"center"} ai={"center"}>
              <div>
                <h1 class="header-quote">Love is <u>timeless</u>,</h1>
                <s.SpacerLarge />
                <h1 class="header-quote">NFT is <u>forever</u>.</h1>
                <s.SpacerSmall />
                <p class="header-description">We believe it's about damn time you gift an NFT to your other half</p>
              </div>
            </s.Container>
            <s.SpacerLarge />
            <s.Container
              flex={2}
              jc={"center"}
              ai={"center"}
              style={{
                backgroundColor: "var(--accent)",
                padding: 24,
                border: "3px solid white",
              }}
              image={"/config/images/pnft.gif"}
            >
              MINTING PORTION
              <s.TextTitle
                style={{
                  textAlign: "center",
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "var(--accent-text)",
                }}
              >
                {data.totalSupply} / {CONFIG.MAX_SUPPLY}
              </s.TextTitle>
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--primary-text)",
                }}
              >
                <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                  {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                </StyledLink>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  {blockchain.account}
                </s.TextTitle>
              </s.TextDescription>
              <s.SpacerSmall />
              {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                <>
                  <s.TextTitle
                    style={{ textAlign: "center", color: "var(--accent-text)" }}
                  >
                    SOLD OUT!
                  </s.TextTitle>
                  <s.TextDescription
                    style={{ textAlign: "center", color: "var(--accent-text)" }}
                  >
                    You can still find {CONFIG.NFT_NAME} on
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                    {CONFIG.MARKETPLACE}
                  </StyledLink>
                </>
              ) : (
                <>
                  <s.TextTitle
                    style={{ textAlign: "center", color: "var(--accent-text)" }}
                  >
                    1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                    {CONFIG.NETWORK.SYMBOL}.
                  </s.TextTitle>
                  <s.SpacerXSmall />
                  <s.TextDescription
                    style={{ textAlign: "center", color: "var(--accent-text)" }}
                  >
                    Excluding gas fees.
                  </s.TextDescription>
                  <s.SpacerSmall />
                  {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                    <s.Container ai={"center"} jc={"center"}>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        Connect to the {CONFIG.NETWORK.NAME} network
                      </s.TextDescription>
                      <s.SpacerSmall />
                      <StyledButton
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      >
                        CONNECT
                      </StyledButton>
                      {blockchain.errorMsg !== "" ? (
                        <>
                          <s.SpacerSmall />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {blockchain.errorMsg}
                          </s.TextDescription>
                        </>
                      ) : null}
                    </s.Container>
                  ) : (
                    <>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {feedback}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <s.Container ai={"center"} jc={"center"} fd={"row"}>
                        <StyledRoundButton
                          style={{ lineHeight: 0.4 }}
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            decrementMintAmount();
                          }}
                        >
                          -
                        </StyledRoundButton>
                        <s.SpacerMedium />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {mintAmount}
                        </s.TextDescription>
                        <s.SpacerMedium />
                        <StyledRoundButton
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            incrementMintAmount();
                          }}
                        >
                          +
                        </StyledRoundButton>
                      </s.Container>
                      <s.SpacerSmall />
                      <s.Container ai={"center"} jc={"center"} fd={"row"}>
                        <StyledButton
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            claimNFTs();
                            getData();
                          }}
                        >
                          {claimingNft ? "MINTING..." : "MINT"}
                        </StyledButton>
                      </s.Container>
                    </>
                  )}
                </>
              )}
              <s.SpacerMedium />
            </s.Container>
            <s.SpacerLarge />
            <s.Container flex={1} jc={"center"} ai={"center"}>
              <StyledImg
                alt={"example"}
                src={"/config/images/example.gif"}
                style={{ transform: "scaleX(-1)" }}
              />
            </s.Container>
          </ResponsiveWrapper>
          <s.SpacerLarge />
          <s.SpacerLarge />
          <div class="countdown">
            <p class="countdown-title" id="countdown-timer"></p>
          </div>
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerSmall />
        </s.Container> */}
        {/* <div>
          <audio id="audio">
            <source src="/config/audio/thatslife.mp3" />
          </audio>
          <a>
            <img id="gramophone" src="/config/images/gramophone.jpg" />
          </a>
        </div>
        <s.Container jc={"center"} ai={"center"} style={{ width: "100%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address. Please note:
            Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully mint your NFT. We recommend that you don't lower the
            gas limit.
          </s.TextDescription>
        </s.Container> */}
      </div>
      {/* Loading screen  */}
      {/* <div id="loading">
        <p class="loading-title">Loading... Please wait</p>
      </div>   */}
    </s.Screen>
  );
}

export default App;
