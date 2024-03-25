import { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import { useSDK } from "@thirdweb-dev/react";
import { resolverAbi, resolverAddress } from "@/const/config";

const useDomain = (domainName: string) => {
  const sdk = useSDK();
  const [resolvedAddress, setResolvedAddress] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    const fetchDomain = async () => {
      let records: any;
      try {
        const publicResolver = await sdk?.getContractFromAbi(
          resolverAddress,
          resolverAbi
        );

        const labelHash = utils.namehash(domainName);
        console.log(labelHash);
        const graphqlQuery = {
          query: `
            query GetDomainByName($name: String!) {
              domains(where: { name: $name }) {
                resolver {
                addr {
                  id
                }
                texts
              }
              }
            }
          `,
          variables: {
            name: domainName,
          },
        };

        const graphqlResponse = await fetch(
          "https://proxy-production-8e85.up.railway.app/https://subgraph.defichain-domains.com/subgraphs/name/defichaindomains/subgraph",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(graphqlQuery),
          }
        );
        const { data } = await graphqlResponse.json();

        if (data.domains[0]) {
          const domainData = data.domains[0];
          const address = domainData.resolver.addr.id;
          setResolvedAddress(address);

          const keys = domainData.resolver.texts;

          for (const key of keys) {
            const record = await publicResolver?.call("text", [labelHash, key]);
            records = { ...records, [key]: record };
          }
          setRecords(records);
        } else {
          setResolvedAddress(null);
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [domainName, sdk]);
  return { resolvedAddress, loading, records };
};

export default useDomain;
