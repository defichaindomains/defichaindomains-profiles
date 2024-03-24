import React from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Skeleton } from "./ui/skeleton";
import { useWalletOptions } from "@/context/WalletOptionsContext";

/**
 * The wallet connection section for ensuring the user is in a connected state to the dApp.
 * Provides two options for users:
 * - Connect an existing web3 wallet, such as MetaMask.
 * - Create a new wallet using thirdweb's Embedded Wallet powered by Paper.
 * Since the list of wallets is defined in the ThirdwebProvider in _app.tsx, that list is
 * set "upstream" when the user clicks on the button. i.e. it's set to:
 * - Show all kinds of web3 wallet options if the user clicks the "Connect" button.
 * - Show only the Paper wallet option if the user clicks the "Create" button.
 * Also see: config.ts for the arrays that get passed to the ThirdwebProvider.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * <WalletConnectSection />
 *
 * @returns {JSX.Element} - Returns the JSX element representing the WalletConnectSection.
 */
export default function WalletConnectSection() {
  const address = useAddress();
  const { setWalletOptions } = useWalletOptions();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl shadow-xl h-auto w-full backdrop-blur-xl backdrop-filter bg-white bg-opacity-5 px-8 py-8">
      <ConnectWallet
        theme={"light"}
        switchToActiveChain={true}
        welcomeScreen={{
          img: {
            src: "https://app.defichain-domains.com/static/media/Full-Logo_White.f9598476.svg",
            width: 150,
            height: 50,
          },
          title: "Connect a wallet to use Defichain Domains Pay",
          subtitle:
            "Wallets help you access your digital assets and sign in to web3 applications.",
        }}
        modalTitleIconUrl={""}
        style={{ width: "90%", marginBottom: 12 }}
      />
    </div>
  );
}
