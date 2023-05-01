import { SessionProvider } from "next-auth/react";
import { ComponentType } from 'react';

const withSession = (WrappedComponent: ComponentType<any>) => {
  const WithSession: ComponentType<any> = ({ session, ...pageProps }) => (
    <SessionProvider session={session}>
      <WrappedComponent {...pageProps} />
    </SessionProvider>
  );

  WithSession.displayName = `WithSession(${getDisplayName(WrappedComponent)})`;

  return WithSession;
};

function getDisplayName(WrappedComponent: ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withSession;
