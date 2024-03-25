export default function validateDomain(domain: string): boolean {
  if (!domain.endsWith(".dfi")) {
    return false;
  }

  return true;
}
