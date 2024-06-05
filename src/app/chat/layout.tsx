import { IdentityProvider } from "../../components/identity-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <IdentityProvider>{children}</IdentityProvider>;
}
