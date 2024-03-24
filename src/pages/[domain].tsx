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
import { AlertCircle } from "lucide-react";
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

/**
 * This is where the user's can see their wallet address so they can send funds to it.
 * It takes the address from the useAddress hook and displays it in multiple ways: as a QR code, as text, and as a button to copy it to the clipboard.
 */
export default function ProfilePage() {
  // Useful to send user's to the /send and /receive pages.
  const router = useRouter();

  const domain = router.query.domain as string;

  // Debounce the lens profile to pay so we don't spam the API with requests.
  const [debouncedDomain] = useDebounce(domain, 1000);

  // Search for the lens profile the user has entered to find relevant profiles that match the query.

  const { resolvedAddress, loading, hasAvatar } = useDomain(debouncedDomain);

  // We're using the next-qrcode library to generate the QR code of the wallet address
  const { Canvas } = useQRCode();

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
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
        <h1>Not Found </h1>
      </div>
    </AppContainer>;
  }

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
        <MediaRenderer
          src={hasAvatar ? `https://${domain}.im/avatar` : `/profile.png`}
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

          {resolvedAddress && (
            <>
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

              <p className="text-sm lg:text-lg text-muted-foreground max-w-xl leading-normal text-center mt-4">
                Your Wallet Address: <strong>{resolvedAddress}</strong>
              </p>

              <Button
                className="w-full mt-2"
                onClick={() => {
                  navigator.clipboard.writeText(resolvedAddress);
                }}
              >
                Copy Wallet Address
              </Button>

              <Button
                className="w-full mt-1"
                variant="outline"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Go Back
              </Button>
            </>
          )}
        </>
      </div>
    </AppContainer>
  );
}
