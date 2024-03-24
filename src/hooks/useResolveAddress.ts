import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useSDK } from "@thirdweb-dev/react";
import {
  resolverAbi,
  resolverAddress,
  reverseRegistrarAbi,
  reverseRegistrarAddress,
} from "@/const/config";

const useResolveAddress = (address: any) => {
  const sdk = useSDK();
  const [loading, setLoading] = useState<boolean>(false);
  const [domainName, setDomainName] = useState<string | null>(null);

  useEffect(() => {
    const resolveAddressToName = async () => {
      setLoading(true);
      try {
        // Assuming you have the address you want to resolve
        const reverseRegistrar = await sdk?.getContractFromAbi(
          reverseRegistrarAddress,
          reverseRegistrarAbi
        );

        const node = await reverseRegistrar?.call("node", [
          `${address.toLowerCase()}`,
        ]);

        console.log(node);

        // Get the resolver for this node
        const resolver = await sdk?.getContractFromAbi(
          resolverAddress,
          resolverAbi
        );

        // Call the 'name' function on the resolver
        const domainName = await resolver?.call("name", [node]);
        console.log(domainName);
        // Set the resolved name to state
        setDomainName(domainName);
      } catch (error) {
        console.error("Error resolving DefiChain Domain name:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sdk && address) {
      resolveAddressToName();
    }
  }, [sdk, address]);
  return { domainName, loading };
};

export default useResolveAddress;
