import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

const useDomain = (domainName: string) => {
  const [resolvedAddress, setResolvedAddress] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAvatar, setHasAvatar] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchDomain = async () => {
      try {
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
          const hasAvatarText =
            domainData.resolver.texts &&
            domainData.resolver.texts.includes("avatar");
          setHasAvatar(hasAvatarText);
        } else {
          setResolvedAddress(null);
          setHasAvatar(false);
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomain();
  }, [domainName]);
  return { resolvedAddress, loading, hasAvatar };
};

export default useDomain;
