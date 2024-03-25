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
import { AlertCircle, Copy, Mail, Target, Wallet } from "lucide-react";
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
import Image from "next/image";
import Link from "next/link";

/**
 * This is where the user's can see their wallet address so they can send funds to it.
 * It takes the address from the useAddress hook and displays it in multiple ways: as a QR code, as text, and as a button to copy it to the clipboard.
 */
export default function ProfilePage() {
  const { toast } = useToast();
  // Useful to send user's to the /send and /receive pages.
  const router = useRouter();

  const domain = router.query.domain as string;

  // Search for the lens profile the user has entered to find relevant profiles that match the query.

  const { resolvedAddress, loading, records } = useDomain(domain);

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
          <Skeleton className="w-[150px] h-[150px] rounded-full" />
          <Skeleton className="w-full h-12 mt-4" />
          <Skeleton className="w-full h-12 mt-4" />
          <Skeleton className="w-full h-12 mt-4" />
          <Skeleton className="w-full h-12 mt-4" />
        </div>
      </AppContainer>
    );
  }

  if (!resolvedAddress) {
    return (
      <AppContainer>
        <div className="container max-w-[720px] flex flex-col items-center lg:items-center h-auto min-h-[84%] px-3 py-8 lg:px-8 lg:mt-48 gap-2 lg:gap-0">
          <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-center lg:self-center">
            😵‍💫
          </h1>
          <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-center lg:self-center">
            Not Found
          </h1>
          <p className="text-sm lg:text-base max-w-xl leading-normal text-center my-8 text-muted-foreground">
            {domain} does not exist
          </p>
          <Button onClick={() => router.push("/")}>Try Again</Button>
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
        <div className="flex">
          <div className="rounded-l-full bg-gray-200 shadow-sm text-black flex align-middle justify-center items-center py-1 px-2">
            <Wallet className="h-4 w-4" />
            <p className="text-sm lg:text-base max-w-xl leading-normal text-center ml-2">
              {`${resolvedAddress.slice(0, 6)}...${resolvedAddress.slice(-4)}`}
            </p>
          </div>
          <div
            className="rounded-r-full ml-1 bg-gray-200 shadow-sm text-black flex align-middle justify-center items-center py-1 px-2"
            onClick={handleCopyAddress}
          >
            <Copy className="h-4 w-4" />
          </div>

          {records.email && (
            <Link href={`mailto:${records.email}`} target="_blank">
              <div className="rounded-full ml-4 bg-gray-200 shadow-sm text-black flex align-middle justify-center items-center py-1 px-2">
                <Mail className="h-4 w-4" />
                <p className="text-sm lg:text-base max-w-xl leading-normal text-center ml-2">
                  {records.email}
                </p>
              </div>
            </Link>
          )}
        </div>

        {records.bio && (
          <p className="text-sm lg:text-base max-w-xl leading-normal text-center mt-8 text-muted-foreground">
            {records.bio}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-8 justify-center items-center">
          {records.url && (
            <Link href={`twitter.com/${records.url}`} target="_blank">
              <Card className="w-52 h-32 p-6  hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-gray-100 to-transparent">
                <Image src={"/web.png"} width={30} height={30} alt="Website" />
                <p className="text-sm lg:text-base font-semibold mt-2">
                  Website
                </p>
                <p className="text-xs lg:text-xs text-muted-foreground font-semibold mt-2">
                  {records.url}
                </p>
              </Card>
            </Link>
          )}
          {records["com.reddit"] && (
            <Link
              href={`https://reddit.com/u/${records["com.reddit"]}`}
              target="_blank"
            >
              <Card className="w-52 h-32 p-6  hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-red-100 to-transparent">
                <Image
                  src={"/reddit.png"}
                  width={30}
                  height={30}
                  alt="Website"
                />
                <p className="text-sm lg:text-base font-semibold mt-2">
                  Reddit
                </p>
                <p className="text-xs lg:text-xs text-muted-foreground font-semibold mt-2">
                  {records["com.reddit"]}
                </p>
              </Card>
            </Link>
          )}
          {records["com.twitter"] && (
            <Link
              href={`https://twitter.com/${records["com.twitter"]}`}
              target="_blank"
            >
              <Card className="w-52 h-32 p-6  hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-neutral-100 to-transparent">
                <Image src={"/x.png"} width={30} height={30} alt="Website" />
                <p className="text-sm lg:text-base font-semibold mt-2">X</p>
                <p className="text-xs lg:text-xs text-muted-foreground font-semibold mt-2">
                  {records["com.twitter"]}
                </p>
              </Card>
            </Link>
          )}
          {records["com.telegram"] && (
            <Link
              href={`https://t.me/${records["com.telegram"]}`}
              target="_blank"
            >
              <Card className="w-52 h-32 p-6  hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-sky-100 to-transparent">
                <Image
                  src={"/telegram.png"}
                  width={30}
                  height={30}
                  alt="Website"
                />
                <p className="text-sm lg:text-base font-semibold mt-2">
                  Telegram
                </p>
                <p className="text-xs lg:text-xs text-muted-foreground font-semibold mt-2">
                  {records["com.telegram"]}
                </p>
              </Card>
            </Link>
          )}
          {records["com.discord"] && (
            <Link
              href={`https://discord.com/${records["com.discord"]}`}
              target="_blank"
            >
              <Card className="w-52 h-32 p-6  hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-violet-100 to-transparent">
                <Image
                  src={"/discord.png"}
                  width={30}
                  height={30}
                  alt="Website"
                />
                <p className="text-sm lg:text-base font-semibold mt-2">
                  Discord
                </p>
                <p className="text-xs lg:text-xs text-muted-foreground font-semibold mt-2">
                  {records["com.discord"]}
                </p>
              </Card>
            </Link>
          )}
          {records["com.github"] && (
            <Link
              href={`https://www.github.com/${records["com.github"]}`}
              target="_blank"
            >
              <Card className="w-52 h-32 p-6  hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-neutral-100 to-transparent">
                <Image
                  src={"/github.png"}
                  width={30}
                  height={30}
                  alt="Website"
                />
                <p className="text-sm lg:text-base font-semibold mt-2">
                  Github
                </p>
                <p className="text-xs lg:text-xs text-muted-foreground font-semibold mt-2">
                  {records["com.github"]}
                </p>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </AppContainer>
  );
}
