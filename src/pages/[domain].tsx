import {
  MediaRenderer,
  NATIVE_TOKEN_ADDRESS,
  useAddress,
  useBalance,
  useSDK,
} from "@thirdweb-dev/react";
import AppContainer from "@/components/AppContainer";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Copy, Wallet } from "lucide-react";
import {
  CHAIN,
  resolverAbi,
  resolverAddress,
  reverseRegistrarAbi,
  reverseRegistrarAddress,
} from "@/const/config";
import { useQRCode } from "next-qrcode";
import WalletConnectSection from "@/components/WalletConnectSection";
import formatNumber from "@/lib/numberFormatter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useDomain from "@/hooks/useDomain";
import { useDebounce } from "use-debounce";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

/**
 * This is where the user's can see their wallet address so they can send funds to it.
 * It takes the address from the useAddress hook and displays it in multiple ways: as a QR code, as text, and as a button to copy it to the clipboard.
 */
export default function ProfilePage() {
  const { toast } = useToast();
  // Useful to send user's to the /send and /receive pages.
  const router = useRouter();

  const domain = router.query.domain as string;

  // Debounce the lens profile to pay so we don't spam the API with requests.
  const [debouncedDomain] = useDebounce(domain, 1000);

  // Search for the lens profile the user has entered to find relevant profiles that match the query.

  const { resolvedAddress, loading, records } = useDomain(debouncedDomain);

  // We're using the next-qrcode library to generate the QR code of the wallet address
  const { Canvas } = useQRCode();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(resolvedAddress as any);
    toast({
      title: "Address Copied",
      description: "The address has been copied to your clipboard.",
      duration: 5000,
    });
  };

  if (loading) {
    return (
      <AppContainer>
        <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
          <Skeleton className="w-full h-12" />
        </div>
      </AppContainer>
    );
  }

  if (!resolvedAddress) {
    return (
      <AppContainer>
        <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
          <h1>Not Found </h1>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
        <MediaRenderer
          src={records.avatar ? records.avatar : `/profile.png`}
          style={{
            width: 150,
            height: 150,
          }}
          alt="Lens Profile Avatar"
          className="rounded-full border"
        />
        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-center lg:self-center">
          {domain}
        </h1>

        <>
          <Separator className="mt-4" />

          <div className="hidden lg:block">
            <Canvas
              text={resolvedAddress}
              options={{
                width: 256,
              }}
            />
          </div>

          <div className="block lg:hidden">
            <Canvas
              text={resolvedAddress}
              options={{
                width: 128,
              }}
            />
          </div>
          <div className="flex gap-1">
            <div className="rounded-l-full bg-gray-200 shadow-sm text-black flex align-middle justify-center items-center py-1 px-2">
              <Wallet className="h-4 w-4" />
              <p className="text-sm lg:text-base max-w-xl leading-normal text-center ml-2">
                {`${resolvedAddress.slice(0, 6)}...${resolvedAddress.slice(
                  -4
                )}`}
              </p>
            </div>
            <div
              className="rounded-r-full bg-gray-200 shadow-sm text-black flex align-middle justify-center items-center py-1 px-2"
              onClick={handleCopyAddress}
            >
              <Copy className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-8 justify-center items-center">
            <Card className=" py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
              Website
            </Card>
            <Card className=" py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
              Reddit
            </Card>
            <Card className=" py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
              Twitter
            </Card>
            <Card className=" py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
              Telegram
            </Card>
            <Card className=" py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
              Discord
            </Card>
            <Card className=" py-2 px-3 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
              GitHub
            </Card>
          </div>
        </>
      </div>
    </AppContainer>
  );
}
