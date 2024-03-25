import validateDomain from "@/lib/validateDomain";
import Link from "next/link";
import AppContainer from "@/components/AppContainer";
import { Separator } from "@radix-ui/react-context-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

/**
 * A simple Homepage for the app.
 * Just a title with a description and an image that bounces when you hover on it lol =)
 */
export default function Home() {
  const [domain, setDomain] = useState<string>("");
  const [validDomain, setValidDomain] = useState<boolean>(true);

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidDomain(true);
    const input = e.target.value;
    setDomain(input); // Validate the address and set the error state
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValidDomain(validateDomain(domain));
    if (e.key === "Enter" && validateDomain(domain) === true) {
      window.location.href = `/${domain}`;
    }
  };
  const handleButtonPress = () => {
    setValidDomain(validateDomain(domain));

    if (validateDomain(domain) === true) {
      window.location.href = `/${domain}`;
    }
  };

  return (
    <AppContainer>
      <div className="container max-w-[720px] flex flex-col items-center lg:items-start h-screen max-h-[85%] px-3 py-8 lg:px-8 lg:mt-48 gap-4 lg:gap-0">
        <h1 className="scroll-m-20 text-4xl lg:text-6xl font-extrabold tracking-tight lg:mt-4 text-center">
          Defichain Domains Profiles
        </h1>

        <Separator className="w-5/6  mt-8" />

        <div className="flex flex-col  gap-8 lg:gap-2 items-center justify-center lg:w-full  mt-8">
          <p className="text-center lg:text-start lg:mb-4">
            One page to show who you are and everything you make and own.
          </p>
          <div className="w-full flex flex-row mt-8 justify-center items-center">
            <Input
              type="text"
              placeholder="Enter a Defichain Domains handle, e.g. stefano.dfi"
              className={`w-full ${
                validDomain === false ? "border-red-500" : ""
              }`} // Add border color if there's an error
              value={domain}
              onChange={handleDomainChange}
              onKeyDown={handleKeyPress}
            />

            <div
              className={`bg-gray-200 rounded-lg flex items-center justify-center h-10 w-10 ml-2 ${
                validDomain === true ? "" : "cursor-not-allowed"
              }`}
              onClick={handleButtonPress}
            >
              <Search className="p-1" />
            </div>
          </div>
          {validDomain == false && (
            <p className="text-red-500">{"Invalid Defichain Domain"}</p>
          )}{" "}
          {/* Display error message */}
        </div>
      </div>
    </AppContainer>
  );
}
