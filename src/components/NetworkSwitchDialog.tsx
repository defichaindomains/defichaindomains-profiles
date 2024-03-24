import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CHAIN } from "@/const/config";
import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isOpen: boolean;
};

/**
 * NetworkSwitchDialog component represents a dialog for switching to the Polygon PoS network.
 * This is opened in the _app.tsx file when the user is on the wrong network set in the const/config.ts file.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * <NetworkSwitchDialog isOpen={true} />
 *
 * @param {object} props - React props for the NetworkSwitchDialog component.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open or closed.
 * @returns {JSX.Element} - Returns the JSX element representing the NetworkSwitchDialog.
 */
export default function NetworkSwitchDialog({ isOpen }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="w-full flex flex-row items-center justify-center mb-4">
            <Image
              src={"/defichain-dfi-logo.png"}
              alt="Defichain"
              width={45}
              height={45}
            />
          </div>
          <DialogTitle>Switch to {CHAIN.name}</DialogTitle>
          <DialogDescription>
            Defichain Domains Pay uses{" "}
            <Link
              className="underline"
              href="https://ethereum.org/en/wallets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              wallets
            </Link>{" "}
            to send and receive funds.
          </DialogDescription>

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
            style={{ width: "100%", marginTop: 16 }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
